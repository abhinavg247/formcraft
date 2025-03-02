//lib
import { ReactElement } from "react";

//components
import { SideNav } from "./components/SideNav";
import { Editor as QuestionsEditor } from "./components/Editor";
import { Box } from "@mui/material";

//types
import { FormBuilderProps } from "../../types";

export const FormBuilder = (props: FormBuilderProps): ReactElement => {
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
  } = props;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <SideNav onAddQuestion={onAddQuestion} />
      <QuestionsEditor
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
    </Box>
  );
};
