import './stylesheets/Header2.css';
import { Link } from 'react-router-dom';

function SecondHeader({ headerWidth, headerHeight , returnToPage, keepState}) {
    function isObject(value) {
        return value !== null && typeof value === 'object';
    }

    // console.log('is keepState obj: ' + isObject(keepState));

    return (
        <div 
            className="second-header" 
            style={{ width: headerWidth, height: headerHeight }}
        >
            <Link
                to={returnToPage}
            >
                <div className="login-backtohome">
                    <span className="login-backicon">
                        <i className="bx bxs-left-arrow-alt"></i>
                    </span>
                    <span>Back</span>
                </div>
            </Link>
        </div>
    );
}

export default SecondHeader;
