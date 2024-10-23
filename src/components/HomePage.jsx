import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const topicSections = [
    {
      section: "Abstract Reasoning",
      topics: ["Number and Letter Series", "Odd Man Out", "Coding Decoding", "Series Completion"],
    },
    {
      section: "Critical Reasoning",
      topics: ["Data Sufficiency", "Statement Conclusion", "Syllogism"],
    },
    {
      section: "English",
      topics: ["Synonyms and Antonyms", "Error Detection", "Para Jumbles", "Sentence Improvement"],
    },
  ];

  const handleTopicChange = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleStartQuiz = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/profile'); 
      return;
    }

    setError('');
    try {
      const response = await fetch('https://bookish-spoon-production.up.railway.app/api/questions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTopics,
          numberOfQuestions,
          timeLimit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const questionsData = await response.json();
      navigate('/quiz-description', { state: { questions: questionsData.questions, timeLimit: questionsData.timeLimit } });
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div className="flex flex-col items-center bg-black bg-gray-900 text-white h-screen-full p-8">
      <h1 className="text-4xl font-bold mb-6">One Stop Solution for Your Placement Needs.</h1>
      
      {error && <div className="mb-4 text-red-500">{error}</div>} {/* Display error message */}
      
      <div className="bg-black bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 mb-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Select Topics</h2>
        {topicSections.map(section => (
          <div key={section.section} className="mb-4">
            <h3 className="text-lg font-medium">{section.section}</h3>
            {section.topics.map(topic => (
              <div key={topic} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicChange(topic)}
                  className="mr-2"
                />
                <label>{topic}</label>
              </div>
            ))}
          </div>
        ))}
        
        <div className="mb-4">
          <label className="block mb-1">
            Number of Questions:
            <input
              type="number"
              value={numberOfQuestions}
              onChange={e => setNumberOfQuestions(Math.max(1, Math.min(100, e.target.value)))}
              min="1"
              max="100"
              className="ml-2 p-1 border border-gray-600 rounded text-white bg-gray-700"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            Time Limit (minutes):
            <input
              type="number"
              value={timeLimit}
              onChange={e => setTimeLimit(Math.max(1, e.target.value))}
              min="10"
              className="ml-2 p-1 border border-gray-600 rounded text-white bg-gray-700"
            />
          </label>
        </div>
        
        <button
          onClick={handleStartQuiz}
          disabled={selectedTopics.length === 0}
          className={`w-full p-2 rounded ${selectedTopics.length === 0 ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
