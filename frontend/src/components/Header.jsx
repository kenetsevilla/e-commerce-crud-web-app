import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './stylesheets/Header.css';
import bannerLogo from '../assets/my_assets/homepage/header/Manga Raider Banner Logo.png';

function Header({ loggedInAccountName: propAccountName }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [loggedInAccountName, setLoggedInAccountName] = useState(propAccountName || '');

    useEffect(() => {
        if (!propAccountName) {
            const storedAccountName = localStorage.getItem('loggedInAccountName');
            if (storedAccountName) {
                setLoggedInAccountName(storedAccountName);
            }
        }
    }, [propAccountName]);

    const [showLoginOverlay, setShowLoginOverlay] = useState(false);

    const handleUserClick = () => {
        if (!loggedInAccountName) {
            navigate('/login');
        } else {
            navigate('/profile');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const query = event.target.value.trim();
            navigate(`/searchres?query=${encodeURIComponent(query)}`, {
                state: { loggedInAccountName },
            });
        }
    };

    const handleIconClick = () => {
        if (!loggedInAccountName) {
            setShowLoginOverlay(true);
        } else {
            const query = searchQuery.trim();
            navigate(`/searchres?query=${encodeURIComponent(query)}`, {
                state: { loggedInAccountName },
            });
        }
    };

    const handleLinkClick = () => {
        if (!loggedInAccountName) {
            setShowLoginOverlay(true);
        }
    };

    const handleOkClick = () => {
        setShowLoginOverlay(false);
    };

    const style = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            zIndex: 9999,
        },
        okButton: {
            marginTop: '20px',
            padding: '10px 20px',
            background: 'linear-gradient(to right, rgb(147, 38, 184), rgb(184, 38, 148))',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: '0.2s',
        },
        okButtonHover: {
            background: 'linear-gradient(to right, rgb(189, 79, 226), rgb(232, 62, 189))',
        },
    };

    return (
        <div className="header">
            {showLoginOverlay && (
                <div style={style.overlay}>
                    <span>You need to log in first!</span>
                    <button
                        style={style.okButton}
                        onClick={handleOkClick}
                        onMouseEnter={(e) => e.target.style.background = style.okButtonHover.background}
                        onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, rgb(147, 38, 184), rgb(184, 38, 148))'}
                    >
                        OK
                    </button>
                </div>
            )}

            <div className="header-bgc"></div>
            <div className="header-sec1">
                <div className="searchboxline">
                    <div
                        id="bestsellers"
                        className="sb-buttons"
                        onClick={() => {
                            if (loggedInAccountName === '') {
                                setShowLoginOverlay(true);
                            } else {
                                navigate('/searchres', {
                                    state: { loggedInAccountName },
                                });
                            }
                        }}
                    >BEST SELLERS</div>
                    
                    <div
                        id="limitededition"
                        className="sb-buttons"
                        onClick={() => {
                            if (loggedInAccountName === '') {
                                setShowLoginOverlay(true);
                            } else {
                                navigate('/searchres', {
                                    state: { loggedInAccountName },
                                });
                            }
                        }}
                    >LIMITED EDITION</div>
                    
                    <div
                        id="sale"
                        className="sb-buttons"
                        onClick={() => {
                            if (loggedInAccountName === '') {
                                setShowLoginOverlay(true);
                            } else {
                                navigate('/searchres', {
                                    state: { loggedInAccountName },
                                });
                            }
                        }}
                    >SALE</div>

                    <div 
                        id="mangas"
                        className="sb-buttons"
                        onClick={() => {
                            if (loggedInAccountName === '') {
                                setShowLoginOverlay(true);
                            } else {
                                navigate('/searchres', {
                                    state: { loggedInAccountName },
                                });
                            }
                        }}
                    >MANGAS</div>
                    
                    <div
                        id="cart"
                        className="sb-buttons"
                        onClick={() => {
                            if (loggedInAccountName === '') {
                                setShowLoginOverlay(true);
                            } else {
                                navigate('/cart', {
                                    state: { loggedInAccountName },
                                });
                            }
                        }}
                    ><i className="bx bx-cart"></i>&nbsp;CART
                    </div>

                    <div
                        id="user"
                        className="sb-buttons"
                        onClick={handleUserClick}
                    >
                        <i className="bx bxs-user"></i>&nbsp;{loggedInAccountName || 'ACCOUNT'}
                    </div>

                    <div className="searchbox" onClick={handleLinkClick}>
                        <input
                            type="text"
                            placeholder="Search for items..."
                            className="textbox"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div
                            onClick={handleIconClick}
                            className="icon"
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="bx bx-search-alt"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-sec2">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img className="bannerlogo" src={bannerLogo} alt="Banner Logo" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
