---
description: "Melhora o visual da aplicação React do DMS usando Tailwind CSS 3."
name: melhorar-visual-tailwind
argument-hint: objetivo visual opcional, ex. dashboard claro e responsivo
agent: tailwind-ui
---

# Melhorar visual com Tailwind CSS 3

Melhore o visual da aplicação Document Management System usando Tailwind CSS 3.

Contexto atual:

- Frontend em `frontend/` com React + Vite.
- Componentes principais em `frontend/src/App.jsx` e `frontend/src/components`.
- Cliente de API em `frontend/src/services`, consumindo o backend via `fetch` com prefixo `/api`.
- Fluxo funcional esperado: upload de documento, listagem de documentos e download.

Objetivo visual informado pelo usuário:

`${input:objetivo:crie uma interface clara, responsiva e profissional para gestão de documentos}`

Requisitos:

1. Instale e configure Tailwind CSS 3 no projeto frontend se ainda não estiver configurado.
2. Configure `tailwind.config.js`, `postcss.config.js` e o CSS global conforme o padrão Vite + React.
3. Atualize a interface em `App.jsx`, `UploadComponent`, `DocumentList` e `DownloadButton` usando classes Tailwind.
4. Preserve o comportamento atual de upload, listagem, estados de erro e download via `/api`.
5. Evite duplicação de marcação e estilos; extraia pequenos helpers somente quando simplificarem o código.
6. Crie uma aparência de aplicação de gestão documental: organizada, responsiva, legível, com boa hierarquia visual e ações claras.
7. Não crie uma landing page nem textos explicativos sobre como usar a aplicação.
8. Mantenha mensagens visíveis ao usuário em português.
9. Valide a mudança com `npm run build` dentro de `frontend/`.

Ao final, reporte arquivos alterados, decisões de UI e resultado da validação.
