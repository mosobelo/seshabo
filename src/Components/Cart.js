import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from './utils/config';

const CartItems = () => {
  const [items, setItems] = useState([]);
  const [editdishName, setEditdishName] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  const fetchItems = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found. User must be logged in.');
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}api/getcart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data.items);
      console.log("Fetched Items:", response.data.items);
    } catch (error) {
      console.error("Could not get cart items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditClick = (item) => {
    setEditdishName(item.dishName);
    setEditQuantity(item.quantity);
  };

  const handleCancelClick = () => {
    setEditdishName(null);
  };

  const handleQuantityChange = (event) => {
    setEditQuantity(event.target.value);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token'); 
    console.log(token);

    if (!token) {
      console.error('No token found. User must be logged in.');
      return; 
    }

    try {
      const quantityToUpdate = Number(editQuantity);

      const itemr = { 
        items: [{
          quantity: quantityToUpdate, 
          dishName: editdishName
        }]
      };

      const response = await axios.put(`${baseUrl}api/updatecart`, itemr, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Update Response:", response.data);

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.dishName === editdishName ? { ...item, quantity: quantityToUpdate } : item
        )
      );
      setEditdishName(null);
    } catch (error) {
      console.error("Could not update item:", error);
    }
  };

  const handleDeleteClick = async (dishName) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('No token found. User must be logged in.');
      return; 
    }

    try {
      // Send the dishName in the request body instead of the URL
      const response = await axios.delete(`${baseUrl}api/deletecartitem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          dishName: dishName,  // Send dishName in the request body
        },
      });

      console.log("Delete Response:", response.data);

      // Remove the deleted item from the items state
      setItems((prevItems) => prevItems.filter((item) => item.dishName !== dishName));
    } catch (error) {
      console.error("Could not delete item:", error);
    }
  };

  return (
    <div>
      <h3>Retrieved Cart Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item.dishName}>
            {editdishName === item.dishName ? (
              <div>
                <label>
                  Quantity: <input type="number" value={editQuantity} onChange={handleQuantityChange} />
                </label>
                <br />
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>Dish Name:</strong> {item.dishName}<br />
                <strong>Price:</strong> {item.price}<br />
                <strong>Quantity:</strong> {item.quantity}<br />
                <button onClick={() => handleEditClick(item)}>Edit Quantity</button>
                <button onClick={() => handleDeleteClick(item.dishName)}>Delete</button>
                <br /><br />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
