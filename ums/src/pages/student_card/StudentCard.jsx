import React, { useEffect, useState } from 'react';
import './StudentCard.css';
import Navbar from '../../components/Navbar';
import axios from 'axios'; // Ensure axios is imported for fetching data
import { FaFantasyFlightGames } from 'react-icons/fa';

const StudentCard = () => {
    const [details, setDetails] = useState([]);
    const [tdays, setTdays] = useState(0);
    const [adays, setAdays] = useState(0);
    const [sgpa, setSgpa] = useState(0.0);
    const [status, setStatus] = useState([]);
    let state = false;

    // Added state for attendance, grade, and percentage
    const [attendancePercentage, setAttendancePercentage] = useState('');
    const [grade, setGrade] = useState('');
    const [academicPercentage, setAcademicPercentage] = useState('');
    

    // fetching status details
    const statusDetails = async () => {
        if(tdays != 0 && adays != 0 && sgpa != 0){
            const stu_id = window.location.href.split('/').pop();

        
            const formData = new FormData();
            formData.append('stu_id', stu_id);
            formData.append('student', details.student);
            formData.append('semester', details.semester);
            formData.append('dept', details.dept);
            formData.append('stream', details.stream);
            formData.append('section', details.section);
            formData.append('roll', details.roll);
            formData.append('tdays', tdays);
            formData.append('adays', adays);
            formData.append('sgpa', sgpa);
            formData.append("attendance", attendancePercentage)
            formData.append('academic', academicPercentage);
            formData.append("grade", grade)
        
        const id = getUrl();
        try {
            const res = await axios.get(`http://localhost:3000/statusdetails/${id}`);
            setStatus(res.data);
            if(res.data){
                const id = getUrl();
                await axios.post(`http://localhost:3000/updatestatus/${id}`,formData,{
                    headers : { 'Content-Type' : 'multipart/form-data'}
                }).then(() => {
                    alert("Status details updated");
                    window.location.href = `/home/${window.location.href.split('/').pop()}`;
                }).catch((error) => {
                    console.error(error.message);
                });
                console.log("Already present")
                console.log(res.data)
                
            }else{
                
                
                console.log("new data")
                try {
                    await axios.post("http://localhost:3000/status", formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(() => {
                        alert("Status details submitted");
                        window.location.href = `/home/${window.location.href.split('/').pop()}`;
                    }).catch((error) => {
                        console.error(error.message);
                    });
                } catch (error) {
                    console.error(error.message)
                }
            }
        } catch (error) {
            console.error(error.message);
        }

        }else{
            alert("Please fill the requied fields")
        }
        
    }

    //handling submit function
    
    // calculate percentage
    const onCalculate = () => {
        // Validate the input values

        // Calculate attendance percentage
        const attendance = (adays / tdays) * 100;
        setAttendancePercentage(attendance.toFixed(2));

        // Calculate academic percentage based on SGPA
        let calgrade = (sgpa - 0.5) * 10;
        setAcademicPercentage(calgrade.toFixed(2));

        // Determine grade based on the calculated grade
        if (sgpa >= 9.0 && sgpa <= 10.0) {
            setGrade("A+");
        } else if (sgpa >= 8.0 && sgpa < 9.0) {
            setGrade('A');
        } else if (sgpa >= 7.0 && sgpa < 8.0) {
            setGrade('B+');
        } else if (sgpa >= 6.0 && sgpa < 7.0) {
            setGrade('B');
        } else if (sgpa >= 5.0 && sgpa < 6.0) {
            setGrade('C+');
        } else if (sgpa >= 4.0 && sgpa < 5.0) {
            setGrade('C');
        } else if (sgpa >= 3.0 && sgpa < 4.0) {
            setGrade('D');
        } else if (sgpa >= 0.0 && sgpa < 3.0) {
            setGrade('F');
        }

        console.log('Attendance:', attendance);
        console.log('Academic Grade:', calgrade);
        console.log('Calculated Grade:', grade);
    };

    // Get URL parameter to fetch student data
    const getUrl = () => {
        return window.location.href.split('/').pop();
    };

    // Fetch student details from the backend API
    const fetchdetails = async () => {
        const id = getUrl();
        try {
            const res = await axios.get(`http://localhost:3000/fetchcard/${id}`);
            if (res.data) {
                setDetails(res.data);
                
               
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // Fetch student data when the component mounts
    useEffect(() => {
        
        fetchdetails();
        
    }, []);

    return (
        <>
            <div className="h_nav">
                <Navbar />
            </div>

            <div className="stu_card">
                <div className="s_card">
                    <div className="s_card_left">
                        {details ? (
                            <>
                                <div className="s_card_img">
                                    <img src={details.image} height={"140px"} width={"140px"} style={{ borderRadius: "50%" }} />
                                </div>
                                <h5>Name <strong>:</strong> {details.student}</h5>
                                <h5>Semester <strong>:</strong> {details.semester}</h5>
                                <h5>Dept <strong>:</strong> {details.dept}</h5>
                                <h5>Stream <strong>:</strong> {details.stream}</h5>
                                <h5>Section <strong>:</strong> {details.section}</h5>
                                <h5>Roll <strong>:</strong> {details.roll}</h5>
                            </>
                        ) : (
                            <h2 style={{ textAlign: "center" }}>No Such Details Present</h2>
                        )}
                    </div>
                    <div className="s_card_right">
                        <div className="cal_1">
                            <div className="input_container">
                                <label style={{ color: "whitesmoke", fontWeight: "400", margin: "4px" }} htmlFor="t_classes">
                                    Total Classes
                                </label>
                                <input onChange={(e) => setTdays(e.target.value)} type="number" id="t_classes" />
                            </div>

                            <div className="input_container">
                                <label style={{ color: "whitesmoke", fontWeight: "400", margin: "4px" }} htmlFor="t_classes">
                                    Attended Classes
                                </label>
                                <input onChange={(e) => setAdays(e.target.value)} type="number" id="t_classes" />
                            </div>
                            <div className="input_container">
                                <label style={{ color: "whitesmoke", fontWeight: "400", margin: "4px" }} htmlFor="t_classes">
                                    Enter SGPA
                                </label>
                                <input onChange={(e) => setSgpa(e.target.value)} type="number" id="t_classes" />
                            </div>
                        </div>

                        <div className="cal_1">
                            <div className="input_container">
                                <label style={{ color: "whitesmoke", fontWeight: "400", margin: "4px" }} htmlFor="attendance">
                                    Attendance
                                </label>
                                <div>{attendancePercentage}</div> {/* Render attendance percentage here */}
                            </div>

                            <div className="input_container">
                                <label style={{ color: "whitesmoke", fontWeight: "400", margin: "4px" }} htmlFor="grade">
                                    Grade
                                </label>
                                <div>{grade}</div> {/* Render grade here */}
                            </div>

                            <div className="input_container">
                                <label style={{ color: "whitesmoke", fontWeight: "400", margin: "4px" }} htmlFor="percentage">
                                    Academic Percentage
                                </label>
                                <div>{academicPercentage}</div> {/* Render academic percentage here */}
                            </div>
                        </div>
                        <div className="cal_1">
                            <div className="input_container" style={{ justifyContent: "flex-end" }}>
                                <button id="sub_btn" onClick={onCalculate}>Calculate</button>
                            </div>
                            <div className="input_container" style={{ justifyContent: "flex-end" }}>
                                <button id="sub_btn" onClick={statusDetails}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentCard;
