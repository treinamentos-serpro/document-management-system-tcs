import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { fetchDocuments } from './services/documentsApi';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchDocuments();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e7f0ea,transparent_34rem),linear-gradient(135deg,#f7f8f5_0%,#edf1ec_48%,#f7f8f5_100%)] px-4 py-6 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-action">Gestão documental</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
              Document Management System
            </h1>
          </div>
          <div className="rounded-md border border-line bg-white/75 px-4 py-3 text-sm shadow-sm">
            <span className="font-semibold text-archive">{documents.length}</span>{' '}
            {documents.length === 1 ? 'documento cadastrado' : 'documentos cadastrados'}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          <UploadComponent onUploadSuccess={loadDocuments} />

          <div className="rounded-lg border border-line bg-white/90 shadow-panel">
            <div className="flex flex-col gap-1 border-b border-line px-5 py-4 sm:px-6">
              <h2 className="text-xl font-semibold text-ink">Documentos</h2>
              <p className="text-sm text-slate-600">Arquivos disponíveis para consulta e download.</p>
            </div>
            {error && (
              <div className="mx-5 mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6">
                {error}
              </div>
            )}
            <DocumentList documents={documents} isLoading={isLoading} />
          </div>
        </section>
      </div>
    </main>
  );
}
