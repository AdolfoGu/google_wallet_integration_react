const { JWT } = require("google-auth-library");
const serviceAccount = require("./google.json");

const authClient = new JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
});

async function testAuth() {
  try {
    const tokens = await authClient.authorize();
    console.log("Authentication successful:", tokens);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
}

testAuth();