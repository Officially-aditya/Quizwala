import React, { useState } from 'react';

const HomePage = ({ onStartQuiz }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(30);

  const topicSections = [
    {
      section: "Abstract Reasoning",
      topics: ["Number & Letter Series", "Odd man Out", "Analogies", "Coding Decoding", "Visual Reasoning"],
    },
    {
      section: "Critical Reasoning",
      topics: ["Data Arrangement", "Argument & Assumptions", "Data Sufficiency", "Syllogism"],
    },
    {
      section: "English",
      topics: ["Synonyms & Antonyms", "Error Detection", "Reading Comprehension", "Para Jumbles", "Sentence Completion", "Sentence Improvemnet"],
    },
  ];

  const handleTopicChange = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleStartQuiz = () => {
    onStartQuiz(selectedTopics, numberOfQuestions, timeLimit);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white h-screen-full p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz App</h1>
      
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 mb-6 w-full max-w-md">
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
              onChange={e => setNumberOfQuestions(e.target.value)}
              min="1"
              className="ml-2 p-1 border border-gray-600 rounded text-white bg-gray-700" // Added text and background color
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-1">
            Time Limit (seconds):
            <input
              type="number"
              value={timeLimit}
              onChange={e => setTimeLimit(e.target.value)}
              min="10"
              className="ml-2 p-1 border border-gray-600 rounded text-white bg-gray-700" // Added text and background color
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
