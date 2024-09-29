import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Authentication with backend
        onLogin(username);
        navigate('/profile'); // Navigate to profile after login (adjust as needed)
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 p-8">
            <div className="bg-black-500 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg mb-2">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
