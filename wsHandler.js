import fs from 'fs';
import path from 'path';

// Function to retrieve root-level files and folders
function getRootFilesAndFolders(directoryPath) {
    return getFilesAndFolders(directoryPath); // Call getFilesAndFolders with directoryPath
}

// Function to retrieve files and folders from the specified directory
function getFilesAndFolders(directoryPath) {
    try {
        // Read the contents of the directory synchronously
        const filesAndFolders = fs.readdirSync(directoryPath);
        console.log("filesAndFolders", filesAndFolders);

        // Iterate through each item in the directory
        const result = filesAndFolders.map((item) => {
            const fullPath = path.join(directoryPath, item);
            const stats = fs.statSync(fullPath);

            // Determine if it's a file or a folder
            const type = stats.isDirectory() ? 'folder' : 'file';

            // Return an object representing the file or folder
            return {
                name: item,
                type: type
            };
        });
        console.log("result", result);

        return result; // Return the array of files and folders
    } catch (error) {
        console.error('Error retrieving files and folders:', error);
        return []; // Return an empty array in case of error
    }
}

// Function to read and return the content of the specified file
function getFileContent(filePath) {
    try {
        // Read the content of the file synchronously
        const content = fs.readFileSync(filePath, 'utf-8');
        return content; // Return the content as a string
    } catch (error) {
        console.error('Error reading file content:', error);
        return null; // Return null in case of error
    }
}

// Function to retrieve and return the contents of the specified folder
function getFolderContents(folderPath) {
    try {
        // Get the list of files and folders in the specified folder
        const contents = fs.readdirSync(folderPath);

        // Iterate through each item in the folder
        const result = contents.map((item) => {
            const fullPath = path.join(folderPath, item);
            const stats = fs.statSync(fullPath);

            // Determine if it's a file or a folder
            const type = stats.isDirectory() ? 'folder' : 'file';

            // If it's a folder, recursively get its contents
            if (type === 'folder') {
                return {
                    name: item,
                    type: 'folder',
                    children: getFolderContents(fullPath) // Recursively get contents
                };
            } else {
                return {
                    name: item,
                    type: 'file'
                };
            }
        });

        return result; // Return the array of files and folders
    } catch (error) {
        console.error('Error retrieving folder contents:', error);
        return []; // Return an empty array in case of error
    }
}
export {
    getRootFilesAndFolders,
    getFilesAndFolders,
    getFileContent,
    getFolderContents
}