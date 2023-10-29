const router = require('express').Router();
const passport = require('passport');
const User = require('./models/User');
const Blog = require('./models/Blog');
const argon2 = require('argon2');
const catchErrors = require('../middleware/catchErrors');

router.post('/login',
    function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.json({ success: false, data: info });            
            req.logIn(user, function (err) {
                if (err) return next(err);
                return res.json({ success: true, data: user });
            })
        })(req, res, next);
    })

router.get('/me',(req, res) => {
    const user = req.user;
    if (!user) return res.json({ success: false });
    res.json({ success: true, data: req.user });
});

router.post('/register', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
});

router.post('/blogs', async (req, res, next)=>{
    try{
        const blog = await Blog.create({...req.body, author: req.user});
        return res.status(201).json({success: true, blog : blog});
    }catch(error){
        next(error);
    }
});

router.get('/blogs', async (req, res, next)=>{
    try{
        const blogs = await Blog.find({});
        return res.json({success: true, data: blogs});
    }catch(error){
        next(error);
    }
});

module.exports = router;