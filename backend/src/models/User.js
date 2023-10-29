const mongoose = require('mongoose');
const argon2 = require('argon2');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        {
            validator: function (v) {
                return mongoose.models.User.findOne({ email: v }).then(user => !user)
            },
            message: props => `${props.value} already exists!`
        }
    ]
    },
    password: {
        type: String,
        required: true,
        validate: [{
            validator: function (v) {
                return v.length >= 6;
            },
            message: props => `Password must be at least 6 characters!`
        },
        {
            validator: function (v) {
                return v.match(/\d+/g);
            },
            message: props => `Password must contain a number!`
        },
        {
            validator: function (v) {
                return v.match(/[a-zA-Z]+/g);
            },
            message: props => `Password must contain a letter!`
        },
        {
            validator: function (v) {
                return v.match(/[^a-zA-Z\d]/g);
            },
            message: props => `Password must contain a special character!`
        }]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
};

UserSchema.path('password').validate((value) => {
    return value.length >= 6;
}, 'Password must be at least 6 characters');

UserSchema.path('password').validate((value) => {
    return value.match(/\d+/g);
}, 'Password must contain a number');

UserSchema.path('password').validate((value) => {
    return value.match(/[a-zA-Z]+/g);
}, 'Password must contain a letter');

UserSchema.path('password').validate((value) => {
    return value.match(/[^a-zA-Z\d]/g);
}, 'Password must contain a special character');

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = User = mongoose.model('User', UserSchema);