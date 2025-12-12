class Order {
    static orders = [];
    static usedOrderIDs = new Set();

    constructor(userID, status, items, totalAmount, shippingAddress) {
        this.orderID = Order.generateUniqueOrderID();
        this.userID = userID;
        this.orderDate = new Date().toISOString();
        this.status = status;
        this.items = items;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.isIncluded = false;
        this.isForDelivery = false;
    }

    get deliveryStatus() {
        return this.isForDelivery;
    }

    set deliveryStatus(value) {
        if (typeof value !== 'boolean') {
            throw new Error('Invalid value for isForDelivery. It must be a boolean.');
        }
        this.isForDelivery = value;
    }

    static generateUniqueOrderID() {
        let orderID;
        do {
            orderID = Math.floor(100000 + Math.random() * 900000);
        } while (Order.usedOrderIDs.has(orderID));
        Order.usedOrderIDs.add(orderID);
        return orderID;
    }

    static createOrder(orderData) {
        const { userID, status, items, totalAmount, shippingAddress } = orderData;

        if (!userID || !status || !items || !totalAmount || !shippingAddress) {
            return 'Failed to create order: Missing required fields.';
        }

        if (items[0].stockLeft <= 0) {
            return 'Failed to create order: Item is out of stock.';
        }

        const existingOrder = Order.orders.find(order =>
            order.userID === userID &&
            order.items.some(item => item.imageNum === items[0].imageNum)
        );

        if (existingOrder) {
            const existingItem = existingOrder.items.find(item => item.imageNum === items[0].imageNum);
            if (existingItem) {
                const newQuantity = (existingItem.quantity || 1) + 1;
                if (newQuantity > items[0].stockLeft) {
                    return `Failed to update order: Stock limit exceeded for item ${items[0].imageNum}.`;
                }
                existingItem.quantity = newQuantity;
                existingOrder.totalAmount += totalAmount;
                return 'Order updated successfully.';
            }
        } else {
            if (items[0].quantity > items[0].stockLeft) {
                return `Failed to create order: Stock limit exceeded for item ${items[0].imageNum}.`;
            }
            const newOrder = new Order(userID, status, items, totalAmount, shippingAddress);
            Order.orders.unshift(newOrder);
            return 'Order created successfully.';
        }
    }

    static getOrder(orderID) {
        const order = Order.orders.find(order => order.orderID === orderID);
        return order || 'Order not found.';
    }

    static updateOrder(orderID, updatedData) {
        const index = Order.orders.findIndex(order => order.orderID === orderID);
        if (index !== -1) {
            Order.orders[index] = { ...Order.orders[index], ...updatedData };
            return 'Order updated successfully.';
        }
        return 'Failed to update order: Order not found.';
    }

    static deleteOrder(orderID) {
        const index = Order.orders.findIndex(order => order.orderID === orderID);
        if (index !== -1) {
            Order.orders.splice(index, 1);
            Order.usedOrderIDs.delete(orderID);
            return 'Order deleted successfully.';
        }
        return 'Failed to delete order: Order not found.';
    }

    static listOrders() {
        return Order.orders;
    }

    toggleInclude() {
        this.isIncluded = !this.isIncluded;
    }
}

export default Order;
