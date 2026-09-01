# Especificação - Document Management System

## 1. Objetivo

Prover um sistema web simples para upload, listagem e download de documentos,
com armazenamento estritamente local e gestão básica por usuário.

## 2. Escopo

### Dentro do escopo

- Upload de um documento por vez via `multipart/form-data`
- Listagem de todos os documentos enviados
- Download de um documento pelo seu identificador
- Associação de cada documento a um usuário (owner) informado na requisição

### Fora do escopo

- Armazenamento externo ou em nuvem (S3, Blob Storage, etc.)
- Versionamento de documentos
- Autenticação/autorização real (login, sessões, tokens)
- Persistência em banco de dados (metadados ficam em memória nesta fase)
- Edição ou exclusão de documentos
- Upload múltiplo (batch) na mesma requisição

## 3. Requisitos funcionais

| ID    | Requisito                                                            |
| ----- | --------------------------------------------------------------------- |
| RF-01 | O usuário pode enviar um documento via `POST /upload`                 |
| RF-02 | O usuário pode listar todos os documentos enviados via `GET /documents` |
| RF-03 | O usuário pode baixar um documento pelo identificador via `GET /documents/:id/download` |
| RF-04 | O sistema deve rejeitar upload sem arquivo anexado, retornando erro claro |
| RF-05 | O sistema deve retornar erro 404 ao tentar baixar um documento inexistente |
| RF-06 | Cada documento enviado deve registrar o usuário dono (`owner`) informado no upload |

## 4. Requisitos não funcionais

| ID     | Requisito                                                          |
| ------ | ------------------------------------------------------------------- |
| RNF-01 | Arquivos gravados no filesystem local via `multer` com `diskStorage`, na pasta `backend/storage` |
| RNF-02 | Metadados dos documentos mantidos em memória (sem banco de dados) nesta fase |
| RNF-03 | Configuração via variáveis de ambiente (12-Factor), ex.: `PORT`      |
| RNF-04 | Backend organizado em Clean Architecture simples: `routes -> controllers -> services -> repositories` |
| RNF-05 | Frontend organizado por componentes: `components/`, `pages/`, `services/`, com comunicação via `fetch` sob prefixo `/api` |
| RNF-06 | Erros tratados nos limites do sistema (entrada HTTP, leitura/escrita de arquivos) |
| RNF-07 | Sem dependências externas de armazenamento ou upload de terceiros    |

## 5. Modelo de dados (metadados do documento)

| Campo        | Tipo   | Descrição                                      |
| ------------ | ------ | ----------------------------------------------- |
| id           | string | Identificador único do documento (ex.: UUID)    |
| originalName | string | Nome original do arquivo enviado                |
| storedName   | string | Nome do arquivo gravado em `backend/storage`    |
| mimeType     | string | Tipo MIME do arquivo enviado                    |
| size         | number | Tamanho em bytes                                |
| uploadedAt   | string | Data/hora do upload (ISO 8601)                  |
| owner        | string | Identificador do usuário dono                   |

Observação: os metadados residem em uma estrutura em memória (ex.: array/Map)
dentro da camada `repositories/`, isolando essa decisão das demais camadas para
facilitar troca futura por um banco de dados real.

## 6. Contratos de API

Todas as rotas de negócio ficam sob o prefixo `/api` quando consumidas pelo
frontend (proxy do Vite), mas a definição das rotas no Express é feita sem esse
prefixo, com o proxy adicionando-o.

### POST /upload

- Entrada: `multipart/form-data`
  - `file`: arquivo binário (obrigatório)
  - `owner`: string (obrigatório) — identificador do usuário dono
- Sucesso: `201 Created`
  - Corpo: objeto com os metadados do documento criado (ver seção 5)
- Erros:
  - `400 Bad Request` — arquivo ausente ou `owner` não informado
    - Corpo: `{ "error": "mensagem em português" }`

### GET /documents

- Entrada: nenhuma (query params futuros como filtro por `owner` estão fora do
  escopo inicial)
- Sucesso: `200 OK`
  - Corpo: array de objetos com os metadados de cada documento (ver seção 5)

### GET /documents/:id/download

- Entrada: `id` do documento via parâmetro de rota
- Sucesso: `200 OK`
  - Corpo: conteúdo binário do arquivo (stream), com cabeçalhos
    `Content-Type` e `Content-Disposition` (attachment, nome original)
- Erros:
  - `404 Not Found` — documento com o `id` informado não existe
    - Corpo: `{ "error": "mensagem em português" }`

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples, com fluxo de dependência
  `routes -> controllers -> services -> repositories`; camadas internas não
  conhecem camadas externas.
- `routes/` apenas mapeiam endpoint -> controller (sem lógica).
- `controllers/` tratam entrada/saída HTTP e validação básica (ex.: presença do
  arquivo e do `owner`).
- `services/` concentram regras de negócio (ex.: geração do id, montagem dos
  metadados).
- `repositories/` cuidam da persistência: gravação em disco via `multer`
  (diskStorage apontando para `backend/storage`) e armazenamento dos metadados
  em memória.
- Frontend em React com componentes funcionais e Hooks, comunicação via
  `fetch` através do prefixo `/api` (proxy configurado no Vite), organizado em
  `components/`, `pages/`, `services/`.
- Sem provedores de armazenamento externos; toda persistência de arquivo é
  local à aplicação (`backend/storage`).
- Sem TypeScript nesta fase; JavaScript puro (CommonJS no backend, ESM no
  frontend).

## 8. Plano de execução

1. Backend — camada de persistência: configurar `multer` com `diskStorage`
   apontando para `backend/storage` e criar repositório de metadados em
   memória.
2. Backend — camada de serviço: regras de negócio de upload, listagem e
   download (validações de negócio, montagem dos metadados).
3. Backend — camada de controller: validação de entrada HTTP (arquivo e
   `owner` obrigatórios) e formatação das respostas/erros.
4. Backend — camada de rotas: registrar `POST /upload`, `GET /documents` e
   `GET /documents/:id/download` no `app.js`.
5. Backend — testes: cobrir os três endpoints (sucesso e erros 400/404) com
   `node:test`, complementando `backend/test/app.test.js`.
6. Frontend — serviço de API: funções em `services/` para chamar `/api/upload`,
   `/api/documents` e `/api/documents/:id/download`.
7. Frontend — páginas/componentes: tela de upload e tela de listagem/download,
   reutilizando componentes comuns.
8. Integração — validar proxy do Vite para `/api` e teste manual ponta a
   ponta (upload, listar, baixar).
