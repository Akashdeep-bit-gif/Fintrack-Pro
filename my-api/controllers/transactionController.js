const pool = require('../config/db');

// @desc    Get all transactions
// @route   GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, c.name as category_name 
      FROM transactions t 
      LEFT JOIN categories c ON t.category_id = c.id 
      ORDER BY t.id DESC
    `);
    
    res.status(200).json({ 
      success: true, 
      count: rows.length, 
      data: rows 
    });
  } catch (error) {
    console.error('Fetch Transactions Error:', error.message);
    res.status(500).json({ success: false, error: 'Server Error: Unable to fetch transactions' });
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res) => {
  const { amount, type, description, category_id } = req.body;

  // Simple validation
  if (!amount || !type || !category_id) {
    return res.status(400).json({
      success: false,
      error: 'Please provide amount, type (income/expense), and category_id'
    });
  }

  try {
    // We pass 1 for the user_id and NOW() for the transaction_date
    const [result] = await pool.query(
      'INSERT INTO transactions (amount, type, description, category_id, user_id, transaction_date) VALUES (?, ?, ?, ?, ?, NOW())',
      [amount, type, description, category_id, 1]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        amount,
        type,
        description,
        category_id
      }
    });
  } catch (error) {
    console.error('Add Transaction Error:', error.message);
    res.status(500).json({ success: false, error: 'Server Error: Unable to save transaction' });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM transactions WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Transaction not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Delete Transaction Error:', error.message);
    res.status(500).json({ success: false, error: 'Server Error: Unable to delete transaction' });
  }
};