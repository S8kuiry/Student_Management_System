const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UserModel = require("./schema/User");
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const StudentModel = require('./schema/Student');
const StatusModel = require('./schema/Status');
const { error } = require('console');

const PORT = 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',  // Allow this origin only, or '*' to allow any
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ums');
const db = mongoose.connection;
db.on('error', (error) => {
    console.log("Database Connection failed");
    console.log(error.message);
});
db.once('open', () => {
    console.log("Database connection established successfully");
});

// Signup details verify and submit
app.get('/verify', (req, res) => {
    UserModel.find()
        .then((response) => {
            res.json(response);
            console.log("Details Fetched");
        }).catch((error) => {
            console.log(error.code);
        });
});

app.post("/submit", (req, res) => {
    const { user, email, pass } = req.body;
    UserModel.create({
        user: user,
        email: email,
        password: pass,
    }).then((response) => {
        res.json(response);
        console.log("Details Submitted");
    }).catch((error) => {
        console.log(error.code);
    });
});

// Login
app.get('/login', (req, res) => {
    UserModel.find()
        .then((response) => {
            res.json(response);
            console.log("Details Fetched");
        }).catch((error) => {
            console.log(error.code);
        });
});

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Upload student data
app.post('/uploadstudentdata', upload.single('image'), (req, res) => {
    const { student, semester, stream, dept, section, roll } = req.body;
    const image = req.file.path;
    console.log(req.file);
    console.log(`http://localhost:3000/uploads/${image}`);
    StudentModel.create({
        student,
        semester,
        stream,
        dept,
        section,
        roll,
        image: `http://localhost:3000/${image}`,
    }).then((result) => {
        res.json(result);
        console.log("Student details uploaded successfully");
    }).catch((error) => {
        console.error(error.message);
    });
});

// Delete student details
app.delete(`/delete/:id`, (req, res) => {
    const { id } = req.params;
    StudentModel.findByIdAndDelete(id)
        .then((result) => {
            res.json(result);
            console.log("Student details deleted successfully");
        }).catch((error) => {
            console.log(error.message);
        });
});

// Fetch student detail for editing
app.get(`/fetchdetails/:id`, (req, res) => {
    const { id } = req.params;
    StudentModel.findById(id)
        .then((result) => {
            res.json(result);
            console.log("Edit student data successfully fetched");
        }).catch((error) => {
            console.log(error.message);
        });
});

// Update student details
app.post('/submitdetails/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { student, semester, stream, dept, section, roll } = req.body;
    const image = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : req.body.image;
  
    StudentModel.findByIdAndUpdate(id, {
        student,
        semester,
        stream,
        dept,
        section,
        roll,
        image
    }, { new: true })
    .then((result) => {
        res.json(result);
        console.log("Updated successfully");
    }).catch((error) => {
        console.error(error.message);
    });
});
  

// Fetching all student details
app.get('/fetchdetails', (req, res) => {
    StudentModel.find()
        .then((result) => {
            res.json(result);
            console.log("Student details fetched successfully");
        }).catch((error) => {
            console.error(error.message);
        });
});

// Fetching details for student card
app.get("/fetchcard/:id", (req, res) => {
    const { id } = req.params;
    StudentModel.findById(id)
        .then((result) => {
            res.json(result);
            console.log(result);
            console.log("Card details fetched successfully");
        }).catch((error) => {
            console.error(error.message);
        });
});
// fetching status details------------------status details
app.get("/statusdetails/:id",(req,res)=>{
    const {id} = req.params;
    StatusModel.findOne({stu_id:id})
    .then((result)=>{
        console.log("status details fetched ")
        console.log(result)
        res.json(result);
        

    }).catch((error)=>{
        console.error(error.message)
    })
})
//============================ updating status  data
app.post('/updatestatus/:id',upload.none(),(req,res)=>{
    const { stu_id, student, semester, dept, stream, section, roll, tdays, adays, sgpa, attendance, academic, grade } = req.body;
    console.log(stu_id, student, semester, dept, stream, section, roll, tdays, adays, sgpa, attendance, academic, grade);

    
    StatusModel.findOneAndUpdate(
        {stu_id:stu_id},

        {
        
        student,
        semester,
        dept,
        stream,
        section,
        roll,
        tdays,
        adays,
        sgpa,
        attendance,
        academic,
        grade

    },{new:true}).then((result) => {
        res.json(result);
        console.log("Status data uploaded successfully");
    }).catch((error) => {
        console.error("Error uploading status:", error);
        res.status(500).json({ error: "Error uploading status data" });
    });
})

// Submitting data for student status



app.post('/status', upload.none(), (req, res) => {
    // Destructure fields from req.body
    const { stu_id, student, semester, dept, stream, section, roll, tdays, adays, sgpa, attendance, academic, grade } = req.body;
    
    // Log the received data
    console.log(stu_id, student, semester, dept, stream, section, roll, tdays, adays, sgpa, attendance, academic, grade);

    // Check if all necessary fields are received
    if (!stu_id || !student || !semester || !dept) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Save to the database (assuming you have a StatusModel defined)
    StatusModel.create({
        stu_id,
        student,
        semester,
        dept,
        stream,
        section,
        roll,
        tdays,
        adays,
        sgpa,
        attendance,
        academic,
        grade
    }).then((result) => {
        res.json(result);
        console.log("Status data uploaded successfully");
    }).catch((error) => {
        console.error("Error uploading status:", error);
        res.status(500).json({ error: "Error uploading status data" });
    });
});
//  displaying data in display status page
app.post("/displaysts",(req,res)=>{
    StatusModel.find()
    .then((result)=>{
        res.json(result);
        console.log("data fetched succesfully ")
    }).catch((error)=>{
        console.error(error.message)
    })
})
// delete from display page
app.delete(`/deletests/:id`,(req,res)=>{
    const {id} = req.params;
    StatusModel.findByIdAndDelete(id)
    .then((result)=>{
        res.json(result);
        console.log("Succesfully deleted ");

    }).catch((error)=>{
        console.error(error.message)
    })
})

// Start the server
app.listen(PORT, () => {
    try {
        console.log(`Successfully connected to port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
