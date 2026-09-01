import { getDownloadUrl } from '../services/documentsApi';

// Botão que aciona o download de um documento em uma nova aba.
export default function DownloadButton({ documentId, fileName }) {
  return (
    <a href={getDownloadUrl(documentId)} download={fileName}>
      <button type="button">Baixar</button>
    </a>
  );
}
