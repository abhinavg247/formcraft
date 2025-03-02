//lib
import { useCallback } from "react";

//components
import { Button } from "@mui/material";

//types
import { AddQuestionProps } from "../../../../../../types";

export const AddQuestion = ({ type, onAddQuestion }: AddQuestionProps) => {
  const handleButtonClick = useCallback(() => {
    onAddQuestion(type);
  }, [onAddQuestion, type]);

  return (
    <Button onClick={handleButtonClick} variant="contained">
      Add {type} Question
    </Button>
  );
};
