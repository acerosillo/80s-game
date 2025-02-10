import React from 'react';

interface ResultsProps {
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  resetGame: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, correctAnswers, incorrectAnswers, resetGame }) => {
  return (
    <div>
      <h2>Game Over!</h2>
      <p>Final Score: {score}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      <button onClick={resetGame} style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}>
        Play Again
      </button>
    </div>
  );
};

export default Results;
