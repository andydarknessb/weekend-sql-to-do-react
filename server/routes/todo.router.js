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
router.post('/api/tasks', async (req, res) => {
    try{
        const { description } = req.body;
        const result = await pool.query('INSERT INTO tasks (description) VALUEs ($1) RETURNING id', [description]);
        res.status(201).json({ id: result.rows[0].id});
    } catch (error) {
        res.status(500).json({error: error.message });
    }   
});

// PUT

// DELETE

module.exports = router;
