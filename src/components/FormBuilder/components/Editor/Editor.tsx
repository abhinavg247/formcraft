import { Box, Typography } from "@mui/material";
import styles from "./Editor.module.css";
import { QuestionRenderer } from "./components/Question";
import { EditorProps, Question, QuestionsErrorMap } from "../../../../types";

export const Editor = ({
  questions,
  questionsErrorMap,
  onAddQuestion,
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
  <Box className={styles["editor-container"]}>
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
