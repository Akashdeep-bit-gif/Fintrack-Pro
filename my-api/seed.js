const pool = require('./config/db');
const defaultCategories = [['Income', 'income'],
  ['Travel & Transit', 'expense'],
  ['Food & Dining', 'expense'],
  ['Education & Academics', 'expense'],
  ['Investments & Trading', 'expense'],
  ['Utilities & Subscriptions', 'expense'] 
];
const seedDatabase = async () => {
    try {
     console.log('Seeding the database with default categories...');

     for (const [name, type] of defaultCategories) {
        await pool.execute(
            `  INSERT INTO categories (name,type) 
               VALUES (?,?) AS new_row
               ON DUPLICATE KEY UPDATE type = new_row.type`,
               [name, type]
        );
    }
    console.log('✅ Database seeding completed successfully.');
    process.exit(0); // Exit the process after seeding
}   catch (error) {
    console.error('❌ Error seeding the database:', error.message);
    process.exit(1); // Exit with an error code
}
};
seedDatabase(); // Call the seed function to populate the database
       