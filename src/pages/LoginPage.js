// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import axios from '../utils/api';
// import '../assets/css/login.css';
// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useAuth(); 
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         if (!username || !password) {
//             setError('Both username and password are required');
//             return;
//         }

//         try {
//             const response = await axios.post('/auth/login', null, {
//                 params: { username, password },
//                 withCredentials: true, // Ensure cookies are included
//             });

//             console.log('Login successful:', response.data);

//             const userData = {
//                 id: response.data.user_id,
//                 role: response.data.role,
//                 name: username,
//             };

//             login(userData);
//             localStorage.setItem('user_id', response.data.user_id); 
//             console.log('Navigating to dashboard...');
//             navigate('/dashboard'); 
//         } catch (err) {
//             console.error('Login error:', err.response?.data);
//             setError(err.response?.data?.detail || 'Login failed');
//         }
//     };

//     return (
//         <div className="login-page">
//             <h2>Login</h2>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//             {error && <p className="error">{error}</p>}
//         </div>
//     );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from '../utils/api';
import '../assets/css/login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // New state for role selection
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Both username and password are required');
            return;
        }

        try {
            const response = await axios.post('/auth/login', null, {
                params: { username, password, role }, // Include role in the request
                withCredentials: true, // Ensure cookies are included
            });

            console.log('Login successful:', response.data);

            const userData = {
                id: response.data.user_id,
                role: response.data.role,
                name: username,
            };

            login(userData);
            localStorage.setItem('user_id', response.data.user_id);
            console.log('Navigating to dashboard...');
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err.response?.data);
            setError(err.response?.data?.detail || 'Login failed');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="role-selector">
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === 'user'}
                        onChange={() => setRole('user')}
                    />
                    User
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={() => setRole('admin')}
                    />
                    Admin
                </label>
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
