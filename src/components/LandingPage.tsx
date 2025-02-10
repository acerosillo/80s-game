import { useState } from "react";
import App from "../App";
import '../styles/main.scss';

export default function LandingPage() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="landing-page">
      {!quizStarted ? (
        <div className="landing-content">
          <h1>Welcome to the 80s Cartoon Trivia!</h1>
          <p>Test your knowledge of classic animated shows from the 80s. Do you remember your childhood favorites?</p>


        <section className="landing-rules">
          <h3>Rules : </h3>
          <ul>
            <li>You have 10 seconds to guess the correct answer</li>
            <li>You have to click proceed to confirm answer</li>
            <li>You will have 10 images to complete.</li>
          </ul>

          <p>Good Luck!!</p>
          </section>
          <button className="start-button" onClick={() => setQuizStarted(true)}>
            Start Quiz
          </button>
        </div>
      ) : (
        <App />
      )}
    </div>
  );
}