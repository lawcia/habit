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
        trim: true,
        minlength: 3
    },
    dateChecked: {
        type: [Date]
    },
    streak: {
        type: Number,
        default: 0
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