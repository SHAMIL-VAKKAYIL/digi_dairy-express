const router = require('express').Router()
const userSchema = require("../models/userSchema")



function auth(req, res, next) {
    if (req.session.userID) {
        return next()
    }
    res.redirect('/signin')
}

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const newUser = new userSchema({
            name, email, password
        })
        await newUser.save()
        res.status(200).json({ message: 'succefull' })

    } catch (error) {
        res.status(400).json({ message: 'faild to signup' })
    }

})
router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        console.log(email);
        const user = await userSchema.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: ' email is wrong' })

        }
        if (user.password === password) {
            req.session.userID = user._id
            req.session.email = user.email
            let userid = user._id

            res.status(200).json({ userid })
            
        } else {
            return res.status(400).json({ message: ' password is wrong' })
        }


    } catch (error) {
        res.status(400).json({ message: 'faild to signin' })
    }

})

router.get('/userdetails', async (req, res) => {
    try {
        const { userid } = req.query
        console.log(userid);
        
        const user = await userSchema.find({ _id:userid })
        console.log(user,'jhfgj')
        res.render('profile', { user })
    } catch (error) {
        res.status(400).json({ message: error })

    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/signin')
    })
})

module.exports = { authRouter: router, auth }