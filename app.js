import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { copyBaseFilesFromBlackBlaze } from "./backblaze.js";
import cors from 'cors';


// const app = express();
export default function initHttp(app) {
    app.use(cors());
    app.use(express.json({ limit: "16kb" }))
    app.use(express.urlencoded({ extended: true, limit: "16kb" }))
    app.use(express.static("public"))
    app.use(cookieParser())
    dotenv.config({
        path: "./.env"
    })

    console.log("in app.js");
    app.post('/', async (req, res) => {
        try {
            console.log("tryyy");
            const { languageValue, replitName } = req.body;
            if (!languageValue || !replitName) {
                throw new Error(400, "Missing required fields")
            }
            console.log("hello broo");

            // Wait for the promise returned by retrieveFilesFromCloudinary to resolve
            await copyBaseFilesFromBlackBlaze(languageValue, replitName);

            // Process the retrieved files
            // console.log("hello:", resources);

            // Send the response with the retrieved files
            res.status(200).json(new Response(200, null, "Successfully retrieved files"));
        } catch (error) {
            console.log(error);
            res.status(500).json(new Response(500, null, "An error occurred"));
        }
    });
}



// app.listen(8000, () => { console.log("server is running at 8000"); })