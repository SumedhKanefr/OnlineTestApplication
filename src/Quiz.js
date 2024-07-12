import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz({ questions, setAnswers }) {
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    setAnswers(userAnswers);
    navigate('/review');
  };

  return (
    <div>
      <h2 className="mb-4">Quiz</h2>
      {questions.map((question) => (
        <div className="card mb-3" key={question.id}>
          <div className="card-body">
            <h4 className="card-title">{question.text}</h4>
            {question.options.map((option) => (
              <div className="form-check" key={option}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={() => handleChange(question.id, option)}
                />
                <label className="form-check-label">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
    </div>
  );
}

export default Quiz;
