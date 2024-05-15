const pool = require('../config/database');
const { calculateScore } = require('../utils/aiModel');

exports.createProfile = async (req, res) => {
    const { characteristic_1, characteristic_2, characteristic_3 } = req.body;
    const score = calculateScore(characteristic_1, characteristic_2, characteristic_3);
    try {
        const result = await pool.query(
            'INSERT INTO profiles (user_id, characteristic_1, characteristic_2, characteristic_3, score) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [req.userId, characteristic_1, characteristic_2, characteristic_3, score]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send("Error creating profile.");
    }
};