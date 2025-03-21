import dotenv from 'dotenv';
import { createClient, OAuthStrategy } from "@wix/sdk";
import { availabilityCalendar, services } from "@wix/bookings";
import { products } from "@wix/stores";

// Load environment variables from the .env file
dotenv.config();

// Retrieve sensitive data from environment variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Function to initialize the Wix client
export function createWixClient() {
    if (!clientId || !clientSecret) {
        throw new Error("CLIENT_ID and CLIENT_SECRET must be set in the .env file.");
    }

    return createClient({
        oauthStrategy: OAuthStrategy.OAUTH2,
        apiUrl: "https://www.wixapis.com",
        clientId,  // Using environment variables for clientId
    });
}

export async function getAvailableServices() {
    try {
        const client = createWixClient();
        const wixBookings = services(client);
        const availableServices = await wixBookings.list();
        console.log("Available Services:", availableServices);
        return availableServices;
    } catch (error) {
        console.error("Error fetching available services:", error);
        throw error;  // Throwing error after logging
    }
}

export async function getStoreProducts() {
    try {
        const client = createWixClient();
        const wixStores = products(client);
        const storeProducts = await wixStores.list();
        console.log("Store Products:", storeProducts);
        return storeProducts;
    } catch (error) {
        console.error("Error fetching store products:", error);
        throw error;  // Throwing error after logging
    }
}

export async function getAvailabilityCalendar() {
    try {
        const client = createWixClient();
        const wixCalendar = availabilityCalendar(client);
        const calendar = await wixCalendar.list();
        console.log("Availability Calendar:", calendar);
        return calendar;
    } catch (error) {
        console.error("Error fetching availability calendar:", error);
        throw error;  // Throwing error after logging
    }
}
