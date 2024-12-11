const router = require('express').Router()
const { auth } = require('./authRouter')


router.get('/',  (req, res) => {
    res.render('home')
})
 router.get('/signup',(req,res)=>{
     res.render('signup')
 })
 router.get('/signin',(req,res)=>{
     res.render('signin')
 })
router.get('/createDairy', auth, (req, res) => {
    res.render('createDairy')
})


module.exports = router
