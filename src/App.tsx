import { useState, useEffect } from "react";
import Questions from "./components/Questions";
import Results from "./components/Results";

import './App.css'

// Define types for the cartoons array
interface Cartoon {
  image: string;
  correct: string;
  options: string[];
}

const cartoons: Cartoon[] = [
  { image: "./src/assets/images/cartoon1.jpg", correct: "Thundercats", options: ["Thundercats", "Masters of the Universe", "Teenage Mutant Ninja Turtles", "Voltron"] },
  { image: "./src/assets/images/cartoon2.jpg", correct: "Gummi Bears", options: ["Care Bears", "Gummi Bears", "Trolls", "Fraggle Rock"] },
  { image: "./src/assets/images/cartoon3.jpg", correct: "Tailspin", options: ["DuckTales", "Darkwing Duck", "Baloo's Jungle Book Adventures", "Tailspin"] }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(5); // Timer state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Track selected answer
  const [answerSelected, setAnswerSelected] = useState<boolean>(false); // Track if answer is selected
  const [message, setMessage] = useState<string>(""); // Message for no selection

  const checkAnswer = (selected: string): void => {
    setSelectedAnswer(selected);
    setAnswerSelected(true);
    setMessage(""); // Clear any previous message
  };

  const nextQuestion = (): void => {
    if (answerSelected) {
      if (selectedAnswer === cartoons[currentQuestion].correct) {
        setScore(score + 1);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }

      setSelectedAnswer(null); // Reset answer
      setAnswerSelected(false); // Reset selection state

      if (currentQuestion + 1 < cartoons.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameOver(true);
      }
    } else {
      setMessage("No answer selected. Please select an answer.");
    }
  };

  const resetGame = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setAnswerSelected(false);
    setMessage("");
  };

  // Timer effect for automatic question change after 5 seconds
  useEffect(() => {
    if (!gameOver) {
      // Reset the timeLeft for each question
      setTimeLeft(5);
      const countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            nextQuestion(); // Change to the next question when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Decrement every second

      return () => clearInterval(countdown); // Cleanup timer when component is re-rendered
    }
  }, [currentQuestion, gameOver]); // Run when currentQuestion changes

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Guess the Cartoon!</h1>

      {/* Render the timer only if the game is not over */}
      {!gameOver && (
        <div style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
          Time Left: {timeLeft}s
        </div>
      )}

      {!gameOver ? (
        <>
          <Questions 
            question={{
              index: currentQuestion,
              total: cartoons.length,
              image: cartoons[currentQuestion].image,
              options: cartoons[currentQuestion].options
            }}
            checkAnswer={checkAnswer}
          />

          {/* Display message if no answer is selected */}
          {message && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {message}
            </div>
          )}

          {/* Next Button */}
          <button 
            onClick={nextQuestion} 
            disabled={!answerSelected} // Disable the button if no answer is selected
            style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", cursor: answerSelected ? "pointer" : "not-allowed" }}
          >
            Next Question
          </button>
        </>
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
