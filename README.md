# Weather Information Web API Application
**Tech Stack:** Node.js (Backend) + Angular (Frontend)

## Table of Contents
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Test User](#test-user)
- [Notes](#notes)

---

## Setup

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
2.Copy the example environment file and configure it:
   cp .env.example .env

   Update the following variables in .env:

   PORT=5000
   OPENWEATHER_API_KEY=<Your OpenWeather API Key>
   AUTH0_DOMAIN=dev-urjppq8way8fsgek.us.auth0.com
   AUTH0_AUDIENCE=https://dev-urjppq8way8fsgek.us.auth0.com/api/v2/

3.Make sure cities.json is placed in the backend folder.
4.Install dependencies:
5.Start the backend server:
   node server.js

### Frontend

1.Navigate to the frontend folder:
   cd frontend
2.Update environment configuration in src/environments/environment.ts with your Auth0 credentials and backend URL.
3.Install dependencies:
   npm install
4.Start the frontend application:
   ng serve
## The app will be accessible at http://localhost:4200.

###Test User

You can log in using the following test credentials:

Email: careers@fidenz.com 
Password: Pass#fidenz

### Notes

   Ensure both backend and frontend are running simultaneously.
   Use valid API keys and Auth0 credentials to avoid authentication issues.
   Make sure cities.json is correctly placed in the backend folder.


I can also **add badges for Node.js, Angular, and API status** to make it look professional on GitHub if you want.  

Do you want me to do that?
