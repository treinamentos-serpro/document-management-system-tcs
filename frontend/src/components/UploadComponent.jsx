import { useState } from 'react';
import { uploadDocument } from '../services/documentsApi';

// Formulário de upload de documento com seleção de arquivo e dono.
export default function UploadComponent({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('');
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file || !owner) {
      setError('Selecione um arquivo e informe o dono do documento.');
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      await uploadDocument(file, owner);
      setFile(null);
      setOwner('');
      event.target.reset();
      onUploadSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar documento</h2>
      <div>
        <label htmlFor="file">Arquivo</label>
        <input
          id="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0] ?? null)}
        />
      </div>
      <div>
        <label htmlFor="owner">Dono</label>
        <input
          id="owner"
          type="text"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isUploading}>
        {isUploading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
