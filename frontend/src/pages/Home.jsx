import './stylesheets/Home.css';

import ssimg6 from '../assets/my_assets/homepage/main/slideshow img1.jpg';
import ssimg5 from '../assets/my_assets/homepage/main/slideshow img7.jpg';
import ssimg4 from '../assets/my_assets/homepage/main/slideshow img3.jpg';
import ssimg3 from '../assets/my_assets/homepage/main/slideshow img4.jpg';
import ssimg2 from '../assets/my_assets/homepage/main/slideshow img5.jpg';
import ssimg1 from '../assets/my_assets/homepage/main/slideshow img6.jpg';

import TopBarLine from '../components/TopBarLine.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import BuyMangaDisplay from '../components/BuyMangaDisplay.jsx';
import BannerLogo from '../assets/my_assets/homepage/header/Manga Raider Banner Logo.png';
import Ads1 from '../assets/my_assets/homepage/main/ads/ads1.jpg'
import Ads2 from '../assets/my_assets/homepage/main/ads/ads2.jpg'
import Ads3 from '../assets/my_assets/homepage/main/ads/ads3.jpg'
import Ads4 from '../assets/my_assets/homepage/main/ads/ads4.jpg'
import Ads5 from '../assets/my_assets/homepage/main/ads/ads5.jpg'

import Product from '../classes/Product.js';
import { useLocation } from 'react-router-dom';
import User from '../classes/User.js';

function Home() {
    const location = useLocation();

    let loggedInAccountName = location.state?.loggedIn || '';

    const user = User.getLoggedInAcc();
    if (user) {
        loggedInAccountName = user.name;
    }

    const displayName = loggedInAccountName || 'Guest';
    console.log(displayName);

    const toProductPage = '/productdetail';
    const toHomePage = '/';
    let defImageY = -35;
    let defConWidth = '20%';
    let defConHeight = '90%';
    let defConMargin = '2%';
    let defConRadius = 10;

    const createBuyMangaDisplay = (loggedInAccountName, imageNum, imgTitle, imageAuthor, imagePrice, imageY, containerWidth, containerHeight, containerMargin, containerBorderRadius, description, stockLeft, goToPage, returnToPage) => (
        <BuyMangaDisplay
            loggedInAccountName={loggedInAccountName}
            imageNum={imageNum}
            imageTitle={imgTitle}
            imageAuthor={imageAuthor}
            imagePrice={imagePrice}
            imageY={imageY}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            containerMargin={containerMargin}
            containerBorderRadius={containerBorderRadius}
            description={description}
            stockLeft={stockLeft}
            goToPage={goToPage}
            returnToPage={returnToPage}
        />
    ); 

    return (
        <div className="container">
            <TopBarLine />
            <Header loggedInAccountName={loggedInAccountName}/>

            <div className="main">
                <div className="slideshow">
                    <div className="ss-wrapper">
                        <div className="ss-set1">
                            <img id="ss-img1" className="ss-images" src={ssimg1} alt="Slide 1" />
                            <img id="ss-img2" className="ss-images" src={ssimg2} alt="Slide 2" />
                        </div>
                        <div className="ss-set2">
                            <img id="ss-img3" className="ss-images" src={ssimg3} alt="Slide 3" />
                            <img id="ss-img4" className="ss-images" src={ssimg4} alt="Slide 4" />
                        </div>
                        <div className="ss-set3">
                            <img id="ss-img5" className="ss-images" src={ssimg5} alt="Slide 5" />
                            <img id="ss-img6" className="ss-images" src={ssimg6} alt="Slide 6" />
                        </div>
                    </div>
                    <div className="ss-pages">
                        <div className="ss-page1"></div>
                        <div className="ss-page2"></div>
                        <div className="ss-page3"></div>
                    </div>
                </div>

                <div className="main-sec1">
                    <div className="main-sec1-bar1">
                        <div className="main-sec1-bar1-tab1">
                            Discord
                            <span id="discord"><i class='bx bxl-discord-alt' ></i></span>
                        </div>
                        <div className="main-sec1-bar1-tab2">
                            Reddit
                            <span id="reddit"><i class='bx bxl-reddit' ></i></span>
                        </div>
                        <div className="main-sec1-bar1-tab3">
                            Facebook
                            <span id="facebook"><i class='bx bxl-facebook-circle'></i></span>
                        </div>
                    </div>

                    <div className="main-sec1-bar2">
                        <div className="main-sec1-bar2-bg">
                            <span className="main-sec1-bar2-msg">Share your work to the world</span>
                            <img className="main-sec1-bar2-bannerlogo" src={BannerLogo} />
                        </div>
                    </div>

                    <div className="main-sec1-bar3">
                        <div className="main-sec1-bar3-tab1">
                            <div className="ads-wrapper">
                                <img className="ads1" src={Ads1} />
                                <img className="ads2" src={Ads2} />
                                <img className="ads3" src={Ads3} />
                                <img className="ads4" src={Ads4} />
                                <img className="ads5" src={Ads5} />
                            </div>

                            <div className="ads-tag1">
                                People with special needs
                            </div>

                            <div className="ads-tag2">
                                Donate to the helpless
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-sec2">
                    <div className="main-sec2-sectiontitle">Mangas</div>
                    
                    <div className="main-sec2-panel">
                        <span className="main-sec2-paneltext">Mangas</span>
                        <span className="main-sec2-paneltext2"><i class='bx bxs-chevron-right'></i></span>
                    </div>

                    <div className="main-sec2-wrapper">
                        <div className="main-sec2-bar1">
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[0].productID,
                                Product.products[0].title,
                                Product.products[0].author,
                                Product.products[0].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[0].description,
                                Product.products[0].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[1].productID,
                                Product.products[1].title,
                                Product.products[1].author,
                                Product.products[1].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[1].description,
                                Product.products[1].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[2].productID,
                                Product.products[2].title,
                                Product.products[2].author,
                                Product.products[2].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[2].description,
                                Product.products[2].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[3].productID,
                                Product.products[3].title,
                                Product.products[3].author,
                                Product.products[3].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[3].description,
                                Product.products[3].quantity,
                                toProductPage,
                                toHomePage)}
                        </div>

                        <div className="main-sec2-bar2">
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[4].productID,
                                Product.products[4].title,
                                Product.products[4].author,
                                Product.products[4].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[4].description,
                                Product.products[4].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[5].productID,
                                Product.products[5].title,
                                Product.products[5].author,
                                Product.products[5].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[5].description,
                                Product.products[5].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[6].productID,
                                Product.products[6].title,
                                Product.products[6].author,
                                Product.products[6].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[6].description,
                                Product.products[6].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[7].productID,
                                Product.products[7].title,
                                Product.products[7].author,
                                Product.products[7].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[7].description,
                                Product.products[7].quantity,
                                toProductPage,
                                toHomePage)} 
                        </div>
                        
                        <div className="main-sec2-bar3">
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[8].productID,
                                Product.products[8].title,
                                Product.products[8].author,
                                Product.products[8].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[8].description,
                                Product.products[8].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[9].productID,
                                Product.products[9].title,
                                Product.products[9].author,
                                Product.products[9].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[9].description,
                                Product.products[9].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[10].productID,
                                Product.products[10].title,
                                Product.products[10].author,
                                Product.products[10].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[10].description,
                                Product.products[10].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[11].productID,
                                Product.products[11].title,
                                Product.products[11].author,
                                Product.products[11].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[11].description,
                                Product.products[11].quantity,
                                toProductPage,
                                toHomePage)}
                        </div>

                        <div className="main-sec2-bar4">
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[12].productID,
                                Product.products[12].title,
                                Product.products[12].author,
                                Product.products[12].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[12].description,
                                Product.products[12].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[13].productID,
                                Product.products[13].title,
                                Product.products[13].author,
                                Product.products[13].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[13].description,
                                Product.products[13].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[14].productID,
                                Product.products[14].title,
                                Product.products[14].author,
                                Product.products[14].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[14].description,
                                Product.products[14].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[15].productID,
                                Product.products[15].title,
                                Product.products[15].author,
                                Product.products[15].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[15].description,
                                Product.products[15].quantity,
                                toProductPage,
                                toHomePage)} 
                        </div>

                        <div className="main-sec2-bar5">
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[16].productID,
                                Product.products[16].title,
                                Product.products[16].author,
                                Product.products[16].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[16].description,
                                Product.products[16].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[17].productID,
                                Product.products[17].title,
                                Product.products[17].author,
                                Product.products[17].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[17].description,
                                Product.products[17].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[18].productID,
                                Product.products[18].title,
                                Product.products[18].author,
                                Product.products[18].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[18].description,
                                Product.products[18].quantity,
                                toProductPage,
                                toHomePage)}
                            {createBuyMangaDisplay(loggedInAccountName,
                                Product.products[19].productID,
                                Product.products[19].title,
                                Product.products[19].author,
                                Product.products[19].price,
                                `${defImageY}px`,
                                defConWidth,
                                defConHeight,
                                defConMargin,
                                `${defConRadius}px`,
                                Product.products[19].description,
                                Product.products[19].quantity,
                                toProductPage,
                                toHomePage)} 
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default Home;