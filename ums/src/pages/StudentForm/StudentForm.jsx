import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./StudentForm.css";
import Navbar from '../../components/Navbar';

const StudentForm = () => {
    const [student, setStudent] = useState("");
    const [semester, setSemester] = useState(0);
    const [section, setSection] = useState("");
    const [roll, setRoll] = useState(0);
    const [image, setImage] = useState(null);
    const [stream,setStream] = useState("");
    const [dept,setDept] = useState("");
    const [currStudents, setCurrStudents] = useState(null);

    // Handle file input change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Fetch student details
    const fetchStudentDetails = async () => {
        try {
            const res = await axios.get('http://localhost:3000/fetchdetails');
            const students = res.data;
            console.log("Fetched students:", students);

            // Find a matching student
            const foundStudent = students.find(user =>
                user.student === student &&
                user.semester === Number(semester) &&
                user.section === section &&
                user.roll === Number(roll)
            );

            setCurrStudents(foundStudent || null);
            console.log("Current student:", currStudents);
        } catch (error) {
            console.error("Error fetching student details:", error.message);
        }
    };

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (student !== "" && semester !== 0 && section !== "" && roll !== 0 && image !== null &&stream != "" && dept != "") {
            const formData = new FormData();
            formData.append('student', student);
            formData.append('semester', semester);
            formData.append('stream',stream);
            formData.append('dept',dept)
            formData.append('section', section);
            formData.append('roll', roll);
            formData.append('image', image);
            

            try {
                await axios.post("http://localhost:3000/uploadstudentdata", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                await fetchStudentDetails(); // Refresh data after submission
                alert("Student data uploaded successfully");
            } catch (error) {
                console.error("Error uploading student data:", error.message);
                alert("Failed to upload student data");
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    // useEffect to fetch student details on dependencies change
    useEffect(() => {
        fetchStudentDetails();
    }, [student, section, semester, roll]); // Dependencies to re-run fetch when input values change

    return (
        <div className="stu_form">
            <div className="stu_form_left">
                <Navbar />
            </div>
            <div className="stu_form_right">
                <h1>Insert Student Data</h1>
                <div className="stu_form_section">
                    <div className="form_section_left">
                        <div className="mb-3">
                            <input
                                type="text"
                                onChange={(e) => setStudent(e.target.value)}
                                className="form-control"
                                placeholder="Enter Student Name"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                onChange={(e) => setSemester(Number(e.target.value))}
                                className="form-control"
                                placeholder="Enter Semester"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                onChange={(e) => setDept(e.target.value)}
                                className="form-control"
                                placeholder="Enter Student Department"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                onChange={(e) => setStream(e.target.value)}
                                className="form-control"
                                placeholder="Enter Student Stream"
                            />
                        </div>
                        
                        <div className="mb-3">
                            <input
                                type="text"
                                onChange={(e) => setSection(e.target.value)}
                                className="form-control"
                                placeholder="Enter Student Section"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                onChange={(e) => setRoll(Number(e.target.value))}
                                className="form-control"
                                placeholder="Enter Student Roll"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </div>
                        <div className="stu_submit">
                            <button onClick={handleSubmit} style={{
                                backgroundColor: "darkred", color: 'whitesmoke',
                            }} id='stu_btn' className='btn'>
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Right section to display fetched student data */}
                    <div className="form_section_right">
                        {currStudents ? (
                            <>
                                <div className="right_img_section">
                                    <div
                                        className="stu_img"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        {currStudents.image ? (
                                            <img
                                                src={currStudents.image}
                                                alt="Student"
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    borderRadius: "50%",
                                                    
                                                }}
                                            />
                                        ) : (
                                            <p>Image not available</p>
                                        )}
                                    </div>
                                </div>
                                <div className="right_info_section">
                                    <h4>{currStudents.student}</h4>
                                    <h6>Semester: {currStudents.semester}</h6>
                                    <h6>Department: {currStudents.dept}</h6>

                                    <h6>Stream: {currStudents.stream}</h6>

                                    <h6>Section: {currStudents.section}</h6>
                                    <h6>Roll: {currStudents.roll}</h6>
                                </div>
                            </>
                        ) : (
                            <p style={{ margin: "30px 0px" }}>No Details Inserted</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
