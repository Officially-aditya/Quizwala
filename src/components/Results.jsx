import React from "react";

const Results = ({ score }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-3xl font-bold mb-4">Your Results</h2>
                <p className="text-lg">
                    <strong>Score:</strong> {score}
                </p>
                <div className="mt-4">
                    <p className="text-sm text-gray-400">
                        Thank you for participating in the quiz! We hope you enjoyed it.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Results;
