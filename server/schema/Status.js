

const mongoose = require("mongoose");
const  statusSchema = mongoose.Schema({
    stu_id : String,
    student:String,
    semester:String,
    dept:String,
    stream : String,
    section:String,
    roll:Number,
    tdays:Number,
    adays:Number,
    sgpa:Number,
    attendance:Number,
    academic:Number,
    grade:String

})
const StatusModel = mongoose.model("stauses",statusSchema);
module.exports  = StatusModel;