import { useCallback } from "react";

import { FormBuilder } from "../FormBuilder";
import { FormRenderer } from "../FormRenderer";
import { Footer } from "../Footer";
import { Box } from "@mui/material";
import { useFormScreen } from "../../hooks/useFormScreen";
import { useQuestions } from "../../hooks/useQuestions";

import { useAnswers } from "../../hooks/useAnswers";

import styles from "./FormContainer.module.css";

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
    resetBuild,
  } = useQuestions({
    onBuilderValidationSuccess,
  });

  const {
    questionIdVsAnswersMap,
    answersErrorMap,
    handleAnswerUpdate,
    submitForm,
    isSavingForm,
    resetAnswers,
  } = useAnswers({
    questions,
  });

  const onEditBuild = useCallback(() => {
    resetAnswers();
    openBuilder();
  }, [openBuilder, resetAnswers]);

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
        isSavingForm={isSavingForm}
        validateBuilder={validateBuilder}
        onResetBuild={resetBuild}
        onEditBuild={onEditBuild}
        submitForm={submitForm}
      />
    </Box>
  );
};
