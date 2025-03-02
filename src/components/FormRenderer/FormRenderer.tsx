import { Typography, Paper, Container, Box } from "@mui/material";
import { FormRendererProps } from "../../types";
import { QuestionAnswerRenderer } from "./components/QuestionAnswerRenderer/QuestionAnswerRenderer";
import styles from "./FormRenderer.module.css";

export const FormRenderer = ({
  questions,
  questionIdVsAnswersMap,
  answersErrorMap,
  handleAnswerUpdate,
}: FormRendererProps) => {
  return (
    <Box className={styles.background}>
      <Box className={styles.formContainer}>
        <Paper elevation={3} className={styles.formPaper}>
          <Typography variant="h4" className={styles.formTitle}>
            Form Preview
          </Typography>
          <Box className={styles.formContent}>
            {questions.map((question) => (
              <QuestionAnswerRenderer
                key={question.id}
                question={question}
                answer={questionIdVsAnswersMap[question.id]}
                answerError={answersErrorMap[question.id]}
                handleAnswerUpdate={handleAnswerUpdate}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
