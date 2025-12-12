import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './stylesheets/Login.css';
import TopBarLine from '../components/TopBarLine.jsx';
import SecondHeader from '../components/Header2.jsx';
import User from '../classes/User.js';

function Login({ loggedInAccountName }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    User.users = storedUsers;
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (attemptedLogin && errorMessage) {
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (attemptedLogin && errorMessage) {
      setErrorMessage('');
    }
  };

  const handleLoginClick = () => {
    setAttemptedLogin(true);

    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Invalid credentials');
      return;
    }

    const user = User.users.find(user => user.email === email && user.password === password);

    if (!user) {
      setErrorMessage('Invalid credentials');
    } else {
      localStorage.setItem('loggedInAccountName', user.name);
      User.setLoggedInAcc(user);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  const isEmailEmpty = email.trim() === '';
  const isPasswordEmpty = password.trim() === '';

  return (
    <div className="login-container">
      <TopBarLine />
      <SecondHeader returnToPage="/" />

      <div className="login-body">
        <div className="login-inputwrapper">
          <div className="login-inputtopbox">
            <div className="login-topboxmsg1">Login your account</div>
            <div className={`login-topboxmsg2 ${errorMessage ? 'error' : ''}`}>
              {errorMessage || 'Enter your email and password:'}
            </div>
          </div>

          <div className="login-inputbottombox">
            <div className="login-inputemail">
              <div className="inputemail-textbox">
                <input
                  type="text"
                  placeholder="Email"
                  className={`textbox ${attemptedLogin && isEmailEmpty ? 'empty-input' : ''}`}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="login-inputpassword">
              <div className="inputpassword-textbox">
                <input
                  type="password"
                  placeholder="Password"
                  className={`textbox ${attemptedLogin && isPasswordEmpty ? 'empty-input' : ''}`}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div
              className="login-loginbutton"
              onClick={handleLoginClick}
            >
              Login
            </div>

            <Link
              to="/register"
              style={{ textDecoration: 'none' }}
              className="login-registeraccount"
            >
              <span className="registeraccount-text">No account yet? Register here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
