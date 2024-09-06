import React, { useState } from "react";
import axios  from "axios";
import BannerImage from "../Assets/home-banner-image.png";
import "../Components/div.css";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { baseUrl } from './utils/config';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleMessage = async ()=>{
    console.log("buns");
    
    try{
      const response = await axios.post(`${baseUrl}contact/`, {
        image,
        name,
        price,
      })

      console.log(response.data.message);

    }catch(error){
      console.log('could not sent the message', error);
    }
};

  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="rightSide">
        <h1>Upload Products</h1>

        <div>
          <label htmlFor="image">Image</label>
          <input value={name} onChange={(v)=>{setName(v.target.value)}} placeholder="Enter full name..." type="text" />
          <label htmlFor="name">Name </label>
          <input value={email} onChange={(v)=>{setEmail(v.target.value)}} type="email" />
          <label htmlFor="price">Price</label>
          <textarea
          value={message} onChange={(v)=>{setMessage(v.target.value)}}
            rows="6"
            placeholder="Enter price of the product..."
            name="message"
            required
          ></textarea>
          <button onClick={handleMessage}>Upload Seshabo</button>
        </div>
      </div>
    </div>
  );
};

export default sendMenu;

