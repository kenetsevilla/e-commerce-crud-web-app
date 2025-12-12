import './stylesheets/OrderedItemDisplay.css';
import Product from '../classes/Product.js';
import Order from '../classes/Order.js';

function OrderedItemDisplay({ orderDetails, quantity, onQuantityChange }) {
    const updateOrder = (updatedQuantity) => {
        const existingOrder = Order.getOrder(orderDetails.orderID);
    
        if (existingOrder !== 'Order not found.') {
            const itemToUpdate = existingOrder.items.find(
                (item) => item.imageNum === orderDetails.items[0].imageNum
            );
    
            if (itemToUpdate) {
                itemToUpdate.quantity = updatedQuantity;
    
                const updatedTotalAmount = existingOrder.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                const result = Order.updateOrder(existingOrder.orderID, {
                    items: existingOrder.items,
                    totalAmount: updatedTotalAmount,
                });
    
                if (result !== 'Order updated successfully.') {
                    console.error('Failed to update order:', result);
                }
            } else {
                console.error('Item not found in the order.');
            }
        } else {
            console.error('Order not found.');
        }
    };
    
    const handleDecrement = () => {
        if (quantity > 1) {
            const updatedQuantity = quantity - 1;
            onQuantityChange(updatedQuantity);
            updateOrder(updatedQuantity);
        }
    };
    
    const handleIncrement = () => {
        if (quantity < orderDetails.items[0].stockLeft) {
            const updatedQuantity = quantity + 1;
            onQuantityChange(updatedQuantity);
            updateOrder(updatedQuantity);
        }
    };

    const handleRemove = () => {
        const result = Order.deleteOrder(orderDetails.orderID);
        if (result === 'Order deleted successfully.') {
            onQuantityChange(0);
        } else {
            console.error('Failed to remove order:', result);
        }
    };
    
    const showMaxStockMessage = quantity >= orderDetails.items[0].stockLeft;

    return (
        <div className="ordereditemdisplay-container">
            <div className="oid-item-wrapper">

                <div className="oid-wrapper-lefthalf">
                    <div className="oid-wrapper-lefthalf-left">
                        <img
                            className="oid-item-img"
                            src={`/src/assets/my_assets/homepage/main/manga_display/${orderDetails.items[0].imageNum}.jpg`}
                            alt={orderDetails.items[0].imageTitle}
                        />
                    </div>

                    <div className="oid-wrapper-lefthalf-right">
                        <span className="oid-item-title">
                            {orderDetails.items[0].imageTitle}
                        </span>
                        <span className="oid-item-author">
                            {orderDetails.items[0].imageAuthor}
                        </span>
                        <span className="oid-item-price">
                            {Product.defaultCurrency} &nbsp;
                            {(orderDetails.items[0].imagePrice * quantity).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                        <div className="oid-item-quantity-container">
                            <div className="oid-item-quantity-wrapper">
                                {!orderDetails.isForDelivery ? (
                                    <>
                                        <div 
                                            className="oid-item-remove" 
                                            onClick={handleRemove}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <i className='bx bx-trash'></i>
                                        </div>

                                        <div className="oid-item-include">
                                            <i className='bx bx-check'></i>
                                        </div>

                                        <div
                                            className="item-quantity-wrapper-sec1"
                                            onClick={handleDecrement}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span className="iqw-sec2-msg1">-</span>
                                        </div>

                                        <div className="item-quantity-wrapper-sec2">
                                            <span className="iqw-sec2-msg2">{quantity}x</span>
                                        </div>

                                        <div
                                            className="item-quantity-wrapper-sec3"
                                            onClick={handleIncrement}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span className="iqw-sec2-msg3">+</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="oid-item-static-quantity">
                                        Quantity: {quantity}
                                    </div>
                                )}
                            </div>

                            {!orderDetails.isForDelivery && showMaxStockMessage && (
                                <div className="oid-item-quantity-maxstockmsg">
                                    Max stock!
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default OrderedItemDisplay;
