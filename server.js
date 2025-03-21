// Import required modules
import express from 'express';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

// Initialize the Express app
const app = express();
const port = 3000; // You can change the port number if needed

// OAuth credentials - replace these with your actual credentials
const clientId = "<YOUR_CLIENT_ID>";
const accessToken = "<ACCESS_TOKEN_VALUE>";
const accessTokenExpiry = "<ACCESS_TOKEN_EXPIRY_DATE>"; // ISO format date (e.g., 2025-12-31T23:59:59Z)
const refreshToken = "<REFRESH_TOKEN_VALUE>";

// Create the Wix client
const myWixClient = createClient({
  modules: {
    products,
  },
  auth: OAuthStrategy({
    clientId: clientId,
    tokens: {
      accessToken: {
        value: accessToken,
        expiresAt: accessTokenExpiry,
      },
      refreshToken: {
        value: refreshToken,
      },
    },
  }),
});

// Endpoint to fetch products from Wix
app.get('/products', async (req, res) => {
  try {
    // Fetch the list of products
    const { items } = await myWixClient.products.queryProducts().find();
    // Send the products as a response
    res.json(items);
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Error fetching products from Wix', details: error.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

