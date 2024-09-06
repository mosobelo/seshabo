import React from 'react';
import { useCart } from "react-use-cart";
import axios from 'axios'; // Import axios
import MenuList from "./MenuList";
import Itemcard from "./Itemcard";
import { baseUrl } from './utils/config';

const Hae = () => {
    const {
        addItem,
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    const handleBuyNow = async () => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Check if the token is present
        if (!token) {
            console.error('No token found. User must be logged in.');
            return; // Exit the function early if there's no token
        }

        try {
            // Verify the token by making an authenticated request
            // const authResponse = await axios.post(`${baseUrl}api/login/`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });

            console.log(token)
            

            const cartData = items.map(item => ({
                dishName: item.dishName,
                quantity: item.quantity,
                price: item.price,
            }));
            console.log(cartData);

            // Send the cart data to the server
            const purchaseResponse = await axios.post(`${baseUrl}api/cart/`, {
                items: cartData,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Use the valid token
                },
            });

            // Handle the success response
            console.log('Purchase successful:', purchaseResponse.data);

            // If the token is valid, proceed with the purchase
            // if (authResponse.status === 200) {
            //     // Collect data from the cart
            //     const cartData = items.map(item => ({
            //         dishName: item.dishName,
            //         quantity: item.quantity,
            //         price: item.price,
            //     }));
            //     console.log(cartData);

            //     // Send the cart data to the server
            //     const purchaseResponse = await axios.post(`${baseUrl}api/cart/`, {
            //         items: cartData,
            //     }, {
            //         headers: {
            //             Authorization: `Bearer ${token}`, // Use the valid token
            //         },
            //     });

            //     // Handle the success response
            //     console.log('Purchase successful:', purchaseResponse.data);

            //     // Optionally, clear the cart after successful purchase
            //     emptyCart();

            // } else {
            //     console.error('Invalid token. User must be logged in.');
            // }
        } catch (error) {
            console.error('Error during purchase:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <h1 className="text-center mt-3">Seshabo #Lijo</h1>
            <section className="py-4 container">
                <div className="row justify-content-center">
                    {MenuList.productData.map((item, index) => {
                        return (
                            <Itemcard
                                key={index}
                                image={item.image}  // Ensure the image prop is passed
                                dishName={item.dishName}
                                quantity={item.quantity}
                                price={item.price}
                                item={item}          // This prop is necessary for the addItem function
                            />
                        );
                    })}
                </div>
            </section>

            {/* Cart Section */}
            <h1 className="text-center mt-5">Seshabo Cart</h1>
            <section className="py-4 container">
                <div className="row justify-content-center">
                    {isEmpty ? (
                        <h2 className="text-center">Seshabo Cart is Empty</h2>
                    ) : (
                        <div className="col-12">
                            <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
                            <table className="table table-light table-hover m-0">
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={item.image} style={{ height: '6rem' }} alt={item.title} />
                                            </td>
                                            <td>{item.dishName}</td>
                                            <td>M{item.price}</td>
                                            <td>Quantity ({item.quantity})</td>
                                            <td>
                                                <button
                                                    className="btn btn-info ms-2"
                                                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                >-</button>
                                                <button
                                                    className="btn btn-info ms-2"
                                                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                >+</button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => removeItem(item.id)}
                                                >Remove Item</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {!isEmpty && (
                        <>
                            <div className="col-auto ms-auto">
                                <h2>Total Price : M {cartTotal} </h2>
                            </div>
                            <div className="col-auto">
                                <button
                                    className="btn btn-danger m-2"
                                    onClick={() => emptyCart()}>
                                    Clear Cart
                                </button>
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={() => handleBuyNow()} // Call handleBuyNow on click
                                >
                                    Buy Now
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Hae;
