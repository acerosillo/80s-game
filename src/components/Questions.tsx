import React from 'react';

interface QuestionProps {
  question: {
    index: number;
    total: number;
    image: string;
    options: string[];
  };
  checkAnswer: (option: string) => void;
  disabled: boolean; // Add disabled prop
}

const Questions: React.FC<QuestionProps> = ({ question, checkAnswer, disabled }) => {
  return (
    <div>
      <p>Image {question.index + 1} of {question.total}</p>
      <img
        src={question.image}
        alt="Cartoon"
        className="image-quiz"
      />
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => checkAnswer(option)}
            disabled={disabled} // Disable buttons when disabled is true
            style={{ padding: "10px", margin: "5px", cursor: disabled ? "not-allowed" : "pointer" }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
