import { useState } from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/BuyMangaDisplay.css';
import Order from '../classes/Order.js';
import Product from '../classes/Product.js';

function BuyMangaDisplay({ loggedInAccountName,
    imageNum,
    imageTitle,
    imageAuthor,
    imagePrice,
    imageY,
    containerWidth,
    containerHeight,
    containerMargin,
    containerBorderRadius,
    description,
    stockLeft,
    goToPage,
    returnToPage,
    state = '',
}) {

    if (state === '') {
        state = null;
    }

    const mangaDetails = {
        loggedInAccountName,
        imageNum,
        imageTitle,
        imageAuthor,
        imagePrice,
        imageY,
        containerWidth,
        containerHeight,
        containerMargin,
        containerBorderRadius,
        description,
        stockLeft,
        goToPage,
        returnToPage,
        state,
    };

    const [showLoginOverlay, setShowLoginOverlay] = useState(false);
    const [addToCartMessageVisible, setAddToCartMessageVisible] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    const handleLinkClick = (e, action) => {
        if (loggedInAccountName === '') {
            e.preventDefault();
            setShowLoginOverlay(true);
        } else if (action === 'addToCart') {
            let orderData = {
                userID: loggedInAccountName,
                status: 'Pending',
                items: [mangaDetails],
                totalAmount: 1,
                shippingAddress: 'address',
            };
            Order.createOrder(orderData);
    
            setAddToCartMessageVisible(true);
            setTimeout(() => setFadeIn(true), 50);
    
            setTimeout(() => {
                setFadeIn(false);
                setTimeout(() => setAddToCartMessageVisible(false), 500);
            }, 2000);
        }
    };      

    const handleOkClick = () => {
        setShowLoginOverlay(false);
    };

    const style = {
        buymangaContainer: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: containerWidth,
            height: containerHeight,
            margin: containerMargin,
            borderRadius: containerBorderRadius,
            overflow: 'hidden',
            boxShadow: '0px 0px 10px 1px rgba(255, 255, 255, 0.25)',
            userSelect: 'none',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        buymangaCoverPic: {
            position: 'absolute',
            top: '0',
            backgroundImage: `url('/src/assets/my_assets/homepage/main/manga_display/${imageNum}.jpg')`,
            backgroundSize: 'cover',
            backgroundPositionY: imageY,
            width: '100%',
            height: '85%',
        },
        buymangaMiddleBox: {
            content: "''",
            position: 'absolute',
            top: '100%',
            backgroundColor: 'black',
            boxShadow: '0px 0px 70px 60px black',
            width: '100%',
            height: '100%',
        },
        buymangaTopBox: {
            position: 'absolute',
            bottom: '15%',
            width: '100%',
            height: '85%',
            paddingLeft: '5px',
            transition: '0.3s',
        },
        mangaTitle: {
            position: 'absolute',
            bottom: '12%',
            color: 'white',
            fontSize: '25px',
            fontFamily: '"Barlow Condensed", "consolas", sans-serif',
            width: 'auto',
            maxWidth: '95%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        mangaAuthor: {
            position: 'absolute',
            bottom: '7%',
            color: 'rgb(213, 202, 202)',
            fontSize: '12px',
            fontFamily: '"Rubik Vynil", "consolas", sans-serif',
        },
        buymangaPriceBox: {
            position: 'absolute',
            bottom: '15%',
            paddingLeft: '5px',
            width: '100%',
            height: '5%',
            cursor: 'default',
        },
        mangaPrice: {
            position: 'absolute',
            bottom: '0',
            color: 'rgb(213, 202, 202)',
            fontSize: '16px',
            fontFamily: '"Rubik Vynil", "consolas", sans-serif',
            marginLeft: "3px",
        },
        buymangaBottomBox: {
            position: 'absolute',
            bottom: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            width: '100%',
            height: '15%',
        },
        buymangaBottomBoxButtonLeft: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            background: 'linear-gradient(to right, rgb(147, 38, 184), rgb(184, 38, 148))',
            width: '40%',
            height: '70%',
            borderRadius: '20px',
            margin: '10px',
            transition: '0.2s',
        },
        buymangaBottomBoxButtonRight: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '13.5px',
            background: 'linear-gradient(to right, rgb(184, 38, 148), rgb(244, 106, 198))',
            width: '40%',
            height: '70%',
            borderRadius: '20px',
            margin: '10px',
            textDecoration: 'none',
            transition: '0.2s',
        },
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
        addToCartMessage: {
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            width: '100%',
            height: '100%',
            color: 'yellow',
            fontFamily: '"Barlow Condensed", "consolas", sans-serif',
            fontSize: '30px',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 999,
            opacity: fadeIn ? 1 : 0,
            visibility: addToCartMessageVisible ? 'visible' : 'hidden',
            transition: 'opacity 0.2s ease-in-out, visibility 0s linear 0.2s',
        },                 
    };

    return (
        <div style={style.buymangaContainer} className="buymanga-container">
            {showLoginOverlay && (
                <div style={style.overlay}>
                    <span>You need to log in first!</span>
                    <button
                        style={style.okButton}
                        onClick={handleOkClick}
                        onMouseEnter={(e) => e.target.style.background = style.okButtonHover.background}
                        onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, rgb(147, 38, 184), rgb(184, 38, 148))' }
                    >
                    OK
                    </button>
                </div>
            )}
            
            <div style={style.buymangaCoverPic} className="buymanga-coverpic">
                {addToCartMessageVisible && (
                    <div style={style.addToCartMessage}>
                        <span className="cotainer-addtocartclicked-msg">
                            Added to cart!
                        </span>
                    </div>
                )}
            </div>
            
            <Link
    to={goToPage}
    state={mangaDetails}
    style={style.buymangaTopBox}
    className="buymanga-topbox"
    onClick={(e) => {
        if (loggedInAccountName === '') {
            e.preventDefault();
            setShowLoginOverlay(true);
        }
    }}
>
    <div style={style.buymangaMiddleBox} className="buymanga-middlebox" />
    <span style={style.mangaTitle} className="image-title">{imageTitle}</span>
    <span style={style.mangaAuthor}>{imageAuthor}</span> <br />
</Link>



            <div style={style.buymangaPriceBox}>
                <span style={style.mangaPrice}>{Product.defaultCurrency} {imagePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div style={style.buymangaBottomBox}>
                <div
                    style={style.buymangaBottomBoxButtonLeft}
                    className="buymanga-bottombox-buttonleft"
                    onClick={(e) => handleLinkClick(e, 'buyNow')}
                >
                    <span>Buy Now</span>
                </div>

                <Link
                    state={mangaDetails}
                    className="buymanga-bottombox-buttonright"
                    style={style.buymangaBottomBoxButtonRight}
                    onClick={(e) => handleLinkClick(e, 'addToCart')}
                >
                    <div>
                        <span>Add to Cart</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default BuyMangaDisplay;
