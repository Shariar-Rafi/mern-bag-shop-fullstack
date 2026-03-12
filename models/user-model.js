const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    profilePic: {
        type: Buffer,
        default: null,
    },
    contact: String,
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    order:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
})

module.exports = mongoose.model("user", userSchema)