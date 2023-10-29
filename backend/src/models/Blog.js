const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    }
});

// Create Schema
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (v) {
                    return v.length >= 3;
                },
                message: props => `Blog title must be at least 3 characters!`
            }
        ]
    },
    author: AuthorSchema,
    content: {
        type: String,
        required: true,
        validate: [{
            validator: function (v) {
                return v.length >= 50;
            },
            message: props => `Blog content must be at least 50 characters!`
        },
        {
            validator: function (v) {
                return v.length <= 10000;
            },
            message: props => `Blog content must be at most 10000 characters!`
        }
        ]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Blog = mongoose.model('Blog', BlogSchema);