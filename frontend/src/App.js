// src/App.js
import React, { useState } from "react";
import GoogleWalletIntegration from "./components/GoogleWalletIntegration";
import PolicyCard from "./components/PolicyCard";
import "./styles/App.css";
import logo from "./assets/logoHDI.png";

function App() {
  const [policyData, setPolicyData] = useState({});

  const handlePolicyDataChange = (data) => {
    setPolicyData(data); // Actualizar los datos de la póliza
  };

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="HDI Seguros México" className="logo" />
      </div>
      <div className="container">
        <PolicyCard onPolicyDataChange={handlePolicyDataChange} />
        <GoogleWalletIntegration policyData={policyData} />
      </div>
    </div>
  );
}

export default App;