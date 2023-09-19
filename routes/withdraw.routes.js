const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: "I am in withdraw API "
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
});



module.exports = router;