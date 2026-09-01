import DownloadButton from './DownloadButton';

export default function DocumentList({ documents, isLoading }) {
  if (isLoading) {
    return (
      <div className="px-5 py-12 text-center sm:px-6">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-line border-t-action" />
        <p className="mt-4 text-sm font-semibold text-slate-600">Carregando documentos...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="px-5 py-12 text-center sm:px-6">
        <p className="text-base font-semibold text-ink">Nenhum documento cadastrado ainda.</p>
        <p className="mt-1 text-sm text-slate-600">Envie o primeiro arquivo para iniciar a listagem.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-line text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-3 sm:px-6">Nome</th>
            <th className="px-5 py-3 sm:px-6">Dono</th>
            <th className="px-5 py-3 sm:px-6">Tamanho</th>
            <th className="px-5 py-3 sm:px-6">Enviado em</th>
            <th className="px-5 py-3 text-right sm:px-6">Download</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-white">
          {documents.map((document) => (
            <tr className="transition hover:bg-slate-50" key={document.id}>
              <td className="max-w-[16rem] truncate px-5 py-4 font-semibold text-ink sm:px-6">
                {document.originalName}
              </td>
              <td className="px-5 py-4 text-slate-700 sm:px-6">{document.owner}</td>
              <td className="whitespace-nowrap px-5 py-4 text-slate-600 sm:px-6">{formatSize(document.size)}</td>
              <td className="whitespace-nowrap px-5 py-4 text-slate-600 sm:px-6">
                {new Date(document.uploadedAt).toLocaleString('pt-BR')}
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-right sm:px-6">
                <DownloadButton documentId={document.id} fileName={document.originalName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
