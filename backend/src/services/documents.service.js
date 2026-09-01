// Regras de negócio para upload, listagem e download de documentos.
const crypto = require('node:crypto');
const repository = require('../repositories/documents.repository');

function registerUpload(file, owner) {
  const metadata = {
    id: crypto.randomUUID(),
    originalName: file.originalname,
    storedName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    owner,
  };
  return repository.save(metadata);
}

function listDocuments() {
  return repository.findAll();
}

function getDocumentById(id) {
  return repository.findById(id);
}

module.exports = { registerUpload, listDocuments, getDocumentById };
