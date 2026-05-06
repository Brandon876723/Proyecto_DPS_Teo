const express = require('express');
const router = express.Router();
const controller = require('../controllers/libroController');

router.get('/', controller.getLibros);
router.post('/', controller.createLibro);
router.delete("/:id", controller.deleteLibro);

module.exports = router;