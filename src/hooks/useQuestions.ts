import {
  addNewQuestionToQuestions,
  getQuestionError,
  getQuestionsErrorMap,
  getQuestionsInitialState,
  removeQuestionFromLocalStorage,
  saveQuestionToLocalStorage,
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

  const autoSaveQuestion = useCallback((question: Question) => {
    if (getQuestionError(question)) {
      return;
    }
    setQuestions((prevQuestions) =>
      prevQuestions.map((currentQuestion) =>
        currentQuestion.id === question.id
          ? { ...currentQuestion, isSaving: true }
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
  }, []);

  const handleAddQuestion = useCallback(
    (questionType: QuestionType) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = addNewQuestionToQuestions(
          questionType,
          prevQuestions
        );
        return updatedQuestions;
      });

      if (isBuilderValidatedOnce) {
        setQuestions((prevQuestions) => {
          const newErrorMap = getQuestionsErrorMap(prevQuestions);
          setQuestionsErrorMap(newErrorMap);
          return prevQuestions;
        });
      }

      if (shouldSaveToLocalStorage) {
        setQuestions((prevQuestions) => {
          const latestQuestion = prevQuestions[prevQuestions.length - 1];
          autoSaveQuestion(latestQuestion);
          return prevQuestions;
        });
      }
    },
    [autoSaveQuestion, isBuilderValidatedOnce]
  );

  const handleRemoveQuestion = useCallback(
    (questionId: string) => {
      setQuestions((prevQuestions) => {
        const newQuestions = prevQuestions.filter(
          (currentQuestion) => currentQuestion.id !== questionId
        );

        if (isBuilderValidatedOnce) {
          setQuestionsErrorMap(getQuestionsErrorMap(newQuestions));
        }

        if (shouldSaveToLocalStorage) {
          const updatedQuestions = newQuestions.map((currentQuestion) =>
            currentQuestion.id === questionId
              ? update(currentQuestion, {
                  isRemoving: { $set: false },
                })
              : currentQuestion
          );

          removeQuestionFromLocalStorage(questionId)
            .then(() => {
              setQuestions((questions) =>
                questions.filter(
                  (currentQuestion) => currentQuestion.id !== questionId
                )
              );
            })
            .catch((error) => {
              console.error("Failed to remove question:", error);
              setQuestions(prevQuestions);
            });

          return updatedQuestions;
        }

        return newQuestions;
      });
    },
    [isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
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
          setQuestionsErrorMap(getQuestionsErrorMap(updatedQuestions));
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
    [autoSaveQuestion, isBuilderValidatedOnce]
  );

  const validateBuilder = useCallback(() => {
    setIsBuilderValidatedOnce(true);
    const buildErrors = getQuestionsErrorMap(questions);
    if (!isObjectEmpty(buildErrors)) {
      setQuestionsErrorMap(buildErrors);
    } else {
      onBuilderValidationSuccess();
    }
  }, [onBuilderValidationSuccess, questions]);

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
