const path = require('path');


module.exports = {

    pdfUpload: async (uploadedFile, pathToUpload) => {
        //this func will move the incoming file to pdfs, csv folder available in public 
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + uploadedFile.name;
        const fullPath = pathToUpload + uniqueFileName;
        await uploadedFile.mv(fullPath);
        return fullPath;
    },

    imageUpload: async (uploadedFile, pathToUpload) => {
        //this func will move the incoming file to images folder available in public

        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + uploadedFile.name;
            const fullPath = pathToUpload + uniqueFileName;

            const fileExtension = path.extname(uploadedFile.name).toLowerCase();
            const supportedExtensions = ['.jpeg', '.jpg', '.webp', 'tiff', '.png', '.gif', '.avif', '.heic'];
            if(!supportedExtensions.includes(fileExtension)){
                throw new Error('Invalid file extension') 
            }
        
            await uploadedFile.mv(fullPath);
            return fullPath;
    },
}