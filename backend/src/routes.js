const router = require('express').Router();
const passport = require('passport');
const User = require('./models/User');
const argon2 = require('argon2');
const catchErrors = require('../middleware/catchErrors');

router.post('/login',
    function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) return next(err);
            
            res.json({ success: true, data: req.user });
        })(req, res, next);
        
    })

router.get('/me', passport.authenticate(), (req, res) => {
    res.json({ success: true, data: req.user });
});

router.post('/register', async (req, res, next) => {
    try {
        req.body.password = await argon2.hash(req.body.password);
        const user = await User.create(req.body);

        return res.status(201).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
});

router.post('/blogs', async (req, res, next)=>{
    try{
        await Blog.create(req.body);
        return res.status(201).json({success: true});
    }catch(error){
        next(error);
    }
});

module.exports = router;