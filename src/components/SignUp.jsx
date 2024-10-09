import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [course, setCourse] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(''); 
    const navigate = useNavigate();

    const trustedDomains = ["gmail.com", "hotmail.com", "protonmail.com", "outlook.com"];

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domain = email.split('@')[1];

        if (!emailRegex.test(email)) {
            return "Invalid email format";
        }

        if (!trustedDomains.includes(domain)) {
            return "Email must be from a trusted domain (e.g., gmail.com, hotmail.com)";
        }

        return null; // No errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        } else {
            setEmailError(''); 
        }

        try {
            const response = await fetch('https://bookish-spoon-production.up.railway.app/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, course }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Signup failed');
            }

            const data = await response.json();
            console.log(data.message);
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-black flex items-center justify-center h-screen bg-gray-900 p-8">
            <div className="bg-grey bg-black-500 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                {emailError && <div className="mb-4 text-red-500">{emailError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg mb-2">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2"
                            required
                        />
                    </div>
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
                    <div className="mb-4">
                        <label className="block text-lg mb-2">Course:</label>
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
                    >
                        Sign Up
                    </button>
                </form>
                <br />
                <div className="text-center text-gray-400">
                    Already have an account? <a href="/profile" className="text-blue-400">Log in</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
