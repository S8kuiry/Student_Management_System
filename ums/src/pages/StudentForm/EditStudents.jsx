import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import './StudentForm.css';

const EditStudents = () => {
  const [student, setStudent] = useState('');
  const [semester, setSemester] = useState(0);
  const [section, setSection] = useState('');
  const [roll, setRoll] = useState(0);
  const [image, setImage] = useState(null);
  const [stream, setStream] = useState('');
  const [dept, setDept] = useState('');
  const [details, setDetails] = useState(null);

  //---------------------------- Fetch Student Details -----------------------
  const getUrl = () => {
    return window.location.href.split('/').pop();
  };

  const fetchDetails = async () => {
    const id = getUrl();
    try {
      let res = await axios.get(`http://localhost:3000/fetchdetails/${id}`);
      if (res.data) {
        setDetails(res.data);
        setStudent(res.data.student);
        setSemester(res.data.semester);
        setSection(res.data.section);
        setRoll(res.data.roll);
        setStream(res.data.stream);
        setDept(res.data.dept);
        console.log("Edit details successfully fetched");
      } else {
        alert("Edit data not properly fetched");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSubmit = async (e) => {
    const id = getUrl();
    e.preventDefault();

    if (student === '' || semester === 0 || dept === '' || stream === '' || section === '' || roll === '') {
      alert("Fill all the required fields");
      return;
    }

    const formData = new FormData();
    formData.append('student', student);
    formData.append('semester', semester);
    formData.append('stream', stream);
    formData.append('dept', dept);
    formData.append('section', section);
    formData.append('roll', roll);

    // Only append image if a new image is selected
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', details.image); // Use existing image if none selected
    }

    try {
      await axios.post(`http://localhost:3000/submitdetails/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchDetails(); // Re-fetch the updated details
      console.log("Data updated successfully");
      alert("Student details updated successfully");
    } catch (error) {
      alert("Failed to update details");
      console.log(error.message);
    }
  };

  return (
    <div className="stu_form">
      <div className="stu_form_left">
        <Navbar />
      </div>
      <div className="stu_form_right">
        <h1>Edit Student Data</h1>
        <div className="stu_form_section">
          <div className="form_section_left">
            {details ? (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) => setStudent(e.target.value)}
                    className="form-control"
                    value={student}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="form-control"
                    value={semester}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) => setDept(e.target.value)}
                    className="form-control"
                    value={dept}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) => setStream(e.target.value)}
                    className="form-control"
                    value={stream}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    onChange={(e) => setSection(e.target.value)}
                    className="form-control"
                    value={section}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    onChange={(e) => setRoll(Number(e.target.value))}
                    className="form-control"
                    value={roll}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="form-control"
                  />
                </div>
                <div className="stu_submit" onClick={handleSubmit}>
                  <button style={{ backgroundColor: "darkred", color: 'whitesmoke' }} id="stu_btn" className="btn">
                    Update
                  </button>
                </div>
              </>
            ) : (
              <h2 style={{ textAlign: "center", color: "black" }}>No Details Fetched</h2>
            )}
          </div>

          <div className="form_section_right">
            {details ? (
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
                    {details.image ? (
                      <img
                        src={details.image}
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
                <div className="right_info_section" style={{ paddingLeft: "50px" }}>
                  <h4>Name : {details.student}</h4>
                  <h6>Semester : {details.semester}</h6>
                  <h6>Department : {details.dept}</h6>
                  <h6>Stream : {details.stream}</h6>
                  <h6>Section : {details.section}</h6>
                  <h6>Roll : {details.roll}</h6>
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

export default EditStudents;
