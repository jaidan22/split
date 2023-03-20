# _₹ SPLIT_

## Installation

### 1.Clone GitHub repository

```bash
git clone https://github.com/jaidan22/split.git
```

### 2. Add .env file for backend

```bash
cd api
touch .env
```

api/.env

```bash
DB_URL= 'Database URL'
PORT= 'PORT'
JWT_SECRET= 'JWT secret key'
```

### 3. Start Backend server

```bash
npm run devStart
```

### 4. Add .env file for React App

```bash
cd client
touch .env
```

client/.env

```bash
REACT_APP_API_URL = "Backend server URL"
```

### 5. Run React App

```bash
npm start
```

## Implemented Features

- Settle debts between Peers using Minimum no. of Transaction per user
- Get Summary about lended and owed amount
- Add debt
- Settle debt
- Search for new users
- Add new group
- Split expense between multiple users in group
- Get list of all debts of an expense

####

- Frontend Hosted in <a href='https://wisebillsplit.jaidan22.vercel.app/'>Vercel </a>  (Enable cookies)
- Backend Hosted in <a href='https://test-split-api.jaidan22.vercel.app/'>Vercel</a>
- <a href="https://drive.google.com/file/d/1ZzQ7Y7nPCsUBBJ_OmEloPDAvLvanmIWf/view?usp=share_link">Link</a> to Demo Video
