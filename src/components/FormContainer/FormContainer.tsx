//components
import { FormBuilder } from "../FormBuilder";
import { FormRenderer } from "../FormRenderer";
import { Footer } from "../Footer";
import { Box } from "@mui/material";

//hooks
import { useFormScreen } from "../../hooks/useFormScreen";
import { useQuestions } from "../../hooks/useQuestions";
import { useAnswers } from "../../hooks/useAnswers";

//styles
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
  } = useQuestions({
    onBuilderValidationSuccess,
  });

  const { submitForm } = useAnswers();

  return (
    <Box className={styles["form-container"]}>
      <Box className={styles["main-content"]}>
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
        {isRendering && <FormRenderer />}
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
