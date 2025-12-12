import './stylesheets/Footer.css';
import boxLogo from '../assets/my_assets/homepage/header/Box Logo.png';

function Footer() {

    return(
        <div className="footer">
            <div className="footershadow"></div>
            <div className="footer-body">
                <div className="footer-body-sec1">
                    <span className="footer-discord" >
                        <i class='bx bxl-discord-alt' ></i>
                    </span>
                    
                    <span className="footer-facebook" >
                        <i class='bx bxl-reddit' ></i>
                    </span>
                    
                    <span className="footer-facebook" >
                        <i class='bx bxl-facebook-circle'></i>
                    </span>
                </div>

                <div className="footer-body-sec2">
                    <div className="footer-notes">
                        <div id="fn">Help</div>
                        <div id="fn">News and Events</div>
                        <div id="fn">Privacy Policy</div>
                        <div id="fn">Terms of Services</div>
                        <div id="fn">Content Ratings</div>
                        <div id="fn">Copyrights</div>
                        <div id="fn">Community Guidelines</div>
                    </div>
                </div>

                <div className="footer-body-sec3">
                    <img className="footer-logo" src={boxLogo} />

                    <div className="footer-trademark">
                        <div className="trademark-msg1">
                            Manga Raider is a registered trademark (Registration No.10921042)
                            Indicating that this e-book store / e-book distribution service is an authorized distribution service that gained permission to use content from the copyright holder.
                            For more information check 
                        </div>
                        <div className="trademark-msg2">
                            https://github.com/kenetsevilla/e-commerce-crud-web-app/.
                        </div>
                    </div>
                </div>

                <div className="footer-body-sec4">
                    ©︎2025 Kenet Sevilla. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer