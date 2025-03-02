import { QuestionType } from "../../../../constants/questionConstants";

import {
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Chip,
  Grow,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import ListIcon from "@mui/icons-material/List";
import styles from "./QuestionAnswerRenderer.module.css";
import { QuestionAnswerRendererProps } from "../../../../types";
import { isMaxDefined, isMinDefined } from "../../../../utils/numberValidation";

export const QuestionAnswerRenderer = ({
  question,
  answer,
  answerError,
  handleAnswerUpdate,
}: QuestionAnswerRendererProps) => {
  const getQuestionTypeIcon = (type: QuestionType) => {
    switch (type) {
      case QuestionType.TEXT:
        return <TextFieldsIcon />;
      case QuestionType.NUMBER:
        return <NumbersIcon />;
      case QuestionType.SELECT:
        return <ListIcon />;
      default:
        return null;
    }
  };

  const renderAdditionalDetails = () => {
    switch (question.type) {
      case QuestionType.TEXT:
        return (
          question.additionalDetails.isParagraph && (
            <Chip
              label="Paragraph"
              color="primary"
              size="small"
              className={`${styles.chip} ${styles.optionChip}`}
            />
          )
        );
      case QuestionType.NUMBER:
        const { min, max } = question.additionalDetails;
        return (
          <div className={styles.numberDetails}>
            {isMinDefined(min) && (
              <Chip
                label={`Min: ${min}`}
                size="small"
                className={`${styles.chip} ${styles.minChip}`}
              />
            )}
            {isMaxDefined(min) && (
              <Chip
                label={`Max: ${max}`}
                size="small"
                className={`${styles.chip} ${styles.maxChip}`}
              />
            )}
          </div>
        );
      case QuestionType.SELECT:
        return (
          <div className={styles.selectOptions}>
            {question.additionalDetails.options?.map((option) => (
              <Chip
                key={option.id}
                label={option.label}
                variant="outlined"
                size="small"
                className={`${styles.chip} ${styles.optionChip}`}
              />
            ))}
          </div>
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
            placeholder={
              question.additionalDetails.isParagraph
                ? "Enter your response here..."
                : "Your answer"
            }
          />
        );
      case QuestionType.NUMBER:
        const { min, max } = question.additionalDetails;
        return (
          <TextField
            type="number"
            fullWidth
            value={answer || ""}
            onChange={(e) =>
              handleAnswerUpdate(
                question.id,
                question.type,
                Number(e.target.value)
              )
            }
            error={!!answerError}
            helperText={answerError}
            inputProps={{
              min: isMinDefined(min) ? min : undefined,
              max: isMaxDefined(max) ? max : undefined,
            }}
            placeholder={
              isMinDefined(min) && isMaxDefined(max)
                ? `Enter a number between ${min} and ${max}`
                : isMinDefined(min)
                ? `Enter a number ${min} or greater`
                : isMaxDefined(max)
                ? `Enter a number up to ${max}`
                : "Enter a number"
            }
          />
        );
      case QuestionType.SELECT:
        return (
          <FormControl component="fieldset" error={!!answerError}>
            <RadioGroup
              value={answer || ""}
              onChange={(e) =>
                handleAnswerUpdate(question.id, question.type, e.target.value)
              }
            >
              {question.additionalDetails.options?.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {answerError && (
              <Typography color="error">{answerError}</Typography>
            )}
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Grow in={true} timeout={300}>
      <div className={styles.questionContainer}>
        <div className={styles.questionHeader}>
          <Typography variant="h6" className={styles.questionTitle}>
            {getQuestionTypeIcon(question.type)}
            {question.title}
          </Typography>
          {question.isMandatory && (
            <Chip
              label="Required"
              size="small"
              className={`${styles.chip} ${styles.mandatoryChip}`}
            />
          )}
        </div>
        {question.helpText && (
          <Typography
            style={{
              marginBottom: "1rem",
            }}
            variant="body2"
            className={styles.helpText}
          >
            <InfoIcon
              fontSize="small"
              style={{
                marginRight: "8px",
                verticalAlign: "middle",
              }}
            />
            {question.helpText}
          </Typography>
        )}
        {renderAdditionalDetails()}
        <div className={styles.answerSection}>{renderAnswerInput()}</div>
      </div>
    </Grow>
  );
};
