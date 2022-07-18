import React, { useState } from "react";

// components
import { QuestionCard } from "./components/QuestionCard";
import { Background } from "./components/Background";
//Types
import { Difficulty, fetchQuestionsFromAPI, QuestionState } from "./API";
//Styles
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { questionValidator } from "./utils";
import { PersonalizedButtons } from "./components/PersonalizedButtons";
import { Box } from "@mui/material";

const useStyles = makeStyles()({
  appContainer: {
    paddingTop: "30px",
    fontFamily: "Catamaran",
  },
  nextQuestion: {
    marginTop: "20px",
  },
  title: {
    fontFamily: ["Fascinate Inline", "cursive"].join(","),
  },
  startButton: {},
  score: {
    lineHeight: "0",
    fontFamily: "Catamaran",
    paddingTop: "20px",
  },
});

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setGameOver(false);
    setLoading(true);

    const newQuestions = await fetchQuestionsFromAPI(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = event.currentTarget.value;
      // check answer vs correct answer
      const correct = questions[questionNumber].correct_answer === answer;
      //Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      //save score for user answers
      const userAnswer = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setUserAnswers((prev) => [...prev, userAnswer]);
    }
  };
  console.log(userAnswers);
  console.log(questions);

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };
  const { classes } = useStyles();

  return (
    <>
      <Background />
      <Container className={classes.appContainer}>
        <Box textAlign="center">
          <Typography className={classes.title} align="center" variant="h1">
            Quiz Game
          </Typography>
          <Typography className={classes.score} align="center" variant="h6">
            {userAnswers.length === TOTAL_QUESTIONS ? "Totalscore:" : "Score:"}{" "}
            {score}{" "}
          </Typography>
          {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
            <PersonalizedButtons
              onClick={startQuiz}
              endIcon={<SendIcon />}
              variant="outlined"
            >
              Start
            </PersonalizedButtons>
          )}
          {loading && <p>Loading Questions...</p>}
          {!loading && !gameOver && (
            <QuestionCard
              questionNr={questionNumber + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questionValidator(questions[questionNumber].question)}
              answers={questions[questionNumber].answers}
              userAnswer={userAnswers && userAnswers[questionNumber]}
              onAnswerClick={checkAnswer}
            />
          )}
          {!loading &&
          !gameOver &&
          userAnswers.length === questionNumber + 1 &&
          questionNumber !== TOTAL_QUESTIONS - 1 ? (
            <PersonalizedButtons
              className={"nextQuestion"}
              onClick={nextQuestion}
            >
              Next Question
            </PersonalizedButtons>
          ) : null}
        </Box>
      </Container>
    </>
  );
}

export default App;
