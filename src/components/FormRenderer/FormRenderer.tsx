import { FormRendererProps } from "../../types";
import { Typography, Box } from "@mui/material";
import { QuestionAnswerRenderer } from "./components/QuestionAnswerRenderer";
import { ReactElement } from "react";
import styles from "./FormRenderer.module.css";

export const FormRenderer = ({
  questions,
  questionIdVsAnswersMap,
  answersErrorMap,
  handleAnswerUpdate,
}: FormRendererProps): ReactElement => {
  return (
    <Box className={styles.formRendererContainer}>
      <Box className={styles.formContent}>
        <Box className={styles.formInnerContent}>
          <Typography variant="h4" className={styles.formTitle}>
            Form Renderer
          </Typography>
          {questions.map((question) => (
            <Box key={question.id}>
              <QuestionAnswerRenderer
                question={question}
                answer={questionIdVsAnswersMap[question.id]}
                answerError={answersErrorMap[question.id]}
                handleAnswerUpdate={handleAnswerUpdate}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
