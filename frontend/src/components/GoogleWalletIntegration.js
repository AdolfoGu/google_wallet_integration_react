import React, { useState } from "react";
import axios from "axios";

const GoogleWalletIntegration = ({ policyData }) => {
  const [saveLink, setSaveLink] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleAddToWallet = async () => {
    setLoading(true); // Activar el estado de loading
    setError(""); // Limpiar errores anteriores

    try {
      // Llamar al backend para crear el ticket y obtener el enlace
      const response = await axios.post("http://localhost:5000/create-ticket", {
        policyData, // Enviar los datos de la póliza al servidor
      });

      // Guardar el enlace de Google Wallet
      setSaveLink(response.data.saveLink);

      // Abrir el enlace automáticamente en una nueva pestaña
      window.open(response.data.saveLink, "_blank");
    } catch (error) {
      console.error("Error adding to Google Wallet:", error);
      setError("Error al agregar a Google Wallet. Intenta de nuevo."); // Mostrar mensaje de error
    } finally {
      setLoading(false); // Desactivar el estado de loading
    }
  };

  return (
    <div>
      <button
        className="button"
        onClick={handleAddToWallet}
        disabled={loading} // Deshabilitar el botón mientras se carga
      >
        {loading ? "Procesando..." : "Agregar a Google Wallet"}
      </button>

      {/* Mostrar mensaje de error si ocurre */}
      {error && <p className="error-message">{error}</p>}

      {/* Mostrar el enlace si está disponible 
      {saveLink && (
        <div className="ticket-card">
          <h2>¡Ticket Creado!</h2>
          <p>Tu ticket ha sido generado exitosamente. Haz clic en el botón para agregarlo a Google Wallet.</p>
          <a href={saveLink} className="save-link" target="_blank" rel="noopener noreferrer">
            Agregar a Google Wallet
          </a>
        </div>
      )}*/}
    </div>
  );
};

export default GoogleWalletIntegration;