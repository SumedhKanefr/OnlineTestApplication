import React, { useEffect, useState } from 'react';

function Result({ result }) {
  const [storedResult, setStoredResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      setStoredResult(JSON.parse(savedResult));
    }
  }, []);

  const finalResult = result || storedResult;

  if (!finalResult) {
    return <div className="alert alert-warning" role="alert">No results found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Result</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Your Score</h5>
          <p className="card-text">
            You scored {finalResult.score} out of {finalResult.total}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
