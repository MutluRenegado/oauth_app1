// Import required modules
const express = require("express");
const { createClient, OAuthStrategy } = require("@wix/sdk");
const { products } = require("@wix/stores");

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000; // Railway assigns a port automatically

// Load OAuth credentials from environment variables
const clientId = process.env.WIX_CLIENT_ID || "<YOUR_CLIENT_ID>";
const accessToken = process.env.WIX_ACCESS_TOKEN || "<ACCESS_TOKEN_VALUE>";
const accessTokenExpiry = process.env.WIX_ACCESS_TOKEN_EXPIRY || "2025-12-31T23:59:59Z";
const refreshToken = process.env.WIX_REFRESH_TOKEN || "<REFRESH_TOKEN_VALUE>";

// Create the Wix client
const myWixClient = createClient({
  modules: { products },
  auth: OAuthStrategy({
    clientId,
    tokens: {
      accessToken: { value: accessToken, expiresAt: accessTokenExpiry },
      refreshToken: { value: refreshToken },
    },
  }),
});

// Endpoint to fetch products from Wix
app.get("/products", async (req, res) => {
  try {
    const { items } = await myWixClient.products.queryProducts().find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products from Wix", details: error.message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
