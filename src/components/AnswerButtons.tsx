import React from "react";

import { makeStyles } from "tss-react/mui";
import { Button } from "@mui/material";
import { questionValidator } from "../utils";
import { blue, green, purple } from "@mui/material/colors";

const useStyles = makeStyles<{ correct: boolean; userAnswered: boolean }>()(
  (theme, { correct, userAnswered }) => ({
    answerButton: {
      fontFamily: "Catamaran",
      backgroundColor: blue[300],

      background: userAnswered
        ? correct
          ? "lightgreen !important"
          : "red !important"
        : undefined,
      color: "white !important",
      "&:hover": {
        backgroundColor: blue[800],
      },
    },
  })
);

type ButtonWrapperProps = {
  answer: string;
  correct: boolean;
  userAnswered: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AnswerButtons = (props: ButtonWrapperProps) => {
  const { answer, correct, userAnswered, onClick } = props;
  const { classes } = useStyles({ correct, userAnswered });

  return (
    <Button
      className={classes.answerButton}
      variant="contained"
      disabled={userAnswered}
      value={answer}
      onClick={onClick}
    >
      {questionValidator(answer)}
    </Button>
  );
};
