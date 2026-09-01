// Cliente de API para os endpoints de documentos, consumidos via prefixo /api.
const API_BASE_URL = '/api';

async function parseResponse(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error || 'Erro ao comunicar com o servidor.';
    throw new Error(message);
  }
  return data;
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('owner', owner);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return parseResponse(response);
}

export async function fetchDocuments() {
  const response = await fetch(`${API_BASE_URL}/documents`);
  return parseResponse(response);
}

export function getDownloadUrl(documentId) {
  return `${API_BASE_URL}/documents/${documentId}/download`;
}
