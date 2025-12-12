import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './stylesheets/Cart.css';
import TopBarLine from '../components/TopBarLine';
import SecondHeader from '../components/Header2';
import Order from '../classes/Order.js';
import OrderedItemDisplay from '../components/OrderedItemDisplay.jsx';
import Product from '../classes/Product.js';

function Cart() {
    if (Order.orders.length === 0) {
        console.log('No orders available.');
    } else {
        Order.orders.forEach((order, index) => {
            console.log(`Order ${index + 1}:`);
            console.log(`Order ID: ${order.orderID}`);
            console.log(`Status: ${order.status}`);
            console.log(`Total Amount: ${order.totalAmount}`);
            console.log(`Shipping Address: ${order.shippingAddress}`);
            console.log(`Items:`);
            order.items.forEach((item, itemIndex) => {
                console.log(`  ${itemIndex + 1}. ${item.title} (Quantity: ${item.quantity})`);
            });
            console.log(`Is For Delivery: ${order.isForDelivery}`);
            console.log('---------------------------');
        });
    }
    

    const [orders, setOrders] = useState(Order.listOrders());
    const [activeSection, setActiveSection] = useState('allorder');
    const [quantities, setQuantities] = useState(
        orders.reduce((acc, order) => {
            acc[order.orderID] = order.totalAmount;
            return acc;
        }, {})
    );
    const [includedOrders, setIncludedOrders] = useState(
        orders.reduce((acc, order) => {
            acc[order.orderID] = true;
            return acc;
        }, {})
    );

    useEffect(() => {
        setOrders(Order.listOrders());
    }, [orders]);

    const handleQuantityChange = (orderID, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [orderID]: newQuantity,
        }));
    };

    const handleIncludeChange = (orderID, isIncluded) => {
        setIncludedOrders((prevIncludedOrders) => ({
            ...prevIncludedOrders,
            [orderID]: isIncluded,
        }));
    };

    const calculateSubtotal = () => {
        return orders
            .filter((order) => !order.isForDelivery)
            .reduce((total, order) => {
                if (!includedOrders[order.orderID]) return total;
    
                const quantity = quantities[order.orderID] || 1;
                const itemTotal = order.items.reduce(
                    (sum, item) => sum + (item.imagePrice || 0) * quantity,
                    0
                );
                return total + itemTotal;
            }, 0);
    };    

    const handleHeaderClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="cart-container">
            <TopBarLine />
            <SecondHeader returnToPage="/" />

            <div className="cart-header">
                <span
                    className={`cart-header-allorder ${activeSection === 'allorder' ? 'active' : ''}`}
                    onClick={() => handleHeaderClick('allorder')}
                >
                    <i className="bx bx-cart-alt"></i> &nbsp;All Orders
                </span>

                <span
                    className={`cart-header-toreceive ${activeSection === 'toreceive' ? 'active' : ''}`}
                    onClick={() => handleHeaderClick('toreceive')}
                >
                    <i className="bx bxs-truck"></i> &nbsp;To Receive
                </span>

                <span
                    className={`cart-header-received ${activeSection === 'received' ? 'active' : ''}`}
                    onClick={() => handleHeaderClick('received')}
                >
                    <i className="bx bxs-package"></i> &nbsp;Received
                </span>
            </div>

            <div className="cart-body">
                <div
                    className="cart-body-allorder"
                    style={{
                        opacity: activeSection === 'allorder' ? 1 : 0,
                        pointerEvents: activeSection === 'allorder' ? 'auto' : 'none',
                    }}
                >
                    {orders.length > 0 ? (
                        orders
                            .filter((order) => !order.isForDelivery)
                            .map((order) => (
                                <OrderedItemDisplay
                                    key={order.orderID}
                                    orderDetails={order}
                                    quantity={quantities[order.orderID]}
                                    onQuantityChange={(newQuantity) =>
                                        handleQuantityChange(order.orderID, newQuantity)
                                    }
                                    isIncluded={includedOrders[order.orderID]}
                                    onIncludeChange={(isIncluded) =>
                                        handleIncludeChange(order.orderID, isIncluded)
                                    }
                                />
                            ))
                    ) : (
                        <div className="cart-body-msg1">No orders available.</div>
                    )}
                </div>

                <div
                    className="cart-body-toreceive"
                    style={{
                        opacity: activeSection === 'toreceive' ? 1 : 0,
                        pointerEvents: activeSection === 'toreceive' ? 'auto' : 'none',
                    }}
                >
                    <div className="cart-body-msg2">Orders to receive.</div>
                </div>

                <div
                    className="cart-body-received"
                    style={{
                        opacity: activeSection === 'received' ? 1 : 0,
                        pointerEvents: activeSection === 'received' ? 'auto' : 'none',
                    }}
                >
                    {orders.length > 0 ? (
                        orders
                            .filter((order) => order.isForDelivery)
                            .map((order) => (
                                <OrderedItemDisplay
                                    key={order.orderID}
                                    orderDetails={order}
                                    quantity={quantities[order.orderID]}
                                    onQuantityChange={(newQuantity) =>
                                        handleQuantityChange(order.orderID, newQuantity)
                                    }
                                    isIncluded={includedOrders[order.orderID]}
                                    onIncludeChange={(isIncluded) =>
                                        handleIncludeChange(order.orderID, isIncluded)
                                    }
                                />
                            ))
                    ) : (
                        <div className="cart-body-msg3">No received orders available.</div>
                    )}
                </div>
            </div>

            <div className="cart-subtotal-checkout">
                <div className="subtotal-checkout-icon">
                    <i className="bx bx-basket"></i>
                </div>

                <div className="subtotal-checkout-msg1">
                    <div className="subtotal-checkout-msg1-part1">
                        Subtotal: &nbsp;
                    </div>
                    <div className="subtotal-checkout-msg1-part2">
                        {orders.length > 0
                            ? calculateSubtotal()
                                  .toLocaleString('en-US', {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  })
                                  .replace(/^/, Product.defaultCurrency + ' ')
                            : 'No orders'}
                    </div>
                </div>

                {orders.length > 0 && (
                    <div className="subtotal-checkout-button">
                        <Link
                            to="/checkout"
                            className="subtotal-checkout-button-msg1"
                            style={{ textDecoration: 'none' }}
                        >
                            <span>Check Out</span>
                        </Link>
                    </div>
                )}
            </div>

            <div className="cart-container-barline"></div>
        </div>
    );
}

export default Cart;
