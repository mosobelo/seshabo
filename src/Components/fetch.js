import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from './utils/config';
import "../Components/fetch.css";

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/data/`);
        setContacts(response.data);
      } catch (error) {
        console.error("Could not get contacts", error);
      }
    };

    fetchMessages();
  }, []);

  const handleEditClick = (contact) => {
    setEditContactId(contact._id);
    setEditFormData({
      name: contact.name,
      email: contact.email,
      message: contact.message
    });
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${baseUrl}api/update/${editContactId}`, editFormData);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === editContactId ? { ...contact, ...editFormData } : contact
        )
      );
      setEditContactId(null);
    } catch (error) {
      console.error("Could not update contact", error);
    }
  };

  const handleDeleteClick = async (contactId) => {
    try {
      await axios.delete(`${baseUrl}api/delete/${contactId}`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error("Could not delete contact", error);
    }
  };

  return (
    <div>
      <h3>RETRIEVED DATA</h3>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {editContactId === contact._id ? (
              <div>
                <label>
                  Name: <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} />
                </label>
                <br />
                <label>
                  Email: <input type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} />
                </label>
                <br />
                <label>
                  Message: <textarea name="message" value={editFormData.message} onChange={handleEditFormChange} />
                </label>
                <br />
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>id:</strong> {contact._id}<br />
                <strong>Name:</strong> {contact.name}<br />
                <strong>Email:</strong> {contact.email}<br />
                <strong>Message:</strong> {contact.message}<br />
                <button onClick={() => handleEditClick(contact)}>Edit</button>
                <button onClick={() => handleDeleteClick(contact._id)}>Delete</button>
                <br /><br />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;

