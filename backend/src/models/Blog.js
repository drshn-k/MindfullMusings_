const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

// Create Schema
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: User,
        required : true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// BlogSchema.options.toJSON = {
//     transform: function(doc, ret, options) {
//         delete ret.password;
//         return ret;
//     }
// }

// BlogSchema.path('email').validate(async (value) => {
//     const emailCount = await mongoose.models.Blog.countDocuments({ email: value });
//     return !emailCount;
// }, 'Email already exists');

module.exports = Blog = mongoose.model('Blog', BlogSchema);