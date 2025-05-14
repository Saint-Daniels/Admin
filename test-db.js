const mysql = require("mysql2/promise");

const dbConfig = {
  host: "34.27.23.140",
  user: "saintdaniels",
  password: "Hatedbymany23.!",
  database: "saintdanielsmysqldb",
  port: 3306,
  connectTimeout: 10000, // 10 seconds
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function testConnection() {
  try {
    console.log("Attempting to connect to MySQL database...");
    console.log("Connection config:", {
      ...dbConfig,
      password: "********" // Hide password in logs
    });
    
    const connection = await mysql.createConnection(dbConfig);
    console.log("Successfully connected to MySQL database");

    // Test the applications table
    console.log("\nChecking applications table...");
    const [tables] = await connection.query("SHOW TABLES");
    console.log("Available tables:", tables);

    if (tables.some(table => Object.values(table)[0] === "applications")) {
      const [columns] = await connection.query("DESCRIBE applications");
      console.log("\nApplications table structure:", columns);

      const [count] = await connection.query("SELECT COUNT(*) as total FROM applications");
      console.log("\nTotal applications:", count[0].total);

      const [applications] = await connection.query("SELECT * FROM applications LIMIT 5");
      console.log("\nSample applications:", applications);
    } else {
      console.log("\nError: 'applications' table not found!");
    }

    await connection.end();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
  }
}

testConnection(); 