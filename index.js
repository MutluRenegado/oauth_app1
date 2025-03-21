// Import required modules
import express from 'express';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000; // Use Railway's assigned port or default to 3000

// OAuth credentials from environment variables
const clientId = process.env.WIX_CLIENT_ID;
const accessToken = process.env.WIX_ACCESS_TOKEN;
const accessTokenExpiry = process.env.WIX_ACCESS_TOKEN_EXPIRY; // ISO format date (e.g., 2025-12-31T23:59:59Z)
const refreshToken = process.env.WIX_REFRESH_TOKEN;

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
    const { items } = await myWixClient.products.queryProducts().find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products from Wix', details: error.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
