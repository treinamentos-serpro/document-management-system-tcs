import { getDownloadUrl } from '../services/documentsApi';

export default function DownloadButton({ documentId, fileName }) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-md border border-archive/20 bg-archive px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-archive/30"
      href={getDownloadUrl(documentId)}
      download={fileName}
    >
      Baixar
    </a>
  );
}
