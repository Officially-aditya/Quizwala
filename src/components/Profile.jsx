import React from "react";

const Profile = ({ user }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 p-8">
            <div className="bg-black-500 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6">User Profile</h2>
                <p className="text-lg mb-4">
                    <strong>Username:</strong> {user.username}
                </p>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Profile Details</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Member Since:</strong> {user.joinDate}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
