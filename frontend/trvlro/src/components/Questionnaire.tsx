import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Questionnaire.module.css";
import { AuthContext } from "../context/AuthContext";
import { updateUserKnowledge } from "../utils/API";

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "What type of traveler are you?",
    options: ["Adventure seeker", "Relaxation enthusiast", "Culture explorer"],
  },
  {
    question: "Which destination do you prefer?",
    options: ["Beach", "Mountains", "City"],
  },
  {
    question: "What is your preferred mode of transportation?",
    options: ["Plane", "Car", "Train"],
  },
  {
    question: "Do you enjoy alcohol?",
    options: ["Yes", "No", "Sometimes"],
  },
];

const Questionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [hasAnsweredInitialQuestions, setHasAnsweredInitialQuestions] =
      useState(false);
  useEffect(() => {
    const hasAnswered =
      localStorage.getItem("hasAnsweredInitialQuestions") === "true";
    setHasAnsweredInitialQuestions(hasAnswered);
  }, []);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isOptionSelected = selectedOption !== null;
    
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    setAnswers(
      new Map(answers.set(questions[currentQuestionIndex].question, option))
    );
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    updateUserKnowledge(currentUser?.uid ?? "", answers);
    setIsSubmitted(true);
    localStorage.setItem("hasAnsweredInitialQuestions", "true");
    setHasAnsweredInitialQuestions(true);
  };

  const handleAnswerAgain = () => {
    localStorage.setItem("hasAnsweredInitialQuestions", "false");
    setHasAnsweredInitialQuestions(false);
    setQuizStarted(false);
    setAnswers(new Map());
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  if (hasAnsweredInitialQuestions) {
    return (
      <div className={styles.questionnaireContainer}>
        <p className={styles.message}>Thank you for completing the questionnaire!</p>
        <button className={styles.button} onClick={handleAnswerAgain}>
          Answer Again
        </button>
      </div>
    );
  }

  if (!quizStarted) {
    return (
        <div className={styles.questionnaireContainer}>
            <p className={styles.message}><b>Help us get to know you! </b> We'd like you to answer a few questions so that we can recommend you the best places when travelling. </p>
            <p className={styles.message}><b>Privacy of your data: </b>{"We regard keeping your data secure as very important. You cannot be identified in any way by these answers. We do not keep your real name, or any other relevant data. These answers are used solely so that our algorithm can recommend you the best places when travelling."}</p>
        <p className={styles.message}><b>Use of external APIs: </b> While our AI Chat is kept in-house, on-premises, for the Travel Generation we do make a call to the OpenAI API, which we cannot guarantee the security of(OpenAI says they do not store the data though). We do not include any personal information in the API request, not even your email. </p>
            <button className={styles.button} onClick={handleStartQuiz}>
          Start
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={styles.questionnaireContainer}>
        Thank you for completing the questionnaire!
      </div>
    );
  }

  return (
    <div className={styles.questionnaireContainer}>
      <p className={styles.question}>
        Question {currentQuestionIndex + 1}/{questions.length}:{" "}
        {questions[currentQuestionIndex].question}
      </p>
      <div className={styles.options}>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <label className={styles.option} key={index}>
            <input 
              type="radio"
              name="answer"
              value={option}
              checked={option === selectedOption}
              onChange={() => handleAnswer(option)}
            />
            {option}
          </label>
        ))}
      </div>
      {!isLastQuestion && (
        <button className={styles.button} onClick={handleNextQuestion} disabled={!isOptionSelected}>
          Next
        </button>
      )}
      {isLastQuestion && (
        <button className={styles.button} onClick={handleSubmit} disabled={!isOptionSelected}>
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default Questionnaire;
