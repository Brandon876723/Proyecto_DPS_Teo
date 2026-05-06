const express = require('express');
const router = express.Router();
const controller = require('../controllers/prestamoController');

router.get('/', controller.getPrestamos);
router.post('/', controller.createPrestamo);

module.exports = router;