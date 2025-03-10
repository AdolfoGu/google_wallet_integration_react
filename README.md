# Google Wallet Integration with React

Este proyecto permite la integración de Google Wallet con una aplicación React para crear y gestionar tickets de pólizas de seguro. Los usuarios pueden generar un ticket con los detalles de su póliza y agregarlo directamente a Google Wallet.

## **Tecnologías Utilizadas**

### **Frontend**
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Axios**: Para realizar solicitudes HTTP al backend.
- **CSS**: Para estilizar los componentes.

### **Backend**
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir APIs RESTful.
- **Google Auth Library**: Para autenticar con Google usando JWT.
- **Axios**: Para realizar solicitudes HTTP a la API de Google Wallet.

### **Google Wallet API**
- **Google Wallet API**: Para crear y gestionar tickets.
- **JWT (JSON Web Tokens)**: Para autenticar las solicitudes.

---

## **Estructura del Proyecto**
-google-wallet-integration/
-├── backend/ # Código del servidor backend
-│ ├── google.json # Archivo de credenciales de Google (¡NO subir a GitHub!)
-│ ├── server.js # Servidor backend
-│ ├── package.json # Dependencias del backend
-│ └── .gitignore # Ignorar node_modules y otros archivos
-├── frontend/ # Código de la aplicación React
-│ ├── src/
-│ │ ├── components/ # Componentes de React
-│ │ │ ├── GoogleWalletIntegration.js
-│ │ │ └── PolicyCard.js
-│ │ ├── App.js # Componente principal de la aplicación
-│ │ ├── index.js # Punto de entrada de la aplicación
-│ │ └── ...
-│ ├── package.json # Dependencias del frontend
-│ └── .gitignore # Ignorar node_modules y otros archivos
-├── README.md # Documentación del proyecto

---

## **Instalación y Configuración**

### **1. Clonar el Repositorio**
- git clone https://github.com/AdolfoGu/google_wallet_integration_react.git
- cd google-wallet-integration
### **2. Configurar el BackEnd**
- cd backend
- npm install
- npm start
  
### **2. Configurar el FrontEnd**
- cd ../frontend
- npm install
- npm start

# Uso
- Abre la aplicación en tu navegador (por defecto, estará en http://localhost:3000).
- Verás los detalles de la póliza en la tarjeta de la póliza
- Haz clic en el botón "Agregar a Google Wallet".
- Se generará un enlace para agregar el ticket a Google Wallet. Haz clic en él para abrirlo en una nueva pestaña
- Sigue las instrucciones en Google Wallet para guardar el ticket.

# Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

# Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

**Nombre:** Juan Adolfo Gutierrez Gaytan
**Email:** ja.gutierrez.gaytan@ugto.mx
**GitHub:** AdolfoGu

