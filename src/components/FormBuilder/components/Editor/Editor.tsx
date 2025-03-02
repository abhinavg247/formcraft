import { Box, Typography } from "@mui/material";
import styles from "./Editor.module.css";
import { QuestionRenderer } from "./components/Question";
import { EditorProps, Question } from "../../../../types";

export const Editor = ({
  questions,
  questionsErrorMap,
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
}: EditorProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: "1rem",
      gap: "0.75rem",
    }}
  >
    <Typography variant="h6" className={styles["editor-heading"]}>
      Form Questions
    </Typography>
    {questions.map((question: Question) => (
      <Box key={question.id} className={styles["question-item"]}>
        <QuestionRenderer
          question={question}
          questionError={questionsErrorMap[question.id]}
          onRemoveQuestion={onRemoveQuestion}
          onQuestionTitleUpdate={onQuestionTitleUpdate}
          onQuestionIsMandatoryUpdate={onQuestionIsMandatoryUpdate}
          onQuestionHelpTextUpdate={onQuestionHelpTextUpdate}
          onIsParagraphUpdate={onIsParagraphUpdate}
          onMinValueUpdate={onMinValueUpdate}
          onMaxValueUpdate={onMaxValueUpdate}
          onOptionsAdd={onOptionsAdd}
          onOptionsUpdate={onOptionsUpdate}
          onOptionsRemove={onOptionsRemove}
        />
      </Box>
    ))}
  </Box>
);
