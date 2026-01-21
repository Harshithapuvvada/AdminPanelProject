import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, addProduct, deleteProduct } from '../features/productsSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { items: products, status, error } = useSelector((state) => state.products);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
    });

    const { name, description, price, category, imageUrl } = formData;

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
        } else {
            dispatch(fetchProducts());
        }
    }, [user, navigate, dispatch]);

    useEffect(() => {
        if (status === 'failed' && error) {
            alert(error);
        }
    }, [status, error]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct({ name, description, price, category, imageUrl }));
        setFormData({ name: '', description: '', price: '', category: '', imageUrl: '' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <section className="product-form-section" style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
                <h2>Add New Product</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={description} onChange={onChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" name="price" value={price} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" name="category" value={category} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" name="imageUrl" value={imageUrl} onChange={onChange} required placeholder="https://..." />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </section>

            <section className="product-list-section">
                <h2>Product List</h2>
                {status === 'loading' ? <p>Loading...</p> : (
                    <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>ID</th>
                                <th style={{ textAlign: 'left' }}>Name</th>
                                <th style={{ textAlign: 'left' }}>Price</th>
                                <th style={{ textAlign: 'left' }}>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td>{product._id.substring(20, 24)}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn-danger"
                                            style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;
