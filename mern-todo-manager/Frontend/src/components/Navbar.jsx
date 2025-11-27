import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaSignOutAlt, FaTasks } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{
            background: 'var(--card-bg)',
            borderBottom: '1px solid var(--border)',
            padding: '1rem 0',
            marginBottom: '2rem'
        }}>
            <div className="container flex justify-between items-center">
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                    <FaTasks /> TaskManager
                </Link>
                <div className="flex gap-2 items-center">
                    {user ? (
                        <>
                            <span style={{ color: 'var(--text-muted)', marginRight: '1rem' }}>Hello, {user.name}</span>
                            <button onClick={logout} className="btn btn-danger">
                                <FaSignOutAlt style={{ marginRight: '0.5rem' }} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn" style={{ color: 'var(--text-main)' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
