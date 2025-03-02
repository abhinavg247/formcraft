import {
  getQuestionError,
  getQuestionsErrorMap,
  getQuestionsInitialState,
  removeQuestionFromLocalStorage,
  saveQuestionToLocalStorage,
  getNewQuestion,
} from "../utils/questionUtils";
import { QuestionType } from "../constants/questionConstants";
import {
  Question,
  QuestionsErrorMap,
  SelectOption,
  UseQuestionsReturn,
} from "../types";
import { useState, useCallback } from "react";
import update from "immutability-helper";
import { useSnackbar } from "notistack";

//utils
import { isObjectEmpty } from "../utils/objectUtils";

const shouldSaveToLocalStorage = true;

export const useQuestions = ({
  onBuilderValidationSuccess,
}: {
  onBuilderValidationSuccess: () => void;
}): UseQuestionsReturn => {
  const [questions, setQuestions] = useState<Question[]>(
    getQuestionsInitialState()
  );

  const [questionsErrorMap, setQuestionsErrorMap] = useState<QuestionsErrorMap>(
    {}
  );

  const [isBuilderValidatedOnce, setIsBuilderValidatedOnce] =
    useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const autoSaveQuestion = useCallback(
    (question: Question) => {
      if (getQuestionError(question)) {
        return;
      }
      setQuestions((prevQuestions) =>
        prevQuestions.map((currentQuestion) =>
          currentQuestion.id === question.id
            ? update(currentQuestion, {
                isSaving: { $set: true },
              })
            : currentQuestion
        )
      );
      saveQuestionToLocalStorage(question)
        .then(() => {
          setQuestions((prevQuestions) =>
            prevQuestions.map((currentQuestion) =>
              currentQuestion.id === question.id
                ? update(currentQuestion, {
                    isSaving: { $set: false },
                  })
                : currentQuestion
            )
          );
        })
        .catch((error) => {
          enqueueSnackbar("Failed to save question", {
            variant: "error",
          });
          console.error("Failed to save question:", error);
          setQuestions((prevQuestions) =>
            prevQuestions.map((currentQuestion) =>
              currentQuestion.id === question.id
                ? update(currentQuestion, {
                    isSaving: { $set: false },
                  })
                : currentQuestion
            )
          );
        });
    },
    [enqueueSnackbar]
  );

  const updateQuestionsErrorMap = useCallback(() => {
    setQuestions((prevQuestions) => {
      const newErrorMap = getQuestionsErrorMap(prevQuestions);
      setQuestionsErrorMap(newErrorMap);
      return prevQuestions;
    });
  }, []);

  const handleAddQuestion = useCallback(
    async (questionType: QuestionType) => {
      const newQuestion = getNewQuestion(questionType);
      setQuestions((prevQuestions) =>
        update(prevQuestions, {
          $push: [newQuestion],
        })
      );
      if (isBuilderValidatedOnce) {
        updateQuestionsErrorMap();
      }
      if (shouldSaveToLocalStorage) {
        autoSaveQuestion(newQuestion);
      }
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleRemoveQuestion = useCallback(
    (questionId: string) => {
      let previousQuestions: Question[];
      setQuestions((prevQuestions) => {
        previousQuestions = prevQuestions;
        const newQuestions = prevQuestions.filter(
          (currentQuestion) => currentQuestion.id !== questionId
        );
        return newQuestions;
      });
      if (isBuilderValidatedOnce) {
        updateQuestionsErrorMap();
      }
      if (shouldSaveToLocalStorage) {
        removeQuestionFromLocalStorage(questionId).catch((error) => {
          enqueueSnackbar("Failed to delete question", {
            variant: "error",
          });
          console.error("Failed to delete question:", error);
          // reinsert failed to delete element
          setQuestions(previousQuestions);
        });
      }
    },
    [enqueueSnackbar, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleQuestionTitleUpdate = useCallback(
    (questionId: string, title: string) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, { title: { $set: title } })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleQuestionIsMandatoryUpdate = useCallback(
    (questionId: string, isMandatory: boolean) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, { isMandatory: { $set: isMandatory } })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleQuestionHelpTextUpdate = useCallback(
    (questionId: string, helpText: string) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, { helpText: { $set: helpText } })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleIsParagraphUpdate = useCallback(
    (questionId: string, isParagraph: boolean) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, {
                additionalDetails: { isParagraph: { $set: isParagraph } },
              })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleMinValueUpdate = useCallback(
    (questionId: string, min: number) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, {
                additionalDetails: { min: { $set: min } },
              })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleMaxValueUpdate = useCallback(
    (questionId: string, max: number) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, {
                additionalDetails: { max: { $set: max } },
              })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleOptionsAdd = useCallback(
    (questionId: string, option: SelectOption) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, {
                additionalDetails: { options: { $push: [option] } },
              })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleOptionsUpdate = useCallback(
    (questionId: string, optionId: string, optionLabel: string) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, {
                additionalDetails: {
                  options: {
                    $apply: (prevOptions: SelectOption[] = []) =>
                      prevOptions.map((option) =>
                        option.id === optionId
                          ? update(option, {
                              label: { $set: optionLabel },
                            })
                          : option
                      ),
                  },
                },
              })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const handleOptionsRemove = useCallback(
    (questionId: string, optionId: string) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((currentQuestion) =>
          currentQuestion.id === questionId
            ? update(currentQuestion, {
                additionalDetails: {
                  options: {
                    $apply: (prevOptions: SelectOption[] = []) =>
                      prevOptions.filter((option) => option.id !== optionId),
                  },
                },
              })
            : currentQuestion
        );
        if (isBuilderValidatedOnce) {
          updateQuestionsErrorMap();
        }
        if (shouldSaveToLocalStorage) {
          const latestQuestion = updatedQuestions.find(
            (currentQuestion) => currentQuestion.id === questionId
          );
          autoSaveQuestion(latestQuestion);
        }
        return updatedQuestions;
      });
    },
    [autoSaveQuestion, isBuilderValidatedOnce, updateQuestionsErrorMap]
  );

  const validateBuilder = useCallback(() => {
    if (!isBuilderValidatedOnce) {
      setIsBuilderValidatedOnce(true);
    }
    const buildErrors = getQuestionsErrorMap(questions);
    if (!isObjectEmpty(buildErrors)) {
      enqueueSnackbar("Form build has errors.", {
        variant: "error",
      });
      setQuestionsErrorMap(buildErrors);
    } else {
      enqueueSnackbar("Form build successful!", {
        variant: "success",
      });
      onBuilderValidationSuccess();
    }
  }, [
    enqueueSnackbar,
    isBuilderValidatedOnce,
    onBuilderValidationSuccess,
    questions,
  ]);

  return {
    questions,
    questionsErrorMap,
    onAddQuestion: handleAddQuestion,
    onRemoveQuestion: handleRemoveQuestion,
    onQuestionTitleUpdate: handleQuestionTitleUpdate,
    onQuestionIsMandatoryUpdate: handleQuestionIsMandatoryUpdate,
    onQuestionHelpTextUpdate: handleQuestionHelpTextUpdate,
    onIsParagraphUpdate: handleIsParagraphUpdate,
    onMinValueUpdate: handleMinValueUpdate,
    onMaxValueUpdate: handleMaxValueUpdate,
    onOptionsAdd: handleOptionsAdd,
    onOptionsUpdate: handleOptionsUpdate,
    onOptionsRemove: handleOptionsRemove,
    validateBuilder,
  };
};
