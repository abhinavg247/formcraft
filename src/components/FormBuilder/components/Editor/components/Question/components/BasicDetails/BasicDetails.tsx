import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import { BasicDetailsProps } from "../../../../../../../../types";
import { QuestionType } from "../../../../../../../../constants/questionConstants";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import ListIcon from "@mui/icons-material/List";
import { JSX, useCallback } from "react";

//styles
import styles from "./BasicDetails.module.css";

const getQuestionTypeInfo = (
  type: QuestionType
): {
  label: string;
  icon: JSX.Element;
} => {
  switch (type) {
    case QuestionType.TEXT:
      return { label: "Text", icon: <TextFieldsIcon /> };
    case QuestionType.NUMBER:
      return { label: "Number", icon: <NumbersIcon /> };
    case QuestionType.SELECT:
      return { label: "Select", icon: <ListIcon /> };
    default:
      return { label: "Unknown", icon: null };
  }
};

export const BasicDetails = ({
  question,
  questionError,
  onQuestionTitleUpdate,
  onQuestionIsMandatoryUpdate,
  onQuestionHelpTextUpdate,
}: BasicDetailsProps) => {
  const questionTypeInfo = getQuestionTypeInfo(question.type);

  const handleTitleUpdate = useCallback(
    (event) => {
      onQuestionTitleUpdate(question.id, event.target.value);
    },
    [onQuestionTitleUpdate, question.id]
  );

  const handleQuestionIsMandatoryUpdate = useCallback(
    (event) => {
      onQuestionIsMandatoryUpdate(question.id, event.target.checked);
    },
    [onQuestionIsMandatoryUpdate, question.id]
  );

  const handleQuestionHelpTextUpdate = useCallback(
    (event) => {
      onQuestionHelpTextUpdate(question.id, event.target.value);
    },
    [onQuestionHelpTextUpdate, question.id]
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {questionTypeInfo.icon}
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Question Type: {questionTypeInfo.label}
        </Typography>
      </Box>

      <TextField
        label="Title"
        value={question.title}
        onChange={handleTitleUpdate}
        fullWidth
        margin="normal"
        error={!!questionError?.titleError}
        required
      />
      {questionError?.titleError && (
        <Box className={styles.errorText}>{questionError.titleError}</Box>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={question.isMandatory}
            onChange={handleQuestionIsMandatoryUpdate}
          />
        }
        label="Mandatory"
      />

      <TextField
        label="Help Text"
        value={question.helpText || ""}
        onChange={handleQuestionHelpTextUpdate}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};
