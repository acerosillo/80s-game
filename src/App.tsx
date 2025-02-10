import { useState } from "react";
import Questions from "./components/Questions";
import Results from "./components/Results";

// Define types for the cartoons array
interface Cartoon {
  image: string;
  correct: string;
  options: string[];
}

const cartoons: Cartoon[] = [
  { image: "cartoon1.jpg", correct: "SpongeBob SquarePants", options: ["SpongeBob SquarePants", "Adventure Time", "Rick and Morty", "The Simpsons"] },
  { image: "cartoon2.jpg", correct: "Rick and Morty", options: ["Family Guy", "Rick and Morty", "South Park", "BoJack Horseman"] },
  { image: "cartoon3.jpg", correct: "The Simpsons", options: ["The Simpsons", "Futurama", "American Dad", "Gravity Falls"] }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const checkAnswer = (selected: string): void => {
    if (selected === cartoons[currentQuestion].correct) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    nextQuestion();
  };

  const nextQuestion = (): void => {
    if (currentQuestion + 1 < cartoons.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Guess the Cartoon!</h1>
      {!gameOver ? (
        <Questions 
          question={{
            index: currentQuestion,
            total: cartoons.length,
            image: cartoons[currentQuestion].image,
            options: cartoons[currentQuestion].options
          }}
          checkAnswer={checkAnswer}
        />
      ) : (
        <Results 
          score={score} 
          correctAnswers={correctAnswers} 
          incorrectAnswers={incorrectAnswers} 
          resetGame={resetGame} 
        />
      )}
    </div>
  );
}
