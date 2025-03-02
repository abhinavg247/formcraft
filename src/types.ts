import { QuestionType } from "./constants/questionConstants";

export type SelectOption = {
  id: string;
  label: string;
};

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  isMandatory: boolean;
  helpText?: string;
  additionalDetails: {
    isParagraph?: boolean;
    min?: number;
    max?: number;
    options?: SelectOption[];
  };
  isSaving?: boolean;
}

export type OptionsErrorMap = Record<SelectOption["id"], string>;

export type QuestionError =
  | {
      titleError?: string;
      additionalDetailsError?: {
        minError?: string;
        optionsError?: string;
        optionsErrorMap?: OptionsErrorMap;
      };
    }
  | undefined;

export type QuestionsErrorMap = Record<Question["id"], QuestionError>;

export type UseFormScreenReturn = {
  isBuilding: boolean;
  isRendering: boolean;
  openBuilder: () => void;
  openRenderer: () => void;
  onBuilderValidationSuccess: () => void;
};

export type UseQuestionsReturn = {
  questions: Question[];
  questionsErrorMap: QuestionsErrorMap;
  onAddQuestion: (questionType: QuestionType) => void;
  onRemoveQuestion: (questionId: string) => void;
  onQuestionTitleUpdate: (questionId: string, title: string) => void;
  onQuestionIsMandatoryUpdate: (
    questionId: string,
    isMandatory: boolean
  ) => void;
  onQuestionHelpTextUpdate: (questionId: string, helpText: string) => void;
  onIsParagraphUpdate: (questionId: string, isParagraph: boolean) => void;
  onMinValueUpdate: (questionId: string, min: number) => void;
  onMaxValueUpdate: (questionId: string, max: number) => void;
  onOptionsAdd: (questionId: string, option: SelectOption) => void;
  onOptionsUpdate: (
    questionId: string,
    optionId: string,
    optionLabel: string
  ) => void;
  onOptionsRemove: (questionId: string, optionId: string) => void;
  validateBuilder: () => void;
  resetBuild: () => void;
};

export type FormBuilderProps = Pick<
  UseQuestionsReturn,
  | "questions"
  | "questionsErrorMap"
  | "onAddQuestion"
  | "onRemoveQuestion"
  | "onQuestionTitleUpdate"
  | "onQuestionIsMandatoryUpdate"
  | "onQuestionHelpTextUpdate"
  | "onIsParagraphUpdate"
  | "onMinValueUpdate"
  | "onMaxValueUpdate"
  | "onOptionsAdd"
  | "onOptionsUpdate"
  | "onOptionsRemove"
>;

export type SideNavProps = Pick<UseQuestionsReturn, "onAddQuestion">;
export type AddQuestionProps = Pick<UseQuestionsReturn, "onAddQuestion"> & {
  type: QuestionType;
};

export type EditorProps = Pick<
  UseQuestionsReturn,
  | "questions"
  | "questionsErrorMap"
  | "onAddQuestion"
  | "onRemoveQuestion"
  | "onQuestionTitleUpdate"
  | "onQuestionIsMandatoryUpdate"
  | "onQuestionHelpTextUpdate"
  | "onIsParagraphUpdate"
  | "onMinValueUpdate"
  | "onMaxValueUpdate"
  | "onOptionsAdd"
  | "onOptionsUpdate"
  | "onOptionsRemove"
>;

export type QuestionRendererProps = Pick<
  UseQuestionsReturn,
  | "onRemoveQuestion"
  | "onQuestionTitleUpdate"
  | "onQuestionIsMandatoryUpdate"
  | "onQuestionHelpTextUpdate"
  | "onIsParagraphUpdate"
  | "onMinValueUpdate"
  | "onMaxValueUpdate"
  | "onOptionsAdd"
  | "onOptionsUpdate"
  | "onOptionsRemove"
> & {
  question: Question;
  questionError?: QuestionError;
};

export type BasicDetailsProps = Pick<
  UseQuestionsReturn,
  | "onQuestionTitleUpdate"
  | "onQuestionHelpTextUpdate"
  | "onQuestionIsMandatoryUpdate"
> & {
  question: Question;
  questionError?: QuestionError;
};

export type AdditionalDetailsProps = Pick<
  UseQuestionsReturn,
  | "onIsParagraphUpdate"
  | "onMinValueUpdate"
  | "onMaxValueUpdate"
  | "onOptionsAdd"
  | "onOptionsUpdate"
  | "onOptionsRemove"
> & {
  question: Question;
  questionError?: QuestionError;
};

export type Answer = string | number | SelectOption["id"][];

export type QuestionIdVsAnswersMap = Record<Question["id"], Answer>;

export type AnswerError = string;

export type AnswersErrorMap = Record<Question["id"], AnswerError>;

export type UseAnswersProps = Pick<UseQuestionsReturn, "questions">;

export type UseAnswersReturn = {
  questionIdVsAnswersMap: QuestionIdVsAnswersMap;
  submitForm: () => void;
  isSavingForm: boolean;
  answersErrorMap: AnswersErrorMap;
  handleAnswerUpdate: (
    questionId: string,
    questionType: QuestionType,
    answerValue: string | number | SelectOption["id"]
  ) => void;
  resetAnswers: () => void;
};

export type FormRendererProps = Pick<UseQuestionsReturn, "questions"> &
  Pick<
    UseAnswersReturn,
    "questionIdVsAnswersMap" | "answersErrorMap" | "handleAnswerUpdate"
  >;

export type QuestionAnswerRendererProps = {
  question: Question;
  answer?: Answer;
  answerError?: AnswerError;
} & Pick<UseAnswersReturn, "handleAnswerUpdate">;
