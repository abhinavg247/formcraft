//lib
import { useCallback } from "react";

//components
import { Button } from "@mui/material";

//styles
import styles from "./AddQuestion.module.css";

//types
import { AddQuestionProps } from "../../../../../../types";

export const AddQuestion = ({ type, onAddQuestion }: AddQuestionProps) => {
  const handleButtonClick = useCallback(() => {
    onAddQuestion(type);
  }, [onAddQuestion, type]);

  return (
    <Button
      onClick={handleButtonClick}
      className={styles["add-question-button"]}
      variant="contained"
    >
      Add {type} Question
    </Button>
  );
};
