 // Import required modules
import dotenv from 'dotenv';
import { createClient, OAuthStrategy } from "@wix/sdk";
import { availabilityCalendar, services } from "@wix/bookings";
import { products } from "@wix/stores";

// Load environment variables from the .env file
dotenv.config();

// Use environment variables for sensitive information
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

import { createWixClient } from './wix-client.mjs';

// Initialize the Wix Client
async function initializeWixClient() {
    try {
        // Create the Wix SDK client with OAuth authentication
        const client = createWixClient();


        console.log("Wix Client Initialized");

        // Sample usage of the Wix Bookings API
        const availableServices = await services.list(client);
        console.log("Available Services:", availableServices);

        // Sample usage of the Wix Stores API
        const storeProducts = await products.list(client);
        console.log("Store Products:", storeProducts);

        // Sample usage of the Wix Bookings Availability Calendar API
        const calendar = await availabilityCalendar.list(client);
        console.log("Availability Calendar:", calendar);

        
    } catch (error) {
        console.error("Error initializing Wix client or API requests:", error);
    }
}

// Run the function to initialize the client and interact with APIs
initializeWixClient();
