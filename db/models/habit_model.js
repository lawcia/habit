const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const habitSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minlength: 3
    },
    dateChecked: {
        type: []
    },
    frequency: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly"],
        required: true,
    }
}, {
    timestamps: true,
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;