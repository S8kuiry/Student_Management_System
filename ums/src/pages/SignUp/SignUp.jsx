import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';

const SignUp = () => {
  const [mode, setMode] = useState("signup");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  
  const changeMode = () => {
    setMode(mode === "signup" ? "login" : "signup");
  };

  const signup = async (e) => {

    e.preventDefault();
    try {
      if (user != "" && email != "" && pass != "") {
        const res = await axios.get("http://localhost:3000/verify");
        const users = Array.isArray(res.data) ? res.data : [];
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
          alert("This email is already in use");



        } else {
          await axios.post("http://localhost:3000/submit", { user, email, pass });
          alert("Details Submitted");
          console.log("Details Submitted");
          window.location.href = '/signup';

        }

      }else{
        alert("Please fill the required fields ")
      }



    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/verify"); // Ensure this endpoint returns the array of users
      const users = Array.isArray(res.data) ? res.data : []; // Fetch users as array
      console.log("Fetched users:", users); // Debug log

      // Directly find a user by matching email and pass without extra indexing
      const existingUser = users.find(user => 
        user.email === email && 
        user.password === pass
      );
      console.log(existingUser._id);
      

      if (!existingUser) {
        alert("User does not exist or password is incorrect.");
      } else {
        console.log("Successfully Logged In");
        window.location.href=`/home/${existingUser._id}`
        
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
};



  return (
    <div className='signup'>
      <div className="signup_form">
        <div className="sign_up">
          <h1 style={{ color: 'whitesmoke' }}>{mode === "signup" ? 'SignUp Page' : 'Login Page'}</h1>
        </div>
        <div className="sign_down">
          {mode === "signup" && (
            <div className="mb-3">
              <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                className="form-control"
                placeholder="Enter username.."
                required
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email.."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              className="form-control"
              placeholder="Enter Password.."
              required
            />
          </div>
          <div id='sign_btn'>
            <input
              type="submit"
              onClick={mode === "signup" ? signup : login}
              className="btn"
              id="submit_btn"
              value="Submit"
            />
            <input
              type="submit"
              onClick={changeMode}
              className="btn"
              id="submit_btn"
              value={mode === "signup" ? "LogIn" : "SignUp"}
            />
          </div>
          <div className="lg_admin">
            <p>Log in as Admin? LogIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
