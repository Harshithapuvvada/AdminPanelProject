import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../features/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login');
        } else {
            alert('Checkout functionality coming soon!');
            dispatch(clearCart());
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2);

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty <Link to="/">Go Back</Link></p>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                </div>
                                <div style={{ flex: 2 }}>
                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </div>
                                <div style={{ flex: 1 }}>${item.price}</div>
                                <div style={{ flex: 1 }}>
                                    <button onClick={() => removeFromCartHandler(item._id)} className="btn-danger" style={{ padding: '0.25rem 0.5rem' }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary" style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee' }}>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}) items</h2>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${subtotal}</p>
                        <button
                            type="button"
                            className="btn btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
