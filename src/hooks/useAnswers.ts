import { useCallback, useState } from "react";
import { QuestionType } from "../constants/questionConstants";
import update from "immutability-helper";
import { useSnackbar } from "notistack";

import {
  Answer,
  AnswersErrorMap,
  Question,
  SelectOption,
  UseAnswersProps,
  UseAnswersReturn,
} from "../types";
import { isObjectEmpty } from "../utils/objectUtils";
import { getAnswersErrorMap, saveAnswersToBackend } from "../utils/answerUtils";

export const useAnswers = ({
  questions,
}: UseAnswersProps): UseAnswersReturn => {
  const [questionIdVsAnswersMap, setQuestionIdVsAnswersMap] = useState<
    Record<Question["id"], Answer>
  >({});

  const [answersErrorMap, setAnswersErrorMap] = useState<AnswersErrorMap>({});

  const [isRendererValidatedOnce, setIsRendererValidatedOnce] =
    useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const updateAnswersErrorMap = useCallback(() => {
    setQuestionIdVsAnswersMap((prevQuestionIdVsAnswersMap) => {
      const updatedAnswersErrorMap = getAnswersErrorMap(
        questions,
        prevQuestionIdVsAnswersMap
      );
      setAnswersErrorMap(updatedAnswersErrorMap);
      return prevQuestionIdVsAnswersMap;
    });
  }, [questions]);

  const handleAnswerUpdate = useCallback(
    (
      questionId: string,
      questionType: QuestionType,
      answerValue: string | number | SelectOption["id"]
    ) => {
      switch (questionType) {
        case QuestionType.SELECT: {
          setQuestionIdVsAnswersMap((prevMap) => {
            return update(prevMap, {
              [questionId]: { $set: [answerValue as string] },
            });
          });
          if (isRendererValidatedOnce) {
            updateAnswersErrorMap();
          }
          break;
        }
        default: {
          setQuestionIdVsAnswersMap((prevMap) =>
            update(prevMap, {
              [questionId]: { $set: answerValue },
            })
          );
          if (isRendererValidatedOnce) {
            updateAnswersErrorMap();
          }
          break;
        }
      }
    },
    [isRendererValidatedOnce, updateAnswersErrorMap]
  );

  const [isSavingForm, setIsSavingForm] = useState<boolean>(false);

  const submitForm = useCallback(() => {
    if (!isRendererValidatedOnce) {
      setIsRendererValidatedOnce(true);
    }
    setIsSavingForm(true);
    const rendererErrors = getAnswersErrorMap(
      questions,
      questionIdVsAnswersMap
    );
    if (!isObjectEmpty(rendererErrors)) {
      enqueueSnackbar("Form Renderer has errors.", {
        variant: "error",
      });
      setAnswersErrorMap(rendererErrors);
    } else {
      saveAnswersToBackend(questionIdVsAnswersMap)
        .then(() => {
          setIsSavingForm(false);
          enqueueSnackbar("Submission Complete!", {
            variant: "success",
          });
        })
        .catch((error) => {
          setIsSavingForm(false);
          enqueueSnackbar("Form couldn't be submitted, please try again!", {
            variant: "error",
          });
          console.error("Failed to submit form:", error);
        });
    }
  }, [
    enqueueSnackbar,
    isRendererValidatedOnce,
    questionIdVsAnswersMap,
    questions,
  ]);

  return {
    questionIdVsAnswersMap,
    answersErrorMap,
    handleAnswerUpdate,
    submitForm,
    isSavingForm,
  };
};
