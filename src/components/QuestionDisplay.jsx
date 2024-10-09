import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuestionDisplay = ({ onFinish }) => {
  const location = useLocation();
  const { questions = [], timeLimit } = location.state || {};
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [remainingTime, setRemainingTime] = useState(timeLimit * 60); // Initialize remaining time in seconds

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleFinish(); // Finish quiz when timer reaches zero
            return 0;
          }
          return prevTime - 1; // Decrease the remaining time in seconds
        });
      }, 1000); // Update every second

      return () => clearInterval(timer); // Clean up on unmount
    }
  }, [remainingTime]);

  const handleAnswerChange = (event) => {
    const selectedAnswer = event.target.value;
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentIndex] = selectedAnswer;
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleFinish = () => {
    const correctAnswers = questions.map((q, index) => ({
      question: q.question,
      statement: q.statement,
      conclusion: q.conclusion,
      userAnswer: answers[index],
      correctAnswer: q.answer,
    }));

    const score = correctAnswers.filter(item => item.userAnswer === item.correctAnswer).length;

    onFinish({ score, correctAnswers });

    navigate('/results', { state: { score, correctAnswers } });
  };

  // Calculate minutes and seconds for display
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="bg-black flex flex-col md:flex-row items-center justify-center h-screen bg-gray-900 p-8">
      <div className="bg-gray-800 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full mb-6 md:mb-0 h-auto flex flex-col">
  <div className="mb-4">
    <p className="text-lg font-semibold">
      Time Remaining: {minutes}m {seconds.toString().padStart(2, '0')}s
    </p>
  </div>
  {questions.length > 0 ? (
    <>
      <div className="mb-4 flex-grow overflow-y-auto">
        <p className="font-semibold">{questions[currentIndex].question}</p>
        {questions[currentIndex].options.map((option, i) => (
          <div key={i} className="flex items-center mb-2">
            <input
              type="radio"
              name={`question-${currentIndex}`}
              value={option}
              checked={answers[currentIndex] === option}
              onChange={handleAnswerChange}
              className="mr-2"
            />
            <label>{option}</label>
          </div>
        ))}
        {questions[currentIndex].statements && questions[currentIndex].statements.length > 0 && (
          <div className="mb-4">
            <p className="font-medium">Statements:</p>
            <ul>
              {questions[currentIndex].statements.map((statement, index) => (
                <li key={index}>{statement}</li>
              ))}
            </ul>
          </div>
        )}
        {questions[currentIndex].conclusions && questions[currentIndex].conclusions.length > 0 && (
          <div className="mb-4">
            <p className="font-medium">Conclusions:</p>
            <ul>
              {questions[currentIndex].conclusions.map((conclusion, index) => (
                <li key={index}>{conclusion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-gray-600 text-white py-2 px-4 rounded"
        >
          Previous
        </button>
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleFinish}
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </div>
    </>
  ) : (
    <p>No questions available.</p>
  )}
</div>

      {/* New Box for Question Numbers */}
      <div className="bg-gray-800 border border-gray-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full ml-10 mb-6 md:mb-0 h-96">
        <h2 className="text-xl font-semibold mb-2">Questions</h2>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600 transition overflow-y-auto text-center ${currentIndex === index ? 'bg-blue-500' : ''}`}
            >
              <p className="text-sm">{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
