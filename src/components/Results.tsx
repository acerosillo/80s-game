import React from 'react';

interface ResultsProps {
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  resetGame: () => void;
}

const Results: React.FC<ResultsProps> = ({ correctAnswers, incorrectAnswers, resetGame }) => {
  const totalQuestions = correctAnswers + incorrectAnswers;

  return (
    <div className="results-wrapper">
      <h2>Game Over</h2>
      {/* <p>Final Score: {score}</p> */}
      <p>You scored : {correctAnswers} / {totalQuestions}</p>
      {/* <p>Incorrect Answers: {incorrectAnswers}</p> */}
      <button onClick={resetGame} style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}>
        Play Again
      </button>
    </div>
  );
};

export default Results;
