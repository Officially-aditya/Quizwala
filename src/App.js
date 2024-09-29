import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import QuizDescription from './components/QuizDescription';
import QuestionDisplay from './components/QuestionDisplay';
import Header from './components/Header';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleLogin = (username) => {
    setUser({ username });
  };

  const handleQuizResults = (score) => {
    setQuizResults([...quizResults, score]);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePageWithNavigate />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard results={quizResults} />} />
        <Route path="/results" element={<Results score={55} />} />
        <Route path="/quiz-description" element={<QuizDescription description="This is a sample quiz." onStartQuiz={() => {/* Start quiz logic */}} />} />
        <Route path="/quiz" element={<QuestionDisplay questions={questions} />} />
      </Routes>
    </Router>
  );
};

// Separate component to handle navigation
const HomePageWithNavigate = () => {
  const navigate = useNavigate(); // Call useNavigate here

  return (
    <HomePage onStartQuiz={() => navigate('/quiz-description')} />
  );
};

export default App;
