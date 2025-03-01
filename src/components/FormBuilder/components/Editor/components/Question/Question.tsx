import { ReactElement } from "react";

import { QuestionRendererProps } from "../../../../../../types";
import { AdditionalDetails } from "./components/AdditionalDetails";
import { BasicDetails } from "./components/BasicDetails";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Question.module.css";
import { useCallback } from "react";

export const QuestionRenderer = ({
  question,
  questionError,
  onRemoveQuestion,
  onQuestionTitleUpdate,
  onQuestionIsMandatoryUpdate,
  onQuestionHelpTextUpdate,
  onIsParagraphUpdate,
  onMinValueUpdate,
  onMaxValueUpdate,
  onOptionsAdd,
  onOptionsUpdate,
  onOptionsRemove,
}: QuestionRendererProps): ReactElement => {
  const handleRemoveQuestion = useCallback(() => {
    onRemoveQuestion(question.id);
  }, [onRemoveQuestion, question.id]);

  return (
    <Box className={styles.questionContainer}>
      <BasicDetails
        question={question}
        questionError={questionError}
        onQuestionTitleUpdate={onQuestionTitleUpdate}
        onQuestionIsMandatoryUpdate={onQuestionIsMandatoryUpdate}
        onQuestionHelpTextUpdate={onQuestionHelpTextUpdate}
      />
      <AdditionalDetails
        question={question}
        questionError={questionError}
        onIsParagraphUpdate={onIsParagraphUpdate}
        onMinValueUpdate={onMinValueUpdate}
        onMaxValueUpdate={onMaxValueUpdate}
        onOptionsAdd={onOptionsAdd}
        onOptionsUpdate={onOptionsUpdate}
        onOptionsRemove={onOptionsRemove}
      />
      <Box className={styles.questionFooter}>
        <Box className={styles.savingStatus}>
          {question.isSaving && (
            <>
              <CircularProgress size={20} />
              <Typography variant="caption" className={styles.savingText}>
                Saving...
              </Typography>
            </>
          )}
        </Box>
        <IconButton
          onClick={handleRemoveQuestion}
          className={styles.deleteButton}
          aria-label="delete question"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
