const express = require('express');
const controller = require('../controller/LincrosController');

const router = express.Router();

router.get('/', controller.health);
router.post('/buscar-anexos', controller.buscarAnexos);
router.post('/download-anexo', controller.downloadAnexo);

module.exports = router;