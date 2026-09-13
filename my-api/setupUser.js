const pool = require('./config/db');

async function createFinalUser() {
  try {
    // Inserting a dummy user matching your exact column names
    await pool.query(
      "INSERT IGNORE INTO users (id, email, password_hash, full_name) VALUES (1, 'test@test.com', 'fakehash123', 'Test User')"
    );
    console.log("✅ Success: Dummy user created!");
  } catch (error) {
    console.error("Error:", error.message);
  }
  process.exit();
}

createFinalUser();