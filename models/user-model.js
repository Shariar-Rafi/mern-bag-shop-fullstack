const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/scatch")

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    profilePic: String,
    contact: Number,
    cart:{
        type: Array,
        default: []
    },
    isAdmin : Boolean,
    orders:{
        type: Array,
        default: []
    },
})

module.exports = mongoose.model("user", userSchema)