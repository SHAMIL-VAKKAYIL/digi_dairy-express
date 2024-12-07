const router = require('express').Router()
const { auth } = require('./authRouter')


router.get('/home', auth, (req, res) => {
    res.render('home')
})
router.get('/createDairy', auth, (req, res) => {
    res.render('createDairy')
})


module.exports = router
