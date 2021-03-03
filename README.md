### 1. Create keypair on server for JWT


run node generateKeypair.js to generate keypair on server


### 2. Add .env file

DATABASE_URI=mongodb://127.0.0.1:27017
DATABASE_STAGING=mongodb://127.0.0.1:27017
DATABASE_DEV=mongodb://127.0.0.1:27017
DATABASE_PRODUCTION=mongodb://127.0.0.1:27017
ORIGIN=http://localhost:3000
NODE_ENV=development
PORT=8081


### 3. Start Development
1. npm install

2. run npm run dev to start server

3. use get: http://localhost:8081/api/user/login  {"username": "tester", "password": "test123"} to get auth token for authentication

4. Add Authorization Token and get products with authenticated user (tester) http://localhost:8081/api/products/list

