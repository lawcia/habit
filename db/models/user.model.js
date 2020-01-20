const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    habits: {
        type: [Schema.ObjectId],
        ref: 'Habit'
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;