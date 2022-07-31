const fileControlles = require("../controller/file")
const { singleFile } = require("./uploader")
const router = require("express").Router()


// get Single Image View
router.get("/get-single-file/:id/view" , idValidator , fileControlles.getSingleImageView)
 
// get Single Image Download
router.get("/get-single-file/:id/download" , idValidator , fileControlles.getSingleImageDownload)
      
// create Single Image
router.post("/create-single-file",  singleFile("./public/images" , "image" , ((1024 * 1024) * 2) , { name : "image/png" ,  error : "Please choose a png image only" } , ".png" ) 
, fileControlles.createSingleImage )



//params Validator
function idValidator(req, res, next) {
    const { id } = req.params

    if (id == "" || id == null) {
        res.status(codes.badRequest).json({err: true, msg: "id not exist"})
        return
    }

    next()
}


module.exports = router
