//lib
import { useCallback } from "react";
import { v4 } from "uuid";

//components
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  FormControl,
} from "@mui/material";

//constants
import { QuestionType } from "../../../../../../../../constants/questionConstants";

//styles
import styles from "./AdditionalDetails.module.css";

//types
import { AdditionalDetailsProps } from "../../../../../../../../types";

export const AdditionalDetails = ({
  question,
  questionError,
  onIsParagraphUpdate,
  onMinValueUpdate,
  onMaxValueUpdate,
  onOptionsAdd,
  onOptionsUpdate,
  onOptionsRemove,
}: AdditionalDetailsProps) => {
  const { additionalDetails } = question;

  const handleIsParagraphUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onIsParagraphUpdate(question.id, e.target.checked);
    },
    [onIsParagraphUpdate, question.id]
  );
  const handleMinValueUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onMinValueUpdate(question.id, parseInt(e.target.value, 10));
    },
    [onMinValueUpdate, question.id]
  );
  const handleMaxValueUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onMaxValueUpdate(question.id, parseInt(e.target.value, 10));
    },
    [onMaxValueUpdate, question.id]
  );

  const handleOptionUpdate = useCallback(
    (optionId: string, optionLabel: string) => {
      onOptionsUpdate(question.id, optionId, optionLabel);
    },
    [onOptionsUpdate, question.id]
  );
  const handleOptionRemove = useCallback(
    (optionId: string) => {
      onOptionsRemove(question.id, optionId);
    },
    [onOptionsRemove, question.id]
  );
  const handleOptionAdd = useCallback(() => {
    onOptionsAdd(question.id, { id: v4(), label: "" });
  }, [onOptionsAdd, question.id]);

  return (
    <Box>
      {question.type === QuestionType.TEXT && (
        <FormControlLabel
          control={
            <Checkbox
              checked={additionalDetails.isParagraph || false}
              onChange={handleIsParagraphUpdate}
            />
          }
          label="Is Paragraph"
        />
      )}

      {question.type === QuestionType.NUMBER && (
        <Box>
          <TextField
            label="Min Value"
            type="number"
            value={additionalDetails.min || ""}
            onChange={handleMinValueUpdate}
            fullWidth
            margin="normal"
            error={!!questionError?.additionalDetailsError?.minError}
          />
          {questionError?.additionalDetailsError?.minError && (
            <Box className={styles.errorText}>
              {questionError.additionalDetailsError.minError}
            </Box>
          )}

          <TextField
            label="Max Value"
            type="number"
            value={additionalDetails.max || ""}
            onChange={handleMaxValueUpdate}
            fullWidth
            margin="normal"
          />
        </Box>
      )}

      {question.type === QuestionType.SELECT && (
        <Box>
          {additionalDetails.options?.map((option, index) => (
            <Box
              key={option.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <TextField
                label={`Option ${index + 1}`}
                value={option.label}
                onChange={(e) => handleOptionUpdate(option.id, e.target.value)}
                fullWidth
                margin="normal"
                error={
                  !!questionError?.additionalDetailsError?.optionsErrorMap?.[
                    option.id
                  ]
                }
              />
              {questionError?.additionalDetailsError?.optionsErrorMap?.[
                option.id
              ] && (
                <Box className={styles.errorText}>
                  {
                    questionError.additionalDetailsError.optionsErrorMap[
                      option.id
                    ]
                  }
                </Box>
              )}
              <Button
                onClick={() => handleOptionRemove(option.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button onClick={handleOptionAdd}>Add Option</Button>
          {questionError?.additionalDetailsError?.optionsError && (
            <Box className={styles.errorText}>
              {questionError.additionalDetailsError.optionsError}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
