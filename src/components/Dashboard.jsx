import React from "react";

const Dashboard = ({ results }) => {
    return (
        <div className="flex flex-col items-center bg-gray-900 text-white h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Last Quiz Info</h2>
                <h3 className="text-xl font-medium mb-2">Correct:</h3>
                <p className="text-lg font-medium mb-4">0</p>
                <h3 className="text-xl font-medium mb-2">Incorrect:</h3>
                {/* You can replace this with a dynamic count later */}
                <p className="text-lg font-medium mb-4">0</p>
                <p className="mb-4">{results.length} quizzes attempted</p>

                <h3 className="text-xl font-medium mb-2"></h3>
            </div><br />
            <h2 className="text-3xl font-semibold mb-4">Quiz Results</h2>
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-medium mb-2">Name: </h2>
                <h3 className="text-xl font-medium mb-2">Course: </h3>
                <h3 className="text-xl font-medium mb-2">Phone: </h3>
            </div>
        </div>
    );
};

export default Dashboard;
