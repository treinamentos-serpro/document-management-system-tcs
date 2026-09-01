// Rotas de documentos: apenas mapeiam endpoint -> controller.
const express = require('express');
const multer = require('multer');
const controller = require('../controllers/documents.controller');
const { storage } = require('../repositories/documents.repository');

const upload = multer({ storage });
const router = express.Router();

router.post('/upload', upload.single('file'), controller.upload);
router.get('/documents', controller.list);
router.get('/documents/:id/download', controller.download);

module.exports = router;
