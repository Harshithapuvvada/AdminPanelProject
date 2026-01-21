import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    // Calculate total quantity safely
    const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0;

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                ShopMax
            </Link>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/cart" className="nav-link">
                    Cart ({cartCount})
                </Link>

                {user ? (
                    <>
                        <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Hi, {user.name}</span>
                        {user.isAdmin && (
                            <Link to="/admin" className="nav-link" style={{ color: 'red' }}>Admin Panel</Link>
                        )}
                        <button className="btn-logout" onClick={onLogout} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'black', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
