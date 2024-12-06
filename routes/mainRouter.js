const router =require('express').Router()


router.get('/',(req,res)=>{
    res.render('main')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})


module.exports=router