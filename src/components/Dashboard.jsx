import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ results }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/profile')
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('https://bookish-spoon-production.up.railway.app/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Sent token for authentication
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // Token might be expired or invalid
                        localStorage.removeItem('token'); // Clear expired token
                        navigate('/profile'); 
                    } else {
                        console.log('Failed to fetch user data');
                        navigate('/profile');
                    }
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const lastQuizResult = results.length > 0 ? results[results.length - 1] : {};

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; 
    }

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/profile'); 
    };

    return (
        <div className="flex flex-col items-center bg-black bg-gray-900 text-white h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            {user && (
                <div className="bg-black bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">User Info</h2>
                    <h3 className="text-xl font-medium mb-2">Name: {user.name || "N/A"}</h3>
                    <h3 className="text-xl font-medium mb-2">Email: {user.email || "N/A"}</h3>
                    <h3 className="text-xl font-medium mb-2">Course: {user.course || "N/A"}</h3>
                </div>
            )}
            <br />
            <h2 className="text-3xl font-semibold mb-4">Last Quiz Info</h2>
            <div className="bg-black bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-medium mb-2">Correct:</h3>
                <p className="text-lg font-medium mb-4">{lastQuizResult.correctCount || 0}</p>
                <h3 className="text-xl font-medium mb-2">Incorrect:</h3>
                <p className="text-lg font-medium mb-4">{lastQuizResult.incorrectCount || 0}</p>
                <p className="mb-4">{results.length} quizzes attempted</p>
            </div>
            <br />
            <br />
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
                Log Out
            </button>
        </div>
    );
};

export default Dashboard;
