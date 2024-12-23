
const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    student:String,
    semester:Number,
    stream:String ,
    dept:String,
    section:String,
    roll:Number,
    image:String
})
const StudentModel = mongoose.model('students',studentSchema);
module.exports = StudentModel;