# Payment Checkout App

Full-stack e-commerce checkout application with payment gateway integration.

## Live Demo
- **Frontend:** http://payment-checkout-frontend-natali.s3-website-us-east-1.amazonaws.com
- **API Docs (Swagger):** http://payment-checkout-env.eba-vuwtu5pz.us-east-1.elasticbeanstalk.com/api/docs

---

## Tech Stack

### Frontend
- React 18 + TypeScript
- Redux Toolkit (Flux Architecture)
- Vite
- CSS Flexbox / Grid

### Backend
- NestJS + TypeScript
- Hexagonal Architecture + Ports & Adapters
- Railway Oriented Programming (ROP)
- PostgreSQL + TypeORM

---

## Architecture
```
backend/src/
├── domain/          # Entities, Repository Ports
├── application/     # Use Cases (ROP)
├── infrastructure/  # ORM Entities, Repositories, Wompi Adapter
└── interface/       # Controllers, DTOs
```

---

## Data Model
```
┌──────────────┐     ┌────────────────┐
│   products   │     │  transactions  │
│──────────────│     │────────────────│
│ id (uuid)    │◄────│ product_id     │
│ name         │     │ customer_id    │
│ description  │     │ reference      │
│ price        │     │ status         │
│ stock        │     │ amount_cents   │
│ image_url    │     │ wompi_tx_id    │
└──────────────┘     │ installments   │
                     └────────┬───────┘
┌──────────────┐              │
│  customers   │◄─────────────┘
│──────────────│
│ id (uuid)    │     ┌────────────────┐
│ name         │     │   deliveries   │
│ email        │     │────────────────│
│ phone        │     │ transaction_id │
└──────────────┘     │ address        │
                     │ city           │
                     │ status         │
                     └────────────────┘
```

---

## Business Flow
```
1. Product page → 2. Credit Card/Delivery info → 3. Summary → 4. Final status → 5. Product page
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | List all products with stock |
| GET | `/api/v1/products/:id` | Get single product |
| POST | `/api/v1/transactions` | Create PENDING transaction |
| PATCH | `/api/v1/transactions/:reference` | Update transaction result |
| GET | `/api/v1/transactions/:reference` | Get transaction by reference |
| POST | `/api/v1/payment/tokenize` | Tokenize credit card via Wompi |
| POST | `/api/v1/payment/charge` | Process payment via Wompi |

Full Swagger docs: http://payment-checkout-env.eba-vuwtu5pz.us-east-1.elasticbeanstalk.com/api/docs

---

## Local Setup

### Prerequisites
- Node.js 20+
- PostgreSQL 15+

### Backend
```bash
cd backend
cp .env.example .env   # fill DB and Wompi keys
npm install
npm run seed
npm run start:dev
```

### Frontend
```bash
cd frontend
cp .env.example .env   # fill API URL
npm install
npm run dev
```

---

## Environment Variables

### Backend `.env`
```
DATABASE_URL=postgresql://user:pass@localhost:5432/checkout_db
WOMPI_PUBLIC_KEY=pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7
WOMPI_PRIVATE_KEY=prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg
WOMPI_INTEGRITY_KEY=stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp
WOMPI_BASE_URL=https://api-sandbox.co.uat.wompi.dev/v1
PORT=4000
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:4000/api/v1
VITE_WOMPI_PUBLIC_KEY=pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7
VITE_WOMPI_BASE_URL=https://api-sandbox.co.uat.wompi.dev/v1
```

---

## Test Coverage Results

### Backend
```
--------------------------------|---------|----------|---------|---------|
File                            | % Stmts | % Branch | % Funcs | % Lines |
--------------------------------|---------|----------|---------|---------|
All files                       |   97.79 |   77.94  |   90.56 |   97.07 |
 application/product            |   100   |   100    |   100   |   100   |
 application/transaction        |   100   |   100    |   100   |   100   |
 application/payment            |   100   |   100    |   100   |   100   |
 domain/product                 |   100   |   100    |   100   |   100   |
 shared/result                  |   100   |   100    |   100   |   100   |
--------------------------------|---------|----------|---------|---------|
Test Suites: 10 passed, 10 total
Tests:       45 passed, 45 total
```

### Frontend
```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   40.9  |   63.04  |   36.11 |   43.69 |
 utils/card.utils   |   96.55 |   96.55  |   100   |   100   |
 utils/currency     |   100   |   100    |   100   |   100   |
 store/slices       |   36.48 |   11.11  |   36.84 |   40.35 |
--------------------|---------|----------|---------|---------|
Test Suites: 4 passed, 4 total
Tests:       23 passed, 23 total
```

> Run `npm run test:coverage` in each folder to regenerate.

---

## Deployment

- **Frontend:** AWS S3 + CloudFront
- **Backend:** AWS Elastic Beanstalk (Node.js 24 / Amazon Linux 2023)
- **Database:** AWS RDS PostgreSQL (db.t3.micro)

---

## Security (OWASP)
- Helmet.js security headers
- CORS restricted to frontend origin
- Private keys never exposed to frontend
- Card data not persisted — only tokenized reference stored
- Input validation with class-validator