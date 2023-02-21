import express from "express";
import multer from "multer";
import path from 'path'

const router = express.Router();

function slugify(str){
    console.log("slugify function")
    return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const storage = multer.diskStorage({
    destination(req, res, cb){
        console.log(`${__dirname}/../../uploads/`, "TEST")

        cb(null, `${__dirname}/../../uploads/`)
    },
    filename(req, file, cb){
        cb(null, `${slugify(file.originalname)}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null, true)
    }else{
        cb("Images only !")
    }
}

const upload = multer({
    storage,
    fileFilter : function(req, file, cb){
        checkFileType(file, cb)
    }
})

router.post('/', upload.single("image"), (req, res) => {
    console.log("je suis dans lupload image")
    res.send(`${req.file.path}`)
})

export default router;