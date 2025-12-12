import React, { useState, useEffect } from "react";
import './stylesheets/Admin.css';
import TopBarLine from '../components/TopBarLine.jsx';
import SecondHeader from '../components/Header2.jsx';
import User from "../classes/User.js";
import Product from "../classes/Product.js";
import Order from "../classes/Order.js";

function Admin() {
  const [users, setUsers] = useState(User.getAllUsers());
  const [products, setProducts] = useState(Product.products);
  const [orders, setOrders] = useState(Order.orders);

  const [newProduct, setNewProduct] = useState({
    productID: '',
    title: '',
    author: '',
    description: '',
    price: '',
    images: '',
    quantity: '',
    currency: Product.defaultCurrency
  });

  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');

  useEffect(() => {
    setUsers(User.getAllUsers());
    setProducts(Product.products);
    setOrders(Order.orders);
  }, []);

  const handleCreateProduct = () => {
    const { productID, title, author, description, price, images, quantity, currency } = newProduct;
    if (productID && title && price && quantity) {
      const createdProduct = new Product(productID, title, author, description, parseFloat(price), images, parseInt(quantity), currency);
      setProducts([...products, createdProduct]);
      setNewProduct({
        productID: '',
        title: '',
        author: '',
        description: '',
        price: '',
        images: '',
        quantity: '',
        currency: Product.defaultCurrency
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteProduct = (productID) => {
    const updatedProducts = products.filter(product => product.productID !== productID);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      productID: product.productID,
      title: product.title,
      author: product.author,
      description: product.description,
      price: product.price,
      images: product.images,
      quantity: product.quantity,
      currency: product.currency
    });
  };

  const handleDeleteUser = (userID) => {
    const updatedUsers = users.filter(user => user.userID !== userID);
    setUsers(updatedUsers);
  };

  const handleEditUser = (user) => {
    document.querySelector('.create-userid input').value = user.userID;
    document.querySelector('.create-name input').value = user.name;
    document.querySelector('.create-email input').value = user.email;
    document.querySelector('.create-password input').value = user.password;
    document.querySelector('.create-address input').value = user.address;
    document.querySelector('.create-phonenumber input').value = user.phoneNumber;
    document.querySelector('.create-role input').value = user.role;
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.author.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.productID.includes(productSearchTerm)
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const filteredOrders = orders
    .filter(order =>
      (order.orderID.includes(orderSearchTerm) || 
      order.productID.includes(orderSearchTerm)) && 
      order.isForDelivery
    );

  return (
    <div className="admin-container">
      <TopBarLine />
      <SecondHeader returnToPage="/" />

      <div className="admin-body">
        <span className="admin-body-title">
          Admin
        </span>
        <div className="admin-inputwrapper">

          {/* === Users === */}
          <div className="adwrap-users">
            <div className="adwrap-users-create"></div>
            <div className="adwrap-users-body">
              <div className="users-create">
                <div className="create-users-wrapper">
                  <div className="create-users-msg">
                    <span className="create-users-msg1">
                      Users
                    </span>
                  </div>

                  <div className="create-userid">
                    <input placeholder="userID" type="text" />
                  </div>

                  <div className="create-name">
                    <input placeholder="name" type="text" />
                  </div>

                  <div className="create-email">
                    <input placeholder="email" type="text" />
                  </div>

                  <div className="create-password">   
                    <input placeholder="password" type="text" />
                  </div>

                  <div className="create-address">
                    <input placeholder="address" type="text" />
                  </div>

                  <div className="create-phonenumber">
                    <input placeholder="phoneNumber" type="text" />
                  </div>

                  <div className="create-role">
                    <input placeholder="role" type="text" /> 
                  </div>
                </div>

                <div className="create-users-button">
                  <span className="create-users-buttontext">
                    Create
                  </span>
                </div>
              </div>

              <div className="users-list">
                <div className="users-searchbar">
                  <input 
                    className="users-searchbar-textbox" 
                    placeholder="Search users" 
                    type="text" 
                    value={userSearchTerm} 
                    onChange={(e) => setUserSearchTerm(e.target.value)} 
                  />
                  <div className="users-searchbar-button">
                    <span className="users-searchbar-buttontext">
                      Search
                    </span>
                  </div>
                </div>
                <div className="users-list-body">
                  <div className="users-list-bodywrap">
                    {filteredUsers.map((user) => (
                      <div key={user.userID} className="user-item" onClick={() => handleEditUser(user)}>
                        <div className="user-item-info1">
                          Name:&nbsp;
                          <div className="user-item-info1-1">
                            {user.name}
                          </div>
                        </div>
                        <div className="user-item-info2">
                          Email:&nbsp;
                          <div className="user-item-info2-1">{user.email}</div>
                        </div>
                        <div className="user-item-info3">
                          Role:&nbsp;
                          <div className="user-item-info3-1">{user.role}</div>
                        </div>
                        <div className="user-item-info4">
                          Address:&nbsp;
                        </div>
                        <div className="user-item-info4-1">{user.address}</div>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.userID); }}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === Products === */}
          <div className="adwrap-products">
            <div className="adwrap-products-create"></div>
            <div className="adwrap-products-body">
              <div className="products-create">
                <div className="create-products-wrapper">
                  <div className="create-products-msg">
                    <span className="create-products-msg1">
                      Products
                    </span>
                  </div>

                  <div className="create-productid">
                    <input 
                      placeholder="productID" 
                      type="text" 
                      value={newProduct.productID} 
                      onChange={(e) => setNewProduct({ ...newProduct, productID: e.target.value })} 
                    />
                  </div>

                  <div className="create-title">
                    <input 
                      placeholder="title" 
                      type="text" 
                      value={newProduct.title} 
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} 
                    />
                  </div>

                  <div className="create-author">
                    <input 
                      placeholder="author" 
                      type="text" 
                      value={newProduct.author} 
                      onChange={(e) => setNewProduct({ ...newProduct, author: e.target.value })} 
                    />
                  </div>

                  <div className="create-description">
                    <input 
                      placeholder="description" 
                      type="text" 
                      value={newProduct.description} 
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                    />
                  </div>

                  <div className="create-price">
                    <input 
                      placeholder="price" 
                      type="text" 
                      value={newProduct.price} 
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                    />
                  </div>

                  <div className="create-images">
                    <input 
                      placeholder="images" 
                      type="text" 
                      value={newProduct.images} 
                      onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })} 
                    />
                  </div>

                  <div className="create-quantity">
                    <input 
                      placeholder="quantity" 
                      type="text" 
                      value={newProduct.quantity} 
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} 
                    />
                  </div>

                  <div className="create-currency">
                    <input 
                      placeholder="currency" 
                      type="text" 
                      value={newProduct.currency} 
                      onChange={(e) => setNewProduct({ ...newProduct, currency: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="create-products-button" onClick={handleCreateProduct}>
                  <span className="create-products-buttontext">
                    Create
                  </span>
                </div>
              </div>

              <div className="products-list">
                <div className="products-searchbar">
                  <input 
                    className="products-searchbar-textbox" 
                    placeholder="Search products" 
                    type="text" 
                    value={productSearchTerm} 
                    onChange={(e) => setProductSearchTerm(e.target.value)} 
                  />
                  <div className="products-searchbar-button">
                    <span className="products-searchbar-buttontext">
                      Search
                    </span>
                  </div>
                </div>
                <div className="products-list-body">
                  <div className="products-list-bodywrap">
                    {filteredProducts.map((product) => (
                      <div key={product.productID} className="product-item" onClick={() => handleEditProduct(product)}>
                        <div className="product-item-info1">
                          Title:&nbsp;
                          <div className="product-item-info1-1">{product.title}</div>
                        </div>
                        <div className="product-item-info2">
                          Author:&nbsp;
                          <div className="product-item-info2-1">{product.author}</div>
                        </div>
                        <div className="product-item-info3">
                          Price:&nbsp;
                          <div className="product-item-info3-1">
                            {Product.defaultCurrency} {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                        <div className="product-item-info4">
                          Stock:&nbsp;
                          <div className="product-item-info4-1">{product.quantity}</div>
                        </div>
                        <img className="product-item-info5" src={`${product.images}`} alt={product.title} />
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.productID); }}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
