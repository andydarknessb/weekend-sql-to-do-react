const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM tasks ORDER BY id');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message });
    } 
});

// POST
router.post('/', async (req, res) => {
    try{
        const { description } = req.body;
        const result = await pool.query('INSERT INTO tasks (description) VALUEs ($1) RETURNING id', [description]);
        res.status(201).json({ id: result.rows[0].id});
    } catch (error) {
        res.status(500).json({error: error.message });
    }   
});

// PUT
router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { isComplete } = req.body;
        await pool.query('UPDATE tasks SET is_complete = $1 WHERE id = $2', [isComplete, id]);
        res.sendStatus(204);
    }   catch (error) {
        res.status(500).json({error: error.message});
    }
});

// DELETE
router.delete('/:id',async (req, res) => {
    try {
        const { id } =req.params;
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
    
});

module.exports = router;
