import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import path from "path";

export default function initWs(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "*",  // change to your domain
            methods: ["GET", "POST"]
        }
    })
    // console.log(io);
    io.on("connection", (socket) => {
        socket.emit("welcome", "Welcome!");
        console.log(new Date(), "connected");
    })

    io.on("connection", async (socket) => {
        console.log(socket.id + " connected");
        console.log("hello i think it is connected");
        const replId = socket.handshake.query.replitName;
        // socket.on("", () => {
        //     console.log("user disconnected");
        // });

        if (!replId) {
            socket.disconnect();
            return;
        }
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    })
}