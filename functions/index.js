const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mysql = require('mysql2/promise');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Database configuration
const dbConfig = {
  host: '34.71.242.39', // Replace with your actual IP address
  user: 'saintdaniels',
  password: 'Hatedbymany23.!',
  database: 'saintdanielsmysqldb'
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
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
exports.getApplications = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      // Check admin status
      await isAdmin(req, res, async () => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Create connection pool
        const pool = mysql.createPool(dbConfig);

        // Get total count
        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM applications');
        const total = countResult[0].total;

        // Get paginated applications
        const [applications] = await pool.query(
          'SELECT * FROM applications ORDER BY created_at DESC LIMIT ? OFFSET ?',
          [limit, offset]
        );

        // Close the connection
        await pool.end();

        res.json({
          applications,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
          }
        });
      });
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}); 