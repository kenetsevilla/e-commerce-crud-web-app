import './stylesheets/Profile.css';
import TopBarLine from '../components/TopBarLine.jsx';
import SecondHeader from '../components/Header2.jsx';
import User from '../classes/User';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const logout = () => {
    User.setLoggedInAcc(null);
    localStorage.removeItem('loggedInAccountName');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <TopBarLine />
      <SecondHeader returnToPage="/" />

      <div className="profile-body">
        <div className="profile-wrapper">
          <div className="profile-topbox">
            <div className="profile-welcome">
              Welcome, {localStorage.getItem('loggedInAccountName')}!
            </div>
            <div className="profile-message">
              Manage your account below:
            </div>
          </div>

          <div className="profile-bottombox">
            <div
              className="profile-logoutbutton"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
