// Persistência dos documentos: arquivos em disco (multer) + metadados em memória.
const path = require('node:path');
const multer = require('multer');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

const documents = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, STORAGE_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

function save(metadata) {
  documents.push(metadata);
  return metadata;
}

function findAll() {
  return documents;
}

function findById(id) {
  return documents.find((document) => document.id === id);
}

module.exports = { STORAGE_DIR, storage, save, findAll, findById };
