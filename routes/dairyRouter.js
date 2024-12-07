const router = require('express').Router()
const diarySchema = require('../models/dairySchema')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadpath = path.join(__dirname, ('../public/images'))
        cb(null, uploadpath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploadImg = multer({ storage: storage })

router.post('/createDairy', uploadImg.single('image'), async (req, res) => {
    try {

        const {bio,userid,title}=req.body
        const imgFile=req.file
        

        const newDiary=new diarySchema({
            bio:bio,
            image:imgFile.originalname,
            userid:userid,
            title:title
        })
        await newDiary.save()
        res.status(200).json({message:'diary added'})
        
    } catch (error) {
        res.status(400).json({ message: error })
    }
})



module.exports = router