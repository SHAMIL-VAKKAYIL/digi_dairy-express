const router = require('express').Router()
const userSchema = require("../models/userSchema")



function auth(req, res, next) {
    if (req.session.userID) {
        return next()
    }
    res.redirect('/signin')
}
// signup
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

//signin
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

//userprofile

router.get('/userdetails',auth, async (req, res) => {
    try {
        const { userid } = req.query

        const user = await userSchema.find({ _id: userid })
        res.render('profile', { user })
    } catch (error) {
        res.status(400).json({ message: error })

    }
})
// change user name
router.put('/changeName', async (req, res) => {
    const { newname, userid } = req.body
    try {
        await userSchema.findOneAndUpdate({ _id: userid }, { name: newname })
        res.status(200).json({ message: 'name chaged succefully' })
    } catch (error) {
        res.status(400).json({ message: error })

    }
})
// change user email
router.put('/changeEmail', async (req, res) => {
    const { newemail, userid } = req.body
    try {
        await userSchema.findOneAndUpdate({ _id: userid }, { email: newemail })
        res.status(200).json({ message: 'email chaged succefully' })
    } catch (error) {
        res.status(400).json({ message: error })

    }
})
// change user password
router.put('/changePassword', async (req, res) => {
    const { newpassword, userid } = req.body
    try {
        await userSchema.findOneAndUpdate({ _id: userid }, { password: newpassword })
        res.status(200).json({ message: 'password chaged succefully' })
    } catch (error) {
        res.status(400).json({ message: error })

    }
})

// user logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/signin')
    })
})

module.exports = { authRouter: router, auth }