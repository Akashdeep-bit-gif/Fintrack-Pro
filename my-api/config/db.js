const mysql = require('mysql2/promise');
require('dotenv').config(); //ensure it reads the .env file from the config folder

// Create a robust connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 

// Test the connection immediately on startup
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL 8.4 Engine Connected Successfully.');
        connection.release(); // Release the connection back to the pool
    }  catch (error) {
        console.error('❌ Database Connection Failed:', error.message);
        process.exit(1); // kill the server if the device is unreachable
    }
};
testConnection(); // Call the test connection function on startup
module.exports = pool; // Export the connection pool for use in other parts of the application