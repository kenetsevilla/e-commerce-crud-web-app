import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './stylesheets/SearchResult.css';
import TopBarLine from '../components/TopBarLine.jsx';
import SecondHeader from '../components/Header2.jsx';
import BuyMangaDisplay from '../components/BuyMangaDisplay.jsx';
import Product from '../classes/Product.js';

function SearchResult() {
    const location = useLocation();
    const loggedInAccountName = location.state?.loggedInAccountName || '';
    const query = new URLSearchParams(location.search).get('query') || ''; // Extract query from URL

    const [searchQuery, setSearchQuery] = useState(query); // Initialize with query from URL
    const [filteredProducts, setFilteredProducts] = useState(Product.products);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(Product.products); // Show all products if no query
        } else {
            const queryLower = searchQuery.toLowerCase();
            const filtered = Product.products.filter((product) => {
                const titleMatch = product.title?.toLowerCase().includes(queryLower);
                const authorMatch = product.author?.toLowerCase().includes(queryLower);
                return titleMatch || authorMatch;
            });
            setFilteredProducts(filtered);
        }
    }, [searchQuery]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const query = event.target.value.trim();
            setSearchQuery(query); // Update the search query when Enter is pressed
        }
    };

    const handleIconClick = () => {
        const query = searchQuery.trim();
        setSearchQuery(query); // Update the search query when the icon is clicked
    };

    const createBuyMangaDisplay = (imageNum, imgTitle, imageAuthor, imagePrice, imageY, containerWidth, containerHeight, containerMargin, containerBorderRadius, description, stockLeft, goToPage, returnToPage) => (
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
        <div className="searchres-container">
            <TopBarLine />
            
            <div className="searchres-header">
                <SecondHeader returnToPage="/" keepState={location.state} />
                <div className="searchres-searchbox">
                    <input
                        type="text"
                        placeholder="Search for items..."
                        className="textbox"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update query as user types
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

            <div className="searchres-body">
                {filteredProducts.length === 0 ? (
                    <div className='nosearchresults'>No items matched the search query.</div>
                ) : (
                    filteredProducts.map((product) =>
                        createBuyMangaDisplay(
                            product.productID,
                            product.title,
                            product.author,
                            product.price,
                            '-35px',
                            '19%',
                            '70%',
                            '2%',
                            '10px',
                            product.description,
                            product.quantity,
                            '/productdetail',
                            '/'
                        )
                    )
                )}
            </div>

            <div className="searchres-container-barline"></div>
        </div>
    );
}

export default SearchResult;
