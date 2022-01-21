# Techwondoe

A microservice app that provides apis to perform some basic company related operations.

### Local Setup

0. Make sure that you have Node in your system. If not please install the Node first.
1. Install all the required dependencies
   - Run `npm install` to install all the dependencies mentioned in the project(package.json)
2. Create a .env file in the root folder. And Add the following variables in the .env:
   a. PORT= PORT to run the application
   b. API_SECRET= SECRET Key to sign and validate JWT tokens
   c. MONGODB_URL = For connecting to db. Ref point 3
   - Also check for the .env.sample for your reference
3. For Database Connection (Postgres),
   1. If you want to connect with the local Postgres,
      - Install Postgres in your system.
4. Run the server in the Development mode using the below command
   `npm run dev`
5. Run the server in the Production mode using the below command
   `npm start`

### Hitting APIs

- First hit the token API to get the token
- And then using those token either in the authorization header or in the cookie will give the access to hit the apis.
- Endpoints Available 0. {{HOST}}/api/v1/token **GET**
  1. {{HOST}}/api/v1/company **POST**
  2. {{HOST}}/api/v1/company/COMPANYNAME **GET**
  3. {{HOST}}/api/v1/company/search?companyId=NAME **GET**
  4. {{HOST}}/api/v1/team/COMPANYUUID **POST**
  5. {{HOST}}/api/v1/allteams **GET**
