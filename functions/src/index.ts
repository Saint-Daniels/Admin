/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as mysql from 'mysql2/promise';
import * as cors from 'cors';

admin.initializeApp();

// Database configuration
const dbConfig = {
  host: '34.27.23.140',
  user: 'saintdaniels',
  password: 'Hatedbymany23.!',
  database: 'saintdanielsmysqldb'
};

// Middleware to check if user is admin
const isAdmin = async (req: any, res: any, next: () => void) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedToken.uid);
    
    if (!user.customClaims?.admin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Get applications with pagination
export const getApplications = functions.https.onRequest(async (req, res) => {
  return cors({ origin: true })(req, res, async () => {
    try {
      // Check admin status
      await isAdmin(req, res, async () => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        console.log("Attempting to connect to MySQL database...");
        
        // Create connection pool
        const pool = mysql.createPool(dbConfig);
        console.log("MySQL connection pool created");

        try {
          // Test the connection
          const connection = await pool.getConnection();
          console.log("Successfully connected to MySQL database");
          connection.release();

          // Get total count
          console.log("Executing COUNT query...");
          const [countResult] = await pool.query('SELECT COUNT(*) as total FROM applications');
          const total = (countResult as any)[0].total;
          console.log("Total applications found:", total);

          // Get paginated applications
          console.log("Executing SELECT query with pagination...");
          const [applications] = await pool.query(
            'SELECT * FROM applications ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
          );
          console.log("Applications retrieved:", applications);

          // Close the connection
          await pool.end();
          console.log("Database connection closed");

          res.json({
            applications,
            pagination: {
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit)
            }
          });
        } catch (dbError: any) {
          console.error("Database error:", dbError);
          res.status(500).json({ 
            error: "Database error", 
            details: dbError.message,
            code: dbError.code
          });
        }
      });
    } catch (error: any) {
      console.error("Error in getApplications:", error);
      res.status(500).json({ 
        error: "Internal server error",
        details: error.message
      });
    }
  });
});
