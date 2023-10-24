const mongoose = require("mongoose");
const validator = require("validator");

const studentsTbl = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [
            true,
            "Already present"
        ],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    address: {
        type: String,
        required: true,
    },
});

const Student = new mongoose.model('Student', studentsTbl);

module.exports = Student;