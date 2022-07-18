import React from "react";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import { makeStyles } from "tss-react/mui";

import { Grid, Paper } from "@mui/material";
import { AnswerButtons } from "./AnswerButtons";
import { questionValidator } from "../utils";
import { AnswerObject } from "../App";

const useStyles = makeStyles()({
  paper: {
    marginTop: "2rem",
    padding: "1rem",
  },
  container: {
    maxWidth: "800px",
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    maxWidth: "100",
    fontFamily: "Catamaran",
  },
  answersGrid: {
    marginTop: "1rem",
    fontFamily: "Catamaran",
  },
});

interface QuestionCardProps {
  question: string;
  answers: string[];
  onAnswerClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

export const QuestionCard = (props: QuestionCardProps) => {
  const {
    question,
    answers,
    onAnswerClick,
    userAnswer,
    questionNr,
    totalQuestions,
  } = props;

  const { classes } = useStyles();
  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <p>
          Question: {questionNr} / {totalQuestions}
        </p>
        <Typography className={classes.question} variant="h4">
          {questionValidator(question)}
        </Typography>
        <Grid className={classes.answersGrid} container spacing={2}>
          {answers.map((answer) => (
            <Grid item xs={6} key={answer}>
              <AnswerButtons
                onClick={onAnswerClick}
                answer={answer}
                correct={userAnswer?.correctAnswer === answer}
                userAnswered={!!userAnswer}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};
