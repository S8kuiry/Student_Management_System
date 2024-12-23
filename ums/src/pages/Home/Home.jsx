import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Add this import
import Navbar from '../../components/Navbar';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  let count = 1;
   
  // handle click 
  const handleClick = (id)=>{
    
    window.location.href = `/studentcard/${id}`;
  }

  // edit page
  const editPage = (id)=>{
    window.location.href = `/editstudents/${id}`;
  }

  // Handle Delete 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      alert("Student details deleted");
      
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch details
  const fetchdetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/fetchdetails");
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchdetails();
  }, []);

  return (
    <>
      <div className='home'>
        <div className="h_nav">
          <Navbar />
        </div>
        <div className="h_right">
          <h1>Students Registered</h1>
          <div className="h_content">
            <table className="table" style={{ marginTop: '30px' }}>
              <thead>
                <tr>
                  <th scope="col">Sl.no</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Semester</th>
                  <th scope="col">Dept</th>
                  <th scope="col">Stream</th>
                  <th scope="col">Section</th>
                  <th scope="col">Roll.No</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((itm) => (
                    <tr key={itm._id} style={{ margin: "10px 0px" }}>
                      <th scope="row">{count++}</th>
                      <td id='h_img' style={{ width: "130px" }}>
                        <img src={itm.image} alt="Student" style={{ width: "100%", height: "80%" }} />
                      </td>
                      <td style={{fontWeight:"600",fontSize:"20px"}} onClick={()=>  handleClick(itm._id)}>{itm.student}</td>
                      <td>{itm.semester}</td>
                      <td>{itm.dept}</td>
                      <td>{itm.stream}</td>
                      <td>{itm.section}</td>
                      <td>{itm.roll}</td>
                      <td>
                        <button onClick={() => handleDelete(itm._id)} className="btn btn-danger">Delete</button>
                      </td>
                      <td>
                        <button className="btn btn-info" onClick={()=> editPage(itm._id)}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center' }}>
                      <h2>Details Not Present</h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
