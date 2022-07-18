import React from "react";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  background: {
    position: "fixed",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundImage: `url(${"./images/quiz-background.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    zIndex: -1,
  },
});
export const Background = () => {
  const { classes } = useStyles();
  return <div className={classes.background} />;
};
