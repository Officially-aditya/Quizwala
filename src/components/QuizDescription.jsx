import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const QuizDescription = () => {
  const location = useLocation();
  const { questions = [], timeLimit } = location.state || {};

  const navigate = useNavigate();

  const handleStartQuiz = () => {
      navigate('/quiz', { state: { questions, timeLimit } });
  };

  return (
    <div className="bg-black flex items-center justify-center h-screen bg-gray-900 p-8">
      <div className="bg-grey bg-black-500 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6">Description of the Quiz</h2>
        <ul className="list-disc list-inside mb-6 text-left">
          <li>This quiz is a series of questions that will test your knowledge on topics selected by you.</li>
          <li>Each question will have four possible answers, and you will have to choose the correct answer.</li>
          <li>Each question consists of 1 mark and there is no negative marking.</li>
          <li>Results will be shown at the end of the Quiz.</li>
          <li>Right clicks are not allowed.</li>
          <li>Tab changes are not allowed.</li>
          <li>Your test will be terminated if you click on the right click button 3 times.</li>
          <li>Your test will be terminated if you change tab 2 times.</li>
          <li>Best of Luck!</li>
        </ul>
        <button
          onClick={handleStartQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizDescription;
