import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = ({ onFinish }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score = 0, correctAnswers = [], username, course, phone } = location.state || {};
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalQuestions = correctAnswers.length;
    const correctCount = correctAnswers.filter(item => item.userAnswer === item.correctAnswer).length;
    const incorrectCount = totalQuestions - correctCount;

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentQuestion = correctAnswers[currentIndex];

    const handleFinish = () => {
        const results = {
            score,
            totalQuestions,
            correctCount,
            incorrectCount,
            username,
            course,
            phone,
        };
        onFinish(results);
        navigate('/dashboard');
    };

    return (
        <div className="bg-black flex items-center justify-center h-screen bg-gray-900 p-8">
            <div className="bg-gray-800 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-4">Your Results</h2>
                <p className="text-lg">
                    <strong>Score:</strong> {score} / {totalQuestions}
                </p>
                <p className="text-lg">
                    <strong>Correct Answers:</strong> {correctCount}
                </p>
                <p className="text-lg">
                    <strong>Incorrect Answers:</strong> {incorrectCount}
                </p>
                <div className="mt-4">
                    <p className="text-sm text-gray-400">
                        Thank you for participating in the quiz! We hope you enjoyed it.
                    </p>
                </div>

                {/* Display current question */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Question {currentIndex + 1}:</h3>
                    <p className="font-semibold">{currentQuestion.question}</p>
                    <div className="flex items-center mb-1">
                        <input 
                            type="radio" 
                            name={`question-${currentIndex}`} 
                            checked={currentQuestion.userAnswer === currentQuestion.correctAnswer}
                            readOnly
                            className="mr-2" 
                        />
                        <label className="text-gray-300">{currentQuestion.userAnswer || "Not Answered"}</label>
                    </div>
                    <p className="text-gray-400"><strong>Correct Answer:</strong> {currentQuestion.correctAnswer}</p>
                    <p className={`text-gray-400 ${currentQuestion.userAnswer === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                        {currentQuestion.userAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect!"}
                    </p>
                </div>

                <div className="flex justify-between mt-4">
                    <button 
                        onClick={handlePrevious} 
                        disabled={currentIndex === 0} 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                    >
                        Previous
                    </button>
                    {currentIndex === totalQuestions - 1 ? (
                        <button 
                            onClick={handleFinish} 
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200"
                        >
                            Finish
                        </button>
                    ) : (
                        <button 
                            onClick={handleNext} 
                            disabled={currentIndex === totalQuestions - 1} 
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Results;
