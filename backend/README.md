# Backend

## Run locally

```bash
npm install
npm run dev
```

Server URL:

```text
http://localhost:5000
```

Health endpoint:

```text
http://localhost:5000/health
```

## API endpoint

### `POST /api/upload`

Accepts `multipart/form-data` with:

- `file`
- `firstName`
- `lastName`
- `dob`

Returns:

- `fullName`
- `age`
- `rawText`

## Docker

```bash
docker build -t oms-backend .
docker run -p 5000:5000 oms-backend
```
