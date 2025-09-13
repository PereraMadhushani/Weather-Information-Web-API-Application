# Weather-Information-Web-API-Application - Node.js + Angular Starter

## Setup

### Backend
1. cd backend
2. copy `.env.example` to `.env` and fill:
   - PORT=5000
   - OPENWEATHER_API_KEY=https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
   - AUTH0_DOMAIN=dev-urjppq8way8fsgek.us.auth0.com
   - AUTH0_AUDIENCE=https://dev-urjppq8way8fsgek.us.auth0.com/api/v2/

3. ensure `cities.json` placed in backend folder
4. npm install
5. npm start

Backend will run on port 5000 by default.

### Frontend
1. cd frontend
2. edit `src/environments/environment.ts` with your Auth0 & backend URL
3. npm install
4. npm start

Open http://localhost:4200
