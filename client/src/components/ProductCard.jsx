import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="product-card">
            <img
                src={product.imageUrl || 'https://placehold.co/600x400?text=No+Image'}
                alt={product.name}
                className="product-image"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Error+Loading+Image'; }}
            />
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {product.description}
                </p>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <button onClick={handleAddToCart} className="btn">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
