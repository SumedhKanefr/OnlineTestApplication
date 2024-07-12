import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './Quiz';
import Review from './Review';
import Result from './Result';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch questions from the public directory
    const fetchQuestions = async () => {
      const response = await fetch('/questions.json');
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <Link className="navbar-brand" to="/">Online Test App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Quiz</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/review">Review</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/result">Result</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Quiz questions={questions} setAnswers={setAnswers} />} />
          <Route path="/review" element={<Review answers={answers} setResult={setResult} />} />
          <Route path="/result" element={<Result result={result} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;