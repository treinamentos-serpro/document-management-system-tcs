import { useState } from 'react';
import { uploadDocument } from '../services/documentsApi';

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
    <form className="rounded-lg border border-line bg-white/95 p-5 shadow-panel sm:p-6" onSubmit={handleSubmit}>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-action">Novo arquivo</p>
        <h2 className="mt-1 text-xl font-semibold text-ink">Enviar documento</h2>
      </div>

      <div className="space-y-5">
        <label className="block" htmlFor="file">
          <span className="mb-2 block text-sm font-semibold text-ink">Arquivo</span>
        <input
          id="file"
          className="block w-full cursor-pointer rounded-md border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-700 file:mr-4 file:border-0 file:bg-action file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:border-action focus:outline-none focus:ring-2 focus:ring-action/30"
          type="file"
          onChange={(event) => setFile(event.target.files[0] ?? null)}
        />
        </label>

        <label className="block" htmlFor="owner">
          <span className="mb-2 block text-sm font-semibold text-ink">Dono</span>
        <input
          id="owner"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition focus:border-action focus:ring-2 focus:ring-action/25"
          placeholder="Nome do responsável"
          type="text"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
        />
        </label>
      </div>

      {error && <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button
        className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-action px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        type="submit"
        disabled={isUploading}
      >
        {isUploading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
