import React from 'react';
import { useLocation } from 'react-router-dom';

const QuestionDisplay = () => {
  const location = useLocation();
  const { questions = [] } = location.state || {};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 p-8">
      <div className="bg-gray-800 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              {q.options.map((option, i) => (
                <div key={i} className="flex items-center mb-2">
                  <input type="radio" name={`question-${index}`} value={option} className="mr-2" />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
