// wix-client.js
import dotenv from 'dotenv';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { availabilityCalendar, services } from '@wix/bookings';
import { products } from '@wix/stores';

// Load environment variables from the .env file
dotenv.config();

// Retrieve sensitive data from environment variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Function to create and authenticate the Wix client
export function createWixClient() {
  if (!clientId || !clientSecret) {
    throw new Error('CLIENT_ID and CLIENT_SECRET must be set in the .env file.');
  }

  // Create the Wix SDK client with OAuth authentication
  const client = createClient({
    auth: OAuthStrategy({
      clientId,
      clientSecret,
    }),
  });

  console.log('Wix Client Initialized with OAuth');
  return client;
}

// Function to get available services from Wix Bookings API
export async function getAvailableServices() {
  try {
    const client = createWixClient();
    const availableServices = await services.list(client);
    console.log('Available Services:', availableServices);
    return availableServices;
  } catch (error) {
    console.error('Error fetching available services:', error);
    throw error; // Throw error after logging
  }
}

// Function to get store products from Wix Stores API
export async function getStoreProducts() {
  try {
    const client = createWixClient();
    const storeProducts = await products.list(client);
    console.log('Store Products:', storeProducts);
    return storeProducts;
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw error; // Throw error after logging
  }
}

// Function to get availability calendar from Wix Bookings API
export async function getAvailabilityCalendar() {
  try {
    const client = createWixClient();
    const calendar = await availabilityCalendar.list(client);
    console.log('Availability Calendar:', calendar);
    return calendar;
  } catch (error) {
    console.error('Error fetching availability calendar:', error);
    throw error; // Throw error after logging
  }
}
