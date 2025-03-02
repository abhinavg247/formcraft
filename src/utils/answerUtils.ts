import { QuestionType } from "../constants/questionConstants";
import { AnswersErrorMap, Question, QuestionIdVsAnswersMap } from "../types";
import update from "immutability-helper";

export const saveAnswersToBackend = (
  questionIdVsAnswersMap: QuestionIdVsAnswersMap
) =>
  new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error("Failed to save answers"));
        return;
      }
      resolve(questionIdVsAnswersMap);
    }, delay);
  });

export const getAnswersErrorMap = (
  questions: Question[],
  questionsIdVsAnswersMap: QuestionIdVsAnswersMap
) =>
  questions.reduce((answersErrorMap: AnswersErrorMap, question: Question) => {
    const questionType = question.type;
    const answer = questionsIdVsAnswersMap[question.id];
    if (!answer) {
      return update(answersErrorMap, {
        [question.id]: { $set: "Answer is required" },
      });
    }
    switch (questionType) {
      case QuestionType.TEXT: {
        if (typeof answer !== "string") {
          return update(answersErrorMap, {
            [question.id]: { $set: "Answer must be a string" },
          });
        } else if (!answer.trim()) {
          return update(answersErrorMap, {
            [question.id]: { $set: "Answer is required" },
          });
        }
        break;
      }
      case QuestionType.NUMBER: {
        if (typeof answer !== "number") {
          return update(answersErrorMap, {
            [question.id]: { $set: "Answer must be a number" },
          });
        } else if (isNaN(answer)) {
          return update(answersErrorMap, {
            [question.id]: { $set: "Answer must be a valid number" },
          });
        } else if (
          question.additionalDetails.min &&
          answer < question.additionalDetails.min
        ) {
          return update(answersErrorMap, {
            [question.id]: {
              $set: "Answer must be greater than or equal to min",
            },
          });
        } else if (
          question.additionalDetails.max &&
          answer > question.additionalDetails.max
        ) {
          return update(answersErrorMap, {
            [question.id]: {
              $set: "Answer must be less than or equal to max",
            },
          });
        }
        break;
      }
      case QuestionType.SELECT: {
        if (!Array.isArray(answer)) {
          return update(answersErrorMap, {
            [question.id]: {
              $set: "Answer must be an array",
            },
          });
        } else if (answer.length === 0) {
          return update(answersErrorMap, {
            [question.id]: {
              $set: "Please select at least one option",
            },
          });
        }
      }
    }
    return answersErrorMap;
  }, {});
