# Community Movies
This is the frontend repo for the community events project. The live version can be found at https://tr-community-movies.netlify.app

## Requirements
 - Node.js version 20.5.0 
Earlier versions may work but have not been tested.

## Installation
To run this on a local machine, set up the backend api repo found at https://github.com/chrisRduckworth/Community-Movies-Backend. Then
 1. Change the line 13 of `src/utils/api.ts` from `baseURL: "https://community-movies-backend.adaptable.app/api"` to `baseURL: "http://localhost:9090/api"` (or a different URL if not running on the defaults)
 2. Run `npm install` to install dependencies

 ## Hosting locally
 Run `npm run dev` to start the server. To try out the website, visit the URL shown in the terminal (by default, `http://localhost:5173`)