import { useCallback, useState } from "react";
import { Answer, Question } from "../types";

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Record<Question["id"], Answer>>({});

  const submitForm = useCallback(() => {
    // Submit form logic here
  }, []);

  return { answers, setAnswers, submitForm };
};
