import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './stylesheets/Checkout.css';
import TopBarLine from '../components/TopBarLine.jsx';
import SecondHeader from '../components/Header2.jsx';
import User from '../classes/User.js';
import Order from '../classes/Order.js';

function Checkout() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = User.getLoggedInAcc();
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    const handlePlaceOrder = () => {
        if (loggedInUser) {
            try {
                const cartOrders = Order.listOrders().filter((order) => !order.isForDelivery);
    
                cartOrders.forEach((order) => {
                    order.isForDelivery = true;
                    Order.updateOrder(order.orderID, { ...order, isForDelivery: true });
                });
    
                alert('Order placed successfully! Payment method: Cash on Delivery');
                navigate('/cart');
            } catch (error) {
                console.error('Error placing the orders:', error.message);
                alert('Failed to place the order. Please try again.');
            }
        } else {
            alert('No user is logged in. Please log in to place an order.');
        }
    };
    

    return (
        <div className="checkout-container">
            <TopBarLine />
            <SecondHeader returnToPage="/cart" />

            <div className="checkout-body">
                <div className="checkout-inputwrapper">
                    <div className="checkout-inputtopbox">
                        <div className="checkout-topboxmsg1">Complete Your Purchase</div>
                        <div className="checkout-topboxmsg2">
                            Please review your order details and confirm:
                        </div>
                    </div>

                    <div className="checkout-inputbottombox">
                        <div className="checkout-summary">
                            <div className="summary-label">Order Summary:</div>
                            <div className="summary-details">no.</div>
                        </div>

                        <div className="checkout-address">
                            <div className="address-label">Shipping Address:</div>
                            <div className="address-details">
                                {loggedInUser ? loggedInUser.address : 'No address available'}
                            </div>
                        </div>

                        <div className="checkout-phone">
                            <div className="phone-label">Phone Number:</div>
                            <div className="phone-details">
                                {loggedInUser ? loggedInUser.phoneNumber : 'No phone number available'}
                            </div>
                        </div>

                        <div className="checkout-payment">
                            <div className="payment-label">Payment Method:</div>
                            <div className="payment-details">Cash on Delivery</div>
                        </div>
                    </div>

                    <div
                        className="checkout-placeorder-button"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
