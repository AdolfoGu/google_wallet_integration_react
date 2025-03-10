import React, { useState, useEffect } from "react";

const PolicyCard = ({ onPolicyDataChange }) => {
  const [policyData, setPolicyData] = useState({
    policyNumber: "", // Inicialmente vacío
    insuredName: "GUTIERREZ GAYTAN", // Nombre del asegurado
    validity: "01/01/2023 - 31/12/2023",
    insuranceType: "Automóvil",
    status: "Activa",
  });

  // Función para generar el número de póliza con la estructura deseada
  const generatePolicyNumber = () => {
    const certificado = Math.floor(Math.random() * 99) + 1; // 1-99
    const poliza = Math.floor(Math.random() * 9999999999) + 1; // 1-9999999999
    const oficina = Math.floor(Math.random() * 99) + 1; // 1-99
    return `${certificado}-${poliza}-${oficina}`;
  };

  // Generar el número de póliza al cargar el componente
  useEffect(() => {
    const newPolicyNumber = generatePolicyNumber(); // Generar el número
    setPolicyData((prevData) => ({ ...prevData, policyNumber: newPolicyNumber })); // Actualizar el estado
    onPolicyDataChange({ ...policyData, policyNumber: newPolicyNumber }); // Notificar al componente padre
  }, []); // Solo se ejecuta una vez al cargar el componente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPolicyData({ ...policyData, [name]: value });
    onPolicyDataChange({ ...policyData, [name]: value });
  };

  return (
    <div className="policy-card">
      {/* Encabezado */}
      <div className="header">
        <h2>Hola, {policyData.insuredName}</h2>
        <p>Mis Pólizas</p>
      </div>

      {/* Detalles de la póliza */}
      <div className="policy-details">
        <p>
          <strong>Número de Póliza:</strong>
          <input
            type="text"
            name="policyNumber"
            value={policyData.policyNumber}
            onChange={handleInputChange}
            readOnly // Campo de solo lectura
          />
        </p>
        <p>
          <strong>Nombre del Asegurado:</strong>
          <input
            type="text"
            name="insuredName"
            value={policyData.insuredName}
            onChange={handleInputChange}
            readOnly // Campo de solo lectura
          />
        </p>
        <p>
          <strong>Vigencia:</strong>
          <input
            type="text"
            name="validity"
            value={policyData.validity}
            onChange={handleInputChange}
            readOnly // Campo de solo lectura
          />
        </p>
        <p>
          <strong>Tipo de Seguro:</strong>
          <input
            type="text"
            name="insuranceType"
            value={policyData.insuranceType}
            onChange={handleInputChange}
            readOnly // Campo de solo lectura
          />
        </p>
        <p>
          <strong>Estado:</strong>
          <input
            type="text"
            name="status"
            value={policyData.status}
            onChange={handleInputChange}
            readOnly // Campo de solo lectura
          />
        </p>
      </div>
    </div>
  );
};

export default PolicyCard;