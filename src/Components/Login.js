
import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from './utils/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // const baseUrl = "https://your-api-url.com/"; // Define your base URL here

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    try {
      const response = await axios.post(`${baseUrl}api/login/`, {
        email,
        password,
      });
console.log(response)
      const token = response.data.token;

      localStorage.setItem('token', token);
      // If successful, set the success status and message
      setStatus('success');
      console.log("token", token);
      setStatusMessage('Login Successfully');
      
      // Optionally, clear the input fields after success
      setEmail('');
      setPassword('');

    } catch (error) {
      // If there is an error, set the error status and message
      setStatus('error');
      setStatusMessage('Could Not Login. Try Again Later');
      console.error('Wrong Credentials', error);
    }
  };

  return (
    <div className="login-container">
      <h3>#Seshabo Login</h3>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Bind email state to input
            autoComplete="off"
            placeholder="Enter your Email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // binding the password to the 
            autoComplete="off"
            placeholder="Enter your Password"
            required
          />
          <button onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
      {status && <div className={`status ${status}`}>{statusMessage}</div>}
      <div className="signup-prompt">
        <p>Don't have an account?</p>
        <Link to="/signup" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
