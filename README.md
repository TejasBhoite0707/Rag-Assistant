# RAG Assistant

A full-stack Retrieval-Augmented Generation (RAG) application that allows users to create isolated workspaces, upload PDF documents, and ask AI-powered questions based only on the documents uploaded within a selected workspace.

Each workspace is completely isolated, ensuring that documents and AI responses are accessible only within their respective workspace.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication using HTTP-only Cookies
- Persistent Authentication
- Secure Logout

### Workspace Management

- Create Workspace
- View All Workspaces
- Delete Workspace
- Workspace Isolation

### Document Management

- Upload PDF Documents
- Automatic PDF Parsing
- Text Chunking
- Generate Embeddings
- Store Embeddings in PostgreSQL (pgvector)
- View Uploaded Documents
- Delete Documents
- Open Documents in Browser

### AI Assistant

- Ask Questions about Uploaded Documents
- Semantic Search using pgvector
- Context-based AI Responses
- Workspace-level Document Isolation

---

# Tech Stack

## Frontend

- React.js
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- Lucide React

## Backend

- Node.js
- Express.js
- PostgreSQL
- pgvector
- JWT Authentication
- Multer
- pdf-parse

## AI

- Google Gemini API
- pgvector Semantic Search

---

# Project Structure

```
RAG-Assistant/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── package.json
│   └── index.js
│
├── README.md
├── AI_NOTES.md
└── .gitignore
```

---

# How It Works

1. User registers or logs in.
2. User creates a workspace.
3. User uploads one or more PDF documents.
4. PDFs are parsed into plain text.
5. Text is split into chunks.
6. Embeddings are generated.
7. Embeddings are stored in PostgreSQL.
8. User asks a question.
9. Relevant chunks are retrieved using vector similarity search.
10. Gemini generates an answer using the retrieved context.

---

# Running the Application Locally

## Clone Repository

```bash
git clone <repository-url>

cd RAG-Assistant
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

## Environment Variables

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

### Server (`server/.env`)

```env
DATABASE_URL=your_database_connection

PORT=5000

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

DISCORD_WEBHOOK=

EMBEDDING_MODEL=your_embedding_model
```

---

## Build Frontend

From the **client** directory:

```bash
npm run build
```

This generates:

```
client/dist
```

The Express server automatically serves this production build.

---

## Start Backend

```bash
cd ../server

npm start
```

or

```bash
npm run dev
```

Open:

```
http://localhost:5000
```

The React frontend and backend APIs are served from the same server.

---

# Environment Variables

## Client

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

## Server

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL Connection String |
| PORT | Backend Port |
| JWT_SECRET | JWT Secret |
| GEMINI_API_KEY | Google Gemini API Key |
| DISCORD_WEBHOOK | Discord Webhook (Optional) |
| EMBEDDING_MODEL | Embedding Model Name |

---

# Deployment

The application is deployed as a single Express application.

```
Browser
      │
      ▼
Express Server
      │
      ├── React Production Build
      └── REST APIs
```

The frontend is built using Vite and served directly from the Express backend.

---

# API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/profile
```

---

## Workspace

```
POST /api/workspaces

GET /api/workspaces

GET /api/workspaces/:id

DELETE /api/workspaces/:id
```

---

## Documents

```
POST /api/documents/upload

GET /api/documents/:workspaceId

DELETE /api/documents/:documentId

GET /api/documents/view/:documentId
```

---

## Chat

```
POST /api/chat
```

---

# Testing Instructions

## Login

Create a test account using the Register page or use a demo account if available.

---

## Create Two Workspaces

Example:

```
Resume Documents
```

```
React Notes
```

---

## Upload Sample PDFs

Workspace 1

```
Resume.pdf
```

Workspace 2

```
ReactGuide.pdf
```

---

## Sample Questions

### Resume

```
Summarize the resume.

What technologies does the candidate know?

What is the candidate's work experience?

List the projects mentioned.
```

### React Notes

```
What is React?

Explain Hooks.

Summarize the uploaded document.

What are the key concepts?
```

---

## Workspace Isolation Test

1. Upload Resume.pdf to Workspace A.
2. Upload ReactGuide.pdf to Workspace B.
3. Open Workspace B.
4. Ask:

```
What is the candidate's work experience?
```

Expected Result:

The AI should not answer using Resume.pdf because it belongs to another workspace.

---

# Future Improvements

- Drag & Drop Upload
- Embedded PDF Preview
- AI Response Streaming
- Conversation History
- Multiple File Search
- OCR Support
- Role-based Access
- Docker Support

---

# License

This project was developed as part of a technical assessment and for educational purposes.