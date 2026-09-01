// Entrada/saída HTTP e validação básica dos endpoints de documentos.
const path = require('node:path');
const service = require('../services/documents.service');
const { STORAGE_DIR } = require('../repositories/documents.repository');

function upload(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
  }
  if (!req.body.owner) {
    return res.status(400).json({ error: 'O campo owner é obrigatório.' });
  }

  const document = service.registerUpload(req.file, req.body.owner);
  return res.status(201).json(document);
}

function list(req, res) {
  return res.status(200).json(service.listDocuments());
}

function download(req, res) {
  const document = service.getDocumentById(req.params.id);
  if (!document) {
    return res.status(404).json({ error: 'Documento não encontrado.' });
  }

  const filePath = path.join(STORAGE_DIR, document.storedName);
  return res.download(filePath, document.originalName, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ error: 'Arquivo do documento não encontrado.' });
    }
  });
}

module.exports = { upload, list, download };
