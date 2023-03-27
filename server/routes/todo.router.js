const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/api/tasks', async (req, res) => {
    try{
        const result = await pool.query
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message });
    } 
});

// POST

// PUT

// DELETE

module.exports = router;
