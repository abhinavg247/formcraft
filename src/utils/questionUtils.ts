import { v4 } from "uuid";
import {
  LOCAL_STORAGE_QUESTIONS_KEY,
  QuestionType,
} from "../constants/questionConstants";
import {
  OptionsErrorMap,
  Question,
  QuestionError,
  QuestionsErrorMap,
} from "../types";
import update from "immutability-helper";
import { isObjectEmpty } from "./objectUtils";

export const getInitialAdditionalDetails = (questionType: QuestionType) => {
  switch (questionType) {
    case QuestionType.TEXT:
      return { isParagraph: false };
    case QuestionType.NUMBER:
      return { min: 0, max: 100 };
    case QuestionType.SELECT:
      return { options: [] };
    default:
      return {};
  }
};

export const getNewQuestion = (questionType: QuestionType): Question => ({
  id: v4(),
  title: "New Question",
  type: questionType,
  isMandatory: false,
  helpText: "",
  additionalDetails: getInitialAdditionalDetails(questionType),
  isSaving: false,
});

export const getQuestionsFromLocalStorage = (): Question[] | undefined => {
  const savedQuestions = localStorage.getItem(LOCAL_STORAGE_QUESTIONS_KEY);
  if (savedQuestions) {
    const parsedQuestions = JSON.parse(savedQuestions);
    return parsedQuestions.map((currentQuestion: Question) =>
      update(currentQuestion, {
        isSaving: { $set: false },
      })
    );
  }
  return undefined;
};

export const getDefaultQuestions = (): Question[] => [
  getNewQuestion(QuestionType.TEXT),
];

export const getQuestionsInitialState = (): Question[] => {
  const questionsFromLocalStorage = getQuestionsFromLocalStorage();
  return questionsFromLocalStorage || getDefaultQuestions();
};

export const saveQuestionToLocalStorage = async (question: Question) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1-3 seconds
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error("Failed to save question"));
        return;
      }

      const savedQuestions = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_QUESTIONS_KEY) || "[]"
      );

      const doesQuestionExistInLocalStorage = savedQuestions.some(
        (currentQuestion) => currentQuestion.id === question.id
      );
      const updatedQuestions = savedQuestions.map((currentQuestion: Question) =>
        currentQuestion.id === question.id ? question : currentQuestion
      );
      if (!doesQuestionExistInLocalStorage) {
        updatedQuestions.push(question);
      }

      localStorage.setItem(
        LOCAL_STORAGE_QUESTIONS_KEY,
        JSON.stringify(updatedQuestions)
      );
      resolve(updatedQuestions);
    }, delay);
  });
};

export const removeQuestionFromLocalStorage = async (
  questionId: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error("Failed to save question"));
        return;
      }
      const savedQuestions = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_QUESTIONS_KEY) || "[]"
      );
      const updatedQuestions = savedQuestions.filter(
        (currentQuestion: Question) => currentQuestion.id !== questionId
      );
      localStorage.setItem(
        LOCAL_STORAGE_QUESTIONS_KEY,
        JSON.stringify(updatedQuestions)
      );
      resolve(updatedQuestions);
    }, delay);
  });
};

export const getQuestionError = (
  question: Question
): QuestionError | undefined => {
  const errors: QuestionError = {};

  if (!question.title.trim()) {
    errors.titleError = "Title is required";
  }

  switch (question.type) {
    case QuestionType.NUMBER:
      const { min, max } = question.additionalDetails;
      if (min > max) {
        errors.additionalDetailsError = {};
        errors.additionalDetailsError.minError = "Min must be less than max";
      }
      break;
    case QuestionType.SELECT:
      const options = question.additionalDetails.options;
      if (!options || options.length < 2) {
        errors.additionalDetailsError = {};
        errors.additionalDetailsError.optionsError =
          "At least two options are required for SELECT type";
      }

      const optionsErrorMap: OptionsErrorMap = options.reduce(
        (errorMapSoFar, option) => {
          if (!option.label.trim()) {
            return update(errorMapSoFar, {
              [option.id]: { $set: "Option label is required" },
            });
          }
          return errorMapSoFar;
        },
        {}
      );
      if (!isObjectEmpty(optionsErrorMap)) {
        if (!errors.additionalDetailsError) {
          errors.additionalDetailsError = {};
        }
        errors.additionalDetailsError.optionsErrorMap = optionsErrorMap;
      }
      break;
  }

  return !isObjectEmpty(errors) ? errors : undefined;
};

export const getQuestionsErrorMap = (questions: Question[]) =>
  questions.reduce((errorMap: QuestionsErrorMap, question: Question) => {
    const error = getQuestionError(question);
    if (error) {
      return update(errorMap, {
        [question.id]: { $set: error },
      });
    }
    return errorMap;
  }, {});
