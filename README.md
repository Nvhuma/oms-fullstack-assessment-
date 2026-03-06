# Full Stack Developer Coding Assessment

A full-stack assessment project built with:

- **Frontend:** Next.js 14 + Tailwind CSS
- **Backend:** Express.js
- **File parsing:** `pdf-parse` for PDFs, `tesseract.js` for images

## Overview

The application allows a user to:

1. Upload a **PDF** or **image**
2. Enter **first name**, **last name**, and **date of birth**
3. Submit the form to the backend
4. View a result page showing:
   - **Full Name**
   - **Age**
   - **Raw Extracted Text**

## Features

- Two-page Next.js frontend
- Express API with `POST /api/upload`
- Multipart file upload using `multer`
- PDF text extraction using `pdf-parse`
- OCR for images using `tesseract.js`
- Server-side validation for form data and file types
- Clean Tailwind UI with reusable frontend components
- Docker support via `Dockerfile`s and `docker-compose.yml`

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   └── upload.js
│   │   ├── services/
│   │   │   └── extractText.js
│   │   └── utils/
│   │       ├── age.js
│   │       └── validate.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── _components/
│   │   ├── lib/
│   │   ├── result/
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Local Development

### 1) Run the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

### 2) Run the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## Docker Setup

### Build and run everything

From the project root:

```bash
docker compose up --build
```

Application URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

### Stop containers

```bash
docker compose down
```

## API

### `POST /api/upload`

**Content-Type:** `multipart/form-data`

Fields:

- `file` — PDF or image
- `firstName` — string
- `lastName` — string
- `dob` — date in `YYYY-MM-DD` format

### Example successful response

```json
{
  "fullName": "Jane Doe",
  "age": 27,
  "rawText": "Example extracted text"
}
```

## Validation Rules

The backend validates:

- file is present
- first name is present
- last name is present
- date of birth is valid
- date of birth is not in the future
- file type is supported

Supported file types:

- PDF
- JPG / JPEG
- PNG
- WEBP
- BMP
- TIFF
- GIF

## Notes

- OCR can take a few seconds for image uploads.
- Result data is passed from the upload page to the result page using `sessionStorage`.
- The frontend was refactored into small reusable components to keep page files easier to read and debug.

## Submission Checklist

- [x] Next.js frontend with Tailwind
- [x] Express backend
- [x] PDF/image text extraction
- [x] Age calculation
- [x] Separate result page
- [x] Input validation
- [x] Clean project structure
- [x] Docker support
- [x] README with setup instructions
