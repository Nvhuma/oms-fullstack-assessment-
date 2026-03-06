# Frontend

## Run locally

```bash
npm install
npm run dev
```

App URL:

```text
http://localhost:3000
```

## Environment variable

`NEXT_PUBLIC_API_URL`

Default local value:

```text
http://localhost:5000
```

## Docker

```bash
docker build -t oms-frontend .
docker run -p 3000:3000 oms-frontend
```
