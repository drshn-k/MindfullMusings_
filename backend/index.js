// express 
const express = require('express');
const app = express();
const port = 3000;
const LocalStrategy = require('passport-local').Strategy;

// cookie parser
const cookieParser = require('cookie-parser');

//session
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// argon2
const argon2 = require('argon2');

// passport
const passport = require('passport');
// cors
const cors = require('cors');
// mongoose
const mongoose = require('mongoose');
// dotenv
require('dotenv').config();
// routes
const routes = require('./src/routes');
const User = require('./src/models/User');


// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser("kfdsjkgfdsjfjhfjdsfjdfhgsdjgjfsdhjfgdsfh"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
// connect to database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
const catchErrors = require('./middleware/catchErrors');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try{
        const user = await User.findById(id);
        done(null, user);
    }catch(err){
        done(err);
    }
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) {
        try{
            const user = await User.findOne({ email: email });
            // console.log(user)
            if (!user) { return done(null, false); }
            const passwordValid = await argon2.verify(user.password, password)
            console.log(passwordValid)
            if (!passwordValid) { 
                return done(null, false);
            }
            return done(null, user);
    }catch(err){
        done(err);
    }
}));

app.use(passport.session())
// routes
app.use('/', routes);
app.use(catchErrors);


// listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
