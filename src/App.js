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
import SignUp from './components/SignUp';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState([]); // Changed to an array

  const handleLogin = (username) => {
    setUser({ username });
  };

  const handleQuizResults = (result) => {
    setQuizResults((prevResults) => [...prevResults, result]); 
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePageWithNavigate />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard results={quizResults} />} />
        <Route path="/results" element={<Results onFinish={handleQuizResults} />} />
        <Route path="/quiz-description" element={<QuizDescription />} />
        <Route path="/quiz" element={<QuestionDisplay onFinish={handleQuizResults} />} />
        <Route path="/signup" element={<SignUp signup={true} />} />
      </Routes>
    </Router>
  );
};

const HomePageWithNavigate = () => {
  const navigate = useNavigate(); 

  const handleStartQuiz = (questions, timeLimit) => {
      navigate('/quiz-description', { state: { questions, timeLimit } });
  };

  return (
      <HomePage onStartQuiz={handleStartQuiz} />
  );
};

export default App;
