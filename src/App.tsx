import { useState, useEffect } from "react";
import Questions from "./components/Questions";
import Results from "./components/Results";

import './styles/main.scss';

interface Cartoon {
  image: string;
  correct: string;
  options: string[];
}

const cartoons: Cartoon[] = [
  { image: "/images/cartoon1.jpg", correct: "Thundercats", options: ["Thundercats", "Masters of the Universe", "Teenage Mutant Ninja Turtles", "Voltron"] },
  { image: "/images/cartoon2.jpg", correct: "Gummi Bears", options: ["Care Bears", "Gummi Bears", "Trolls", "Fraggle Rock"] },
  { image: "/images/cartoon3.jpg", correct: "Tailspin", options: ["DuckTales", "Darkwing Duck", "Baloo's Jungle Book", "Tailspin"] },
  { image: "/images/cartoon4.jpg", correct: "Dungeons and Dragons", options: ["Dragon's Lair", "Dungeons and Dragons", "BraveStarr", "He-Man"] },
  { image: "/images/cartoon5.jpg", correct: "M.A.S.K", options: ["M.A.S.K", "Knight Rider", "Centurions", "Jayce and the Wheeled Warriors"] },
  { image: "/images/cartoon6.jpg", correct: "Big Al", options: ["The Dukes of Hazzard", "Garfield and Friends", "Bobby's World", "Big Al"] },
  { image: "/images/cartoon7.jpg", correct: "Biker Mice From Mars", options: ["Biker Mice From Mars", "Street Sharks", "Mask Rider", "SilverHawks"] },
  { image: "/images/cartoon8.jpg", correct: "Mighty Mouse", options: ["Super Mouse", "Mighty Mouse", "Batfink", "Powerpuff Girls"] },
  { image: "/images/cartoon9.jpg", correct: "Centurions", options: ["Robotech", "Power Rangers", "Centurions", "Voltron"] },
  { image: "/images/cartoon10.jpg", correct: "Darkwing Duck", options: ["DuckTales", "Chip 'n Dale", "Animaniacs", "Darkwing Duck"] }
];

const CircleCountdown = ({ timeLeft }: { timeLeft: number }) => {
  const circleSize = 30; // Size of the circle
  const strokeWidth = 10; // Width of the wedges
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate the offset based on timeLeft and total time (5 seconds)
  const offset = circumference - (timeLeft / 5) * circumference;

  return (
    <svg width={circleSize} height={circleSize}>
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        stroke="green"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
        className="countdown-circle"
      />
    </svg>
  );
};


export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [disableOptions, setDisableOptions] = useState(false);

  // Load the wrong.mp3 sound
  const wrongSound = new Audio("/sounds/wrong.mp3");

  const checkAnswer = (selected: string): void => {
    if (!disableOptions) {
      setSelectedAnswer(selected);
      setAnswerSelected(true);
      setMessage("");
    }
  };

  const nextQuestion = (): void => {
    if (selectedAnswer === cartoons[currentQuestion].correct) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    
    setSelectedAnswer(null);
    setAnswerSelected(false);
    setDisableOptions(false);

    if (currentQuestion + 1 < cartoons.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(5); // Reset timer
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (!gameOver) {
      setTimeLeft(5);
      setDisableOptions(false);

      const countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setDisableOptions(true);

            // Ensure sound is loaded and play after the timer expires
            wrongSound.load();  // Preload the sound before playing
            wrongSound.play().catch(() => {
              console.log("Audio play failed");
            });

            // Auto select a wrong answer
            const wrongAnswers = cartoons[currentQuestion].options.filter(option => option !== cartoons[currentQuestion].correct);
            setSelectedAnswer(wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)]);
            setAnswerSelected(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [currentQuestion, gameOver]);

  return (
    <div className="quiz-bg">
      <div className="quiz-wrapper">
        <h1>80s Cartoon Trivia:</h1>
        <h3>How Well Do You Know Your Animated Classics?</h3>


        {!gameOver && (
          <div className="timer-left">
            <CircleCountdown timeLeft={timeLeft} />
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
              disabled={disableOptions} // Disable options when time runs out
            />

            {message && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {message}
              </div>
            )}

{timeLeft === 0 && (
  <button 
    onClick={nextQuestion} 
    className="nextButton unanswered"
  >
    Out of Time, Next
  </button>
)}

{answerSelected && timeLeft > 0 && (
  <button 
    onClick={nextQuestion} 
    className="nextButton answered"
  >
    Proceed
  </button>
)}


          </>
        ) : (
          <Results 
            score={score} 
            correctAnswers={correctAnswers} 
            incorrectAnswers={incorrectAnswers} 
            resetGame={() => {
              setCurrentQuestion(0);
              setScore(0);
              setCorrectAnswers(0);
              setIncorrectAnswers(0);
              setGameOver(false);
              setSelectedAnswer(null);
              setAnswerSelected(false);
              setMessage("");
              setDisableOptions(false);
              setTimeLeft(5);
            }}
          />
        )}
      </div>
    </div>
  );
}
