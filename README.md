# sh-backend-challenge

## Tech stack
- Node 18
- Typescript
- Express
- Sequelize v6
- PostgreSQL 15
- Docker

## How to run
After cloning the repo, create a `.env` file from the example and then run `docker compose up`. This will start the postgres database and express server. 

## Tests
Run `npm test` to run unit tests for api routes. 

## API Routes
Update and delete endpoints not implemented
- `POST /company` Create a company
- `GET /company` Get list of companies
- `POST /company/:companyId/client-admin` Create client admin for a company

These routes require authorization as client admin by having `clientAdminId` set in request header
- `POST /company/:companyId/employee` Create employee for company
- `GET /company/:companyId/employee` Get employees for company
- `PUT /company/:companyId/employee` Import employees for company

These routes require authorization as employee by having `employeeId` set in request header
- `POST /transfer-request` Request money transfer

## Assumptions
- Client admins can only belong to one company
- Employees have an internal employee id with their company that will never change

## Possible Improvements
- Better authentication and authorization using JWT
- Integration test that calls the database
- API Documentation using swagger
- Better type definitions
