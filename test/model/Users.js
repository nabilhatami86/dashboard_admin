const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    us_id: {
        type: String,
        required: true,
        unique: true
    },
    us_name: {
        type: String,
        required: true
    },
    us_password: {
        type: String,
        required: true

    },
    us_email: {
        type: String,
        required: true,
        unique: true
    },
    us_phone_number: {
        type: String
    },
    us_address: {
        type: String
    },
    us_created_at: {
        type: Date,
        default: Date.now
    },
    us_updated_at: {
        type: Date, default:
            Date.now
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('us_password')) return next();
    this.us_password = await bcrypt.hash(this.us_password, 10);
    next();
});


module.exports = mongoose.model('User', userSchema);
