const router = require('express').Router()
const diarySchema = require('../models/dairySchema')
const multer = require('multer')
const path = require('path')
const { auth } = require('./authRouter.js')


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

//diary creation
router.post('/createDairy', auth, uploadImg.single('image'), async (req, res) => {
    try {

        const { bio, userid, title } = req.body
        const imgFile = req.file


        const newDiary = new diarySchema({
            bio: bio,
            image: imgFile.originalname,
            userid: userid,
            title: title
        })
        await newDiary.save()
        res.status(200).json({ message: 'diary added' })

    } catch (error) {
        res.status(400).json({ message: error })
    }
})
//diary showing
router.get('/viewDiary', auth, async (req, res) => {

    const { userid } = req.query
    console.log(userid);

    try {
        const diary = await diarySchema.find({ userid: userid })
        const diaries = diary.reverse()

        res.render('viewDiary', { diaries })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//diary filtring
router.get('/DiarybyDate', async (req, res) => {

    const { date } = req.query

    try {
        const diaries = await diarySchema.find({ upDate: date })

        res.render('viewDiary', { diaries })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//fetch single diary
router.get('/Diary', auth, async (req, res) => {

    const { id } = req.query

    try {
        const diary = await diarySchema.find({ _id: id })

        res.render('singleDiary', { diary })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// diary  editing
router.put('/updateDiary', uploadImg.single('image'), async (req, res) => {
    try {
        const { id, title, bio } = req.body
        const imgFile = req.file
        await diarySchema.findOneAndUpdate({ _id: id }, { image: imgFile.originalname, bio: bio, title: title })

        res.status(200).json({ message: 'diary  updated' })

    } catch (error) {
        res.status(400).json({ message: error })
    }
})

//delete diary
router.delete('/deleteDairy', async (req, res) => {
    const { id } = req.body
    try {
        await diarySchema.findOneAndDelete({ _id: id })
        res.status(200).json({ message: 'deleted' })

    } catch (error) {
        res.status(400).json({ message: error })

    }
})

module.exports = router