import { QuestionType } from "../../../../constants/questionConstants";
import styles from "./QuestionAnswerRenderer.module.css";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { QuestionAnswerRendererProps } from "../../../../types";

export const QuestionAnswerRenderer: React.FC<QuestionAnswerRendererProps> = ({
  question,
  answer,
  answerError,
  handleAnswerUpdate,
}) => {
  const renderQuestionDetails = () => {
    return (
      <Box className={styles.questionDetails}>
        <Typography variant="subtitle1" className={styles.questionType}>
          Type: {question.type}
        </Typography>
        {question.isMandatory && (
          <Chip
            label="Mandatory"
            color="primary"
            size="small"
            className={styles.mandatoryChip}
          />
        )}
        {question.helpText && (
          <Typography variant="body2" className={styles.helpText}>
            Help: {question.helpText}
          </Typography>
        )}
      </Box>
    );
  };

  const renderAdditionalDetails = () => {
    switch (question.type) {
      case QuestionType.TEXT:
        return (
          <Typography variant="body2" className={styles.additionalInfo}>
            {question.additionalDetails.isParagraph
              ? "Paragraph"
              : "Single line"}{" "}
            text input
          </Typography>
        );
      case QuestionType.NUMBER:
        return (
          <Typography variant="body2" className={styles.additionalInfo}>
            Range: {question.additionalDetails.min} to{" "}
            {question.additionalDetails.max}
          </Typography>
        );
      case QuestionType.SELECT:
        return (
          <Box className={styles.optionsList}>
            <Typography variant="body2">Options:</Typography>
            <ul>
              {question.additionalDetails.options?.map((option) => (
                <li key={option.id}>{option.label}</li>
              ))}
            </ul>
          </Box>
        );
      default:
        return null;
    }
  };
  const renderAnswerInput = () => {
    switch (question.type) {
      case QuestionType.TEXT:
        return (
          <TextField
            fullWidth
            multiline={question.additionalDetails.isParagraph}
            rows={question.additionalDetails.isParagraph ? 4 : 1}
            value={answer || ""}
            onChange={(e) =>
              handleAnswerUpdate(question.id, question.type, e.target.value)
            }
            error={!!answerError}
            helperText={answerError}
            variant="outlined"
            className={styles.answerInput}
          />
        );
      case QuestionType.NUMBER:
        return (
          <TextField
            fullWidth
            type="number"
            value={answer || ""}
            onChange={(e) =>
              handleAnswerUpdate(question.id, question.type, e.target.value)
            }
            error={!!answerError}
            helperText={answerError}
            variant="outlined"
            className={styles.answerInput}
            inputProps={{
              min: question.additionalDetails.min,
              max: question.additionalDetails.max,
            }}
          />
        );
      case QuestionType.SELECT:
        return (
          <FormControl
            fullWidth
            className={styles.answerInput}
            error={!!answerError}
          >
            <InputLabel id={`select-label-${question.id}`}>
              Select an option
            </InputLabel>
            <Select
              labelId={`select-label-${question.id}`}
              value={answer || ""}
              onChange={(e) =>
                handleAnswerUpdate(
                  question.id,
                  question.type,
                  e.target.value as string
                )
              }
            >
              {question.additionalDetails.options?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {answerError && (
              <Typography color="error" variant="caption">
                {answerError}
              </Typography>
            )}
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box className={styles.questionContainer}>
      <Typography variant="h6" className={styles.questionTitle}>
        {question.title}
        {question.isMandatory && (
          <span className={styles.mandatoryIndicator}>*</span>
        )}
      </Typography>
      {renderQuestionDetails()}
      {renderAdditionalDetails()}
      {renderAnswerInput()}
    </Box>
  );
};
