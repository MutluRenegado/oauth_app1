import express from 'express';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

// Initialize the Express app
const app = express();

// Use the dynamic port from Railway or fallback to 3000
const port = process.env.PORT || 3000;

// OAuth credentials
const clientId = "<YOUR_CLIENT_ID>";
const accessToken = "<ACCESS_TOKEN_VALUE>";
const accessTokenExpiry = "<ACCESS_TOKEN_EXPIRY_DATE>"; 
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
    res.json(items);  // Send the products as a response
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products from Wix', details: error.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
