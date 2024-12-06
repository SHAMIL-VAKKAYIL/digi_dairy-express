const router = require('express').Router()
const { auth } = require('./authRouter')


router.get('/home', auth, (req, res) => {
    res.render('home')
})


module.exports = router
