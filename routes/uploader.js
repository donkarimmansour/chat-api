const multer = require("multer")
const path = require("path")

// put single File
const singleFile = (dest , name , size , type , extended ) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => cb(null, dest),
            filename: (req, file, cb) => cb(null, file.originalname.substr(0 , file.originalname.lastIndexOf(".")) + "__" + Date.now() + path.extname(file.originalname)) ,
        }),
    }).single(name) 
}


module.exports = {
    singleFile 
}


