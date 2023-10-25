const mongoose = require('mongoose');
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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
}

UserSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.User.countDocuments({ email: value });
    return !emailCount;
}, 'Email already exists');

module.exports = User = mongoose.model('User', UserSchema);