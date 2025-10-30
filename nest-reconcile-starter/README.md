# Bank Transaction Reconciliation Service — Full Stack (Pro)

## Backend quickstart (without Docker)
```bash
npm install
cp .env.example .env
docker run --name mongo -p 27017:27017 -d mongo:7
node mock-bank/mock-bank.js & # separate terminal
npm run start:dev
# API at http://localhost:3000/api
```

## Endpoints
- POST /api/reconcile?accountId=acc_123
- GET  /api/reports/latest?accountId=acc_123
- GET  /api/reports/:id
- POST /api/ledger/transactions
- GET  /api/ledger/transactions
- GET  /api/bank/import?accountId=acc_123

## Docker Compose (Full Stack)
```bash
docker compose up --build
```
- Frontend: http://localhost:8080
- API:      http://localhost:3000/api
- MockBank: http://localhost:4000


## Fuzzy Matching & Tolerance
- Env vars:
  - `TOLERANCE_EUR` (default `0.5`) — max absolute diff for amounts.
  - `SIMILARITY_THRESHOLD` (default `0.7`) — Dice similarity 0..1 on descriptions.
- Report now includes:
  - `matched`, `fuzzy_matched`, `missing_in_ledger`, `missing_in_bank`
  - `fuzzyDetails` with `{ bank, ledger, similarity }`

Front-end shows fuzzy count on the Dashboard and a Fuzzy section in Details.
