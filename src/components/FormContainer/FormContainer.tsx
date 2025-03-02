import styles from "./FormContainer.module.css";
import { FormBuilder } from "../FormBuilder";
import { FormRenderer } from "../FormRenderer";
import { Footer } from "../Footer";
import { Box } from "@mui/material";
import { useFormScreen } from "../../hooks/useFormScreen";
import { useQuestions } from "../../hooks/useQuestions";
import { useAnswers } from "../../hooks/useAnswers";

export const FormContainer = () => {
  const { isBuilding, isRendering, openBuilder, onBuilderValidationSuccess } =
    useFormScreen();

  const {
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
    validateBuilder,
  } = useQuestions({
    onBuilderValidationSuccess,
  });

  const {
    questionIdVsAnswersMap,
    answersErrorMap,
    handleAnswerUpdate,
    submitForm,
  } = useAnswers({
    questions,
  });

  return (
    <Box className={styles.formContainer}>
      <Box className={styles.content}>
        {isBuilding && (
          <FormBuilder
            questions={questions}
            questionsErrorMap={questionsErrorMap}
            onAddQuestion={onAddQuestion}
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
        )}
        {isRendering && (
          <FormRenderer
            questions={questions}
            questionIdVsAnswersMap={questionIdVsAnswersMap}
            answersErrorMap={answersErrorMap}
            handleAnswerUpdate={handleAnswerUpdate}
          />
        )}
      </Box>
      <Footer
        isBuilding={isBuilding}
        isRendering={isRendering}
        validateBuilder={validateBuilder}
        onEditBuild={openBuilder}
        submitForm={submitForm}
      />
    </Box>
  );
};
