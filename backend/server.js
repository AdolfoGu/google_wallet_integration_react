const express = require("express");
const { JWT } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require("./google.json");

// Función para generar el JWT
function generateJWT(issuerId, classId, objectId) {
  const payload = {
    iss: serviceAccount.client_email,
    aud: "google",
    typ: "savetowallet",
    origins: ["http://localhost:3000"],
    payload: {
      genericObjects: [
        {
          id: `${issuerId}.${objectId}`,
          classId: `${issuerId}.${classId}`,
        },
      ],
    },
  };

  return jwt.sign(payload, serviceAccount.private_key, {
    algorithm: "RS256",
  });
}

// Ruta para crear el ticket y generar el enlace de guardado
app.post("/create-ticket", async (req, res) => {
  try {
    const issuerId = "3388000000022860703"; // Reemplaza con tu issuerId
    const classId = `generic-class-${uuidv4()}`; // Generar classId aleatorio
    const objectId = `generic-object-${uuidv4()}`; // Generar objectId aleatorio

    const { policyData } = req.body; // Recibir los datos de la póliza

    // Crear la clase del ticket genérico
    const genericClass = {
      id: `${issuerId}.${classId}`,
      issuerName: "HDI Seguros México",
      reviewStatus: "UNDER_REVIEW",
      hexBackgroundColor: "#003960", // Color secundario de HDI
    };

    // Crear el objeto del ticket genérico
    const genericObject = {
      id: `${issuerId}.${objectId}`,
      classId: `${issuerId}.${classId}`,
      state: "ACTIVE",
      hexBackgroundColor: "#00A3A8", // Color principal de HDI
      cardTitle: {
        defaultValue: {
          language: "es",
          value: "Póliza de Seguro",
        },
      },
      subheader: {
        defaultValue: {
          language: "es",
          value: "Información de la Póliza",
        },
      },
      header: {
        defaultValue: {
          language: "es",
          value: policyData.policyNumber,
        },
      },
      textModulesData: [
        {
          header: "Nombre del Asegurado",
          body: policyData.insuredName,
        },
        {
          header: "Vigencia",
          body: policyData.validity,
        },
        {
          header: "Tipo de Seguro",
          body: policyData.insuranceType,
        },
        {
          header: "Estado",
          body: policyData.status,
        },
      ],
      linksModuleData: {
        uris: [
          {
            uri: "https://www.hdi.com.mx",
            description: "Visita HDI Seguros",
          },
        ],
      },
      // Elimina imageModulesData temporalmente
    };

    // Autenticación con Google
    const authClient = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
    });

    const tokens = await authClient.authorize();

    // Crear la clase del ticket genérico
    await axios.post(
      `https://walletobjects.googleapis.com/walletobjects/v1/genericClass`,
      genericClass,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Crear el objeto del ticket genérico
    await axios.post(
      `https://walletobjects.googleapis.com/walletobjects/v1/genericObject`,
      genericObject,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Generar el JWT para el enlace de guardado
    const jwtToken = generateJWT(issuerId, classId, objectId);

    // Generar la URL de guardado
    const saveLink = `https://pay.google.com/gp/v/save/${jwtToken}`;

    // Devolver la URL de guardado al frontend
    res.json({ saveLink });
  } catch (error) {
    console.error("Error creating generic ticket:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create generic ticket", details: error.response?.data });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});