import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const dispatch = useDispatch();
    const { items: products, status } = useSelector((state) => state.products);

    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        dispatch(fetchProducts({ keyword, category }));
    }, [dispatch, keyword, category]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchProducts({ keyword, category }));
    };

    return (
        <div className="home-page">
            <div className="filter-bar" style={{ padding: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{ padding: '0.5rem' }}
                    />
                    <button type="submit">Search</button>
                </form>
                <select onChange={(e) => setCategory(e.target.value)} style={{ padding: '0.5rem' }}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home">Home</option>
                    <option value="Books">Books</option>
                </select>
            </div>

            {status === 'loading' && <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading products...</p>}
            {status === 'failed' && <p style={{ textAlign: 'center', marginTop: '2rem' }}>Error loading products.</p>}

            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            {products.length === 0 && status === 'succeeded' && (
                <p style={{ textAlign: 'center', color: '#6b7280' }}>No products found. Login as Admin to add some!</p>
            )}
        </div>
    );
};

export default HomePage;
