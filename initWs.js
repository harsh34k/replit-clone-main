import { Server } from "socket.io";
import { getRootFilesAndFolders, getFileContent, getFolderContents } from "./wsHandler.js";
import { getAllFilesFromReplitNameFolder } from "./backblaze.js";

export default function initWs(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true,
        }
    });

    io.on("connection", async (socket) => {
        console.log(socket.id + " connected");

        const replId = socket.handshake.query.replitName;
        if (!replId) {
            socket.disconnect();
            return;
        }
        await getAllFilesFromReplitNameFolder(replId)


        // Send root-level files and folders when client connects
        const rootFilesAndFolders = getRootFilesAndFolders(`./public/${replId}`);
        console.log("rootfilesnadfolderder", rootFilesAndFolders);
        socket.emit('init-files', rootFilesAndFolders);

        socket.on("get-file-content", async (file) => {
            const { name, type } = file;
            const content = getFileContent(filePath);
            if (content) {
                socket.emit('file-content', { filePath, content });
            } else {
                socket.emit('file-not-found', { filePath });
            }
        });

        socket.on("get-folder-contents", async (folderPath) => {
            console.log("atleast reaching here");
            console.log("folderPath", folderPath);
            const contents = await getFolderContents(folderPath);
            console.log("contents", contents);
            socket.emit('folder-contents', { folderPath, contents });
        });

        socket.on("disconnect", () => {
            console.log(socket.id + " disconnected");
        });
    });
}


// // import { Server, Socket } from "socket.io";
// import { Server as HttpServer } from "http";
// import path from "path";
// import { getAllFilesFromReplitNameFolder } from "./backblaze.js";

// export default function initWs(httpServer) {

//     const io = new Server(httpServer, {
//         cors: {
//             origin: "*",  // change to your domain
//             methods: ["GET", "POST"],
//             transports: ['websocket', 'polling'],
//             credentials: true,
//         }
//     })
//     // console.log(io);
//     // io.on("connection", (socket) => {
//     //     socket.emit("welcome", "Welcome!");
//     //     console.log(new Date(), "connected");
//     // })

//     io.on("connection", async (socket) => {
//         console.log(socket.id + " connected");
//         console.log("hello i think it is connected");
//         const replId = socket.handshake.query.replitName;
//         console.log("replitid", replId);
//         await getAllFilesFromReplitNameFolder(replId)
//         // .then((files) => {
//         //     if (!files || files.length == 0) return;
//         //     let fileData = {};
//         //     for (let f of files) {
//         //         fileData[f.file_name] = f.content;
//         //     }
//         //     socket.emit('init-data', fileData);
//         // });

//         // socket.on("disconnect", () => {
//         //     console.log(socket.id + " disconnected");
//         // });

//         // socket.on("saveFile", ({ filename, content }, callback) => {
//         //     try {
//         //         fs.writeFileSync(filename, content);
//         //         callback({ success: true });
//         //     } catch (err) {
//         //         callback({ success: false, error: err.toString() });
//         //     }
//         // });
//         // socket.on("", () => {
//         //     console.log("user disconnected");
//         // });

//         if (!replId) {
//             socket.disconnect();
//             return;
//         }
//         socket.on("disconnect", () => {
//             console.log("user disconnected");
//         });
//     })
// }

