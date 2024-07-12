import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Review({ answers, setResult }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/questions.json');
      const questionsData = await response.json();
      setQuestions(questionsData);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const evaluate = () => {
      let score = 0;
      for (const question of questions) {
        if (answers[question.id] === question.correctAnswer) {
          score++;
        }
      }
      const result = { score, total: questions.length };
      setResult(result);
      localStorage.setItem('quizResult', JSON.stringify(result));
    };

    if (questions.length > 0) {
      evaluate();
    }
  }, [questions, answers, setResult]);

  const handleSubmitReview = () => {
    navigate('/result');
  };

  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Review Your Answers</h1>
      <div className="list-group">
        {questions.map((question) => (
          <div key={question.id} className="list-group-item">
            <h5>{question.text}</h5>
            <p>
              <strong>Your Answer:</strong> {answers[question.id] || "No answer selected"}
            </p>
            <p>
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleSubmitReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default Review;
