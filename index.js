// index.js
import dotenv from 'dotenv';
import { getAvailableServices, getStoreProducts, getAvailabilityCalendar } from './wix-client.js';

// Load environment variables from the .env file
dotenv.config();

// Initialize the Wix Client and interact with Wix APIs
async function initializeWixClient() {
  try {
    // Sample usage of the Wix Bookings API: List available services
    const availableServices = await getAvailableServices();
    console.log('Available Services:', availableServices);

    // Sample usage of the Wix Stores API: List store products
    const storeProducts = await getStoreProducts();
    console.log('Store Products:', storeProducts);

    // Sample usage of the Wix Bookings Availability Calendar API: Get availability
    const calendar = await getAvailabilityCalendar();
    console.log('Availability Calendar:', calendar);

  } catch (error) {
    console.error('Error initializing Wix client or API requests:', error);
  }
}

// Run the function to initialize the client and interact with APIs
initializeWixClient();
