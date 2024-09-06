
import React, { useState } from "react";
import axios from "axios";
import BannerImage from "../Assets/home-banner-image.png";
import "../Components/div.css";
import { baseUrl } from './utils/config';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); 
  const [status, setStatus] = useState(''); 

  const handleMessage = async () => {
    try {
      const response = await axios.post(`${baseUrl}api/contact/`, {
        name,
        email,
        message,
      });

      // If successful, set the success status and message
      setStatus('success');
      setStatusMessage('Message sent successfully!');
      
      // Optionally, clear the input fields after success
      setName('');
      setEmail('');
      setMessage('');

    } catch (error) {
      // If there is an error, set the error status and message
      setStatus('error');
      setStatusMessage('Could not send the message. Please try again later.');
      console.error('Could not send the message', error);
    }
  };

  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="rightSide">
        <h1>Contact Us</h1>

        <div>
          <label htmlFor="name">Full Name</label>
          <input value={name} onChange={(v) => setName(v.target.value)} placeholder="Enter full name..." type="text" />
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(v) => setEmail(v.target.value)} type="email" placeholder="Enter your email..." />
          <label htmlFor="message">Message</label>
          <textarea
            value={message} onChange={(v) => setMessage(v.target.value)}
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button onClick={handleMessage}>Send Message</button>

          {/* Display the status message */}
          {statusMessage && (
            <p className={status === 'success' ? 'success-message' : 'error-message'}>
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
