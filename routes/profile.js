const router = require("express").Router();
const multer = require('multer')
const path = require('path')
const db = require("../models");


//upload avatar
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})
const uploadAvatar = multer({
    storage: avatarStorage
})
//upload file
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/files"))
    },
    filename: (req, file, cb) => {
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf-8'));
    }
})
const uploadFile = multer({
    storage: fileStorage
})
// GET route for getting Unsplash API data

router.post("/upload/avatar", uploadAvatar.single('image'), async (req, res) => {
    const image = req.file.filename;
    const imagepath = `http://localhost:3001/images/${image}`;
    const updateRes = await db.User.update({ avatar: imagepath }, { where: { id: req.user } });
    res.json(updateRes);
});
router.post("/upload/bgimage", uploadAvatar.single('image'), async (req, res) => {
    const image = req.file.filename;
    const imagepath = `http://localhost:3001/images/${image}`;
    res.json(imagepath);
});
router.post("/upload/file/:cardId", uploadFile.single('file'), async (req, res) => {
    const fileName = req.file.filename;
    const filePath = `http://localhost:3001/files/${fileName}`;
    const type = path.extname(fileName)
    const createRes = await db.Attachment.create({ name: fileName, path: filePath, type: type, CardId: req.params.cardId });
    res.json(createRes);
});
module.exports = router;