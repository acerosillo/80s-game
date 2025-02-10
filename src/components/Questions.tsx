import React from 'react';

interface QuestionProps {
  question: {
    index: number;
    total: number;
    image: string;
    options: string[];
  };
  checkAnswer: (option: string) => void;
}

const Questions: React.FC<QuestionProps> = ({ question, checkAnswer }) => {
  return (
    <div>
      <p>Question {question.index + 1} of {question.total}</p>
      <img
        src={question.image}
        alt="Cartoon"
        style={{ width: "300px", border: "2px solid black" }}
      />
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => checkAnswer(option)}
            style={{ padding: "10px", margin: "5px", cursor: "pointer" }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
