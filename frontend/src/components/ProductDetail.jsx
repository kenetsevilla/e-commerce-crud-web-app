import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './stylesheets/ProductDetail.css';
import TopBarLine from '../components/TopBarLine.jsx'
import SecondHeader from './Header2.jsx';
import Product from '../classes/Product.js';
import Order from '../classes/Order.js';

function ProductDetail() {
  const location = useLocation();
  const mangaDetails = location.state;

  // console.log('goto: ' + mangaDetails.goToPage);
  // console.log('returnto: ' + mangaDetails.returnToPage);

  if (!mangaDetails) {
    return <div>No manga details available.</div>;
  }

  // if (!mangaDetails.imageTitle) {
  //   console.log('nothing')
  // }

  const handleLinkClick = () => {
    let orderData = {
        userID: 'UserID',
        status: 'Status',
        items: [mangaDetails],
        totalAmount: 1,
        shippingAddress: 'somewhere'
    };
    Order.createOrder(orderData);
  };

  return (
    <>
      
      <div className="productdetail-container">
        <TopBarLine />
        <SecondHeader returnToPage={mangaDetails.returnToPage} />

        <div className="productdetail-body">
          <div className="pd-body-lefthalf">
            <div className="pd-lefthalf-mangaImage"
              style={{
                backgroundImage: `url('/src/assets/my_assets/homepage/main/manga_display/${mangaDetails.imageNum}.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundPositionY: '-42px',
              }}
            >
              <div className="mangaimage-shine"></div>
            </div>

            <div className="pd-lefthalf-mangaStock">
              {mangaDetails.stockLeft} copies left in stock!
            </div>
          </div>

          <div className="pd-body-righthalf">
            <div className="righthalf-top">
              <div className="righthalf-top-mangatitle">
                {mangaDetails.imageTitle}
              </div>

              <div className="righthalf-top-mangaauthor">
                Author: {mangaDetails.imageAuthor}
              </div>

              <div className="righthalf-top-description">
                <div className="righthalf-top-synopsis">
                  Synopsis:
                </div>
                <div className="righthalf-top-desc">
                  &emsp;&emsp;{mangaDetails.description}
                </div>
              </div>
            </div>

            
              <div className="righthalf-bottom">
                <div className="righthalf-mangaprice">
                  {Product.defaultCurrency} {mangaDetails.imagePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="righthalf-buybutton">Buy Now</div>
                
                <Link
                  to="/cart"
                  state={mangaDetails}
                  className="righthalf-addtocartbutton"
                  onClick={handleLinkClick}
                  style={{ textDecoration: 'none' }}
                >
                  <div>Add to Cart</div>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
