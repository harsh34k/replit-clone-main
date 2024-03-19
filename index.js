import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
dotenv.config({
    path: "./.env"
})

import initHttp from './app.js'
import http from 'http'; // Import http module for creating server
import initWs from './initWs.js';

// Create a server instance using http module and pass the express app to it
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
const server = http.createServer(app);
initHttp(app)
initWs(server);
// Start the server
const port = process.env.PORT || 8000; // Use the port provided by the environment or default to 8000
try {
    server.listen(port, () => { // Use server.listen() instead of app.listen()
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    console.log("error has occured", error);
}
