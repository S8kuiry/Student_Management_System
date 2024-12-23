import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './DisplayStatus.css'
import axios from 'axios'; // Ensure axios is imported

const DisplayStatus = () => {
    const [details, setDetails] = useState([]);  // Use state to store the details
    //edit
    const edit =(id)=>{
        window.location.href = `/studentcard/${id}`

    }
    // delete 
    const deleteId = (id)=>{
        console.log(id)
        
            axios.delete(`http://localhost:3000/deletests/${id}`)
            .then(()=>{
                alert("Deleted succesfully");
                fetchDetails()
                
            }).catch((error)=>{
                console.error(error.message)
            })
        

    }
    // Fetching details
    const fetchDetails = async () => {
        try {
            const res = await axios.post("http://localhost:3000/displaysts");
            if (res.data) {
                setDetails(res.data);  // Set the fetched data into state
                console.log(res.data);  // Log the data to verify
            } else {
                console.log("No data");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchDetails();  // Fetch data on component mount
    }, []);

    return (
        <>
            <div className="h_nav">
                <Navbar />
            </div>
            <div className="display_sts">
                <h1 className="d_h1">Display Status</h1>

                <div className="dis_content">
                    {details.length > 0 ? (  // Check if details array has any data
                        details.map((detail, index) => (  // Assuming `details` is an array
                            <div className="dis_box" key={index}>
                                <div className="dis_info">
                                    <h5>Name: {detail.student}</h5>
                                    <h5>Semester: {detail.semester}</h5>
                                    <h5>Dept: {detail.dept}</h5>
                                </div>
                                <div className="dis_info">
                                    <h5>Course: {detail.course}</h5>
                                    <h5>Section: {detail.section}</h5>
                                    <h5>Roll: {detail.roll}</h5>
                                </div>
                                <div className="dis_info">
                                    <h5>Attendance: {detail.attendance}</h5>
                                    <h5>SGPA: {detail.sgpa}</h5>
                                    <h5>Grade: {detail.grade}</h5>
                                </div>
                                <div className="dis_info">
                                    <h5>Percentage: {detail.percentage}</h5>
                                    <div className="btn" onClick={()=>edit(detail.stu_id)} style={{ backgroundColor: "whitesmoke" }}>Edit</div>
                                    <div className="btn" onClick={()=>deleteId(detail._id)} style={{ backgroundColor: "whitesmoke" }}>Delete</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2>No details</h2>  // Show this if no data is available
                    )}
                </div>
            </div>
        </>
    );
};

export default DisplayStatus;
