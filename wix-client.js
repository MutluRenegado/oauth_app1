// wix-client.js
import dotenv from 'dotenv';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { services, availabilityCalendar } from '@wix/bookings';
import { products } from '@wix/stores';

dotenv.config();

export function createWixClient() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('CLIENT_ID and CLIENT_SECRET must be set in the .env file.');
    }

    return createClient({
        modules: { products, services, availabilityCalendar },
        auth: OAuthStrategy({ clientId }),
    });
}
