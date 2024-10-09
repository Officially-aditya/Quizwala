import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://bookish-spoon-production.up.railway.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
            console.log(data.message); 
            localStorage.setItem('token', data.token); 
            navigate('/'); 
        } catch (error) {
            console.error(error);
            setError(error.message); 
        }
    };

    return (
        <div className="bg-black flex items-center justify-center h-screen bg-gray-900 p-8">
            <div className="bg-grey border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6">Log In</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>} 
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Log In
                    </button>
                </form>
                <br />
                <div className="text-center text-gray-400">
                    Don't have an account? <a href="/signup" className="text-blue-400">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
