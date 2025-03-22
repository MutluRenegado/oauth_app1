import dotenv from 'dotenv';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { services, availabilityCalendar } from '@wix/bookings';
import { products } from '@wix/stores';

// Load environment variables from the .env file
dotenv.config();

// Function to create and authenticate the Wix client
export function createWixClient() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
        throw new Error('CLIENT_ID and CLIENT_SECRET must be set in the .env file.');
    }

    // Create the Wix SDK client with OAuth authentication
    return createClient({
        modules: { products, services, availabilityCalendar },
        auth: OAuthStrategy({
            clientId, 
            clientSecret // Add clientSecret here
        }),
    });
}
