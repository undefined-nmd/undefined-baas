import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// Initialize firebase for accesing to its services 
admin.initializeApp(functions.config().firebase);

// Import the Express app
import app from './src/app';

// Export our function
export const webApi = functions.https.onRequest(app);
