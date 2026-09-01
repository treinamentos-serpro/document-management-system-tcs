import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { fetchDocuments } from './services/documentsApi';

// Componente raiz: monta upload, listagem e download de documentos.
export default function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const loadDocuments = useCallback(async () => {
    try {
      const data = await fetchDocuments();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Document Management System</h1>
      <UploadComponent onUploadSuccess={loadDocuments} />
      <h2>Documentos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <DocumentList documents={documents} />
    </main>
  );
}
