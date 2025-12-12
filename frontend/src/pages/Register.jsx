import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/Register.css';
import TopBarLine from '../components/TopBarLine';
import SecondHeader from '../components/Header2';
import BannerLogo from '../assets/my_assets/homepage/header/Manga Raider Banner Logo.png';
import axios from 'axios';
import User from '../classes/User.js';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [validationMessage, setValidationMessage] = useState('Fill in the required fields');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{11}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !password || !confirmPassword || !phoneNumber || !address) {
            setValidationMessage('All fields must be filled!');
            return;
        }
    
        if (!validateEmail(email)) {
            setValidationMessage('Please enter a valid email address!');
            return;
        }
    
        if (!validatePassword(password)) {
            setValidationMessage('Password must be at least 8 characters, contain both uppercase and lowercase letters, a number, and a special character.');
            return;
        }
    
        if (password !== confirmPassword) {
            setValidationMessage('Passwords do not match!');
            return;
        }
    
        if (!validatePhoneNumber(phoneNumber)) {
            setValidationMessage('Phone number must be 11 digits long!');
            return;
        }
    
        const userData = { name, email, password, address, phoneNumber };
    
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', userData);
    
            if (response.status === 201) {
                setValidationMessage('Registration successful! You can now log in.');
    
                const newUser = User.createUser(name, email, password, address, phoneNumber);
                User.setLoggedInAcc(newUser);
    
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setValidationMessage(error.response.data.message || 'Registration failed.');
            } else {
                setValidationMessage('An error occurred during registration.');
            }
        }
    };             

    return (
        <div className="register-container">
            <TopBarLine />
            <SecondHeader returnToPage="/login" />

            <div className="register-body">
                <div className="register-input-wrapper">
                    <div className="regwrapper-left">
                        <div className="register-inputname">
                            <div className="reginputname-textbox">
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    className="textbox" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="register-inputemail">
                            <div className="reginputemail-textbox">
                                <input 
                                    type="text" 
                                    placeholder="Email" 
                                    className="textbox" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="register-inputpass">
                            <div className="reginputpass-textbox">
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="textbox" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="register-inputconfirmpass">
                            <div className="reginputconfirmpass-textbox">
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    className="textbox" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="register-inputphonenum">
                            <div className="reginputphonenum-textbox">
                                <input 
                                    type="text" 
                                    placeholder="Phone Number" 
                                    className="textbox" 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="register-inputaddr">
                            <div className="reginputaddr-textbox">
                                <input 
                                    type="text" 
                                    placeholder="Address" 
                                    className="textbox" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="register-confirmbutton"
                            onClick={handleRegister}
                        >
                            <div>Confirm</div>
                        </button>
                    </div>

                    <div className="regwrapper-right">
                        <span className='regwrap-msg1'>
                            Register an account
                        </span>
                        
                        <img className="regwrap-logo" src={BannerLogo} />

                        <span className="regwrap-msg2">
                            {validationMessage}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
