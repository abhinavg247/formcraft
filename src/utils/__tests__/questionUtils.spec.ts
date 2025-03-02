import { getQuestionError } from "../questionUtils";
import { Question } from "../../types";
import { QuestionType } from "../../constants/questionConstants";

describe("getQuestionError", () => {
  it("should return titleError when title is empty", () => {
    const question: Question = {
      id: "1",
      title: "",
      type: QuestionType.TEXT,
      isMandatory: false,
      helpText: "",
      additionalDetails: {},
      isSaving: false,
    };

    const error = getQuestionError(question);
    expect(error).toEqual({ titleError: "Title is required" });
  });

  it("should return undefined when question is valid", () => {
    const question: Question = {
      id: "1",
      title: "Valid Question",
      type: QuestionType.TEXT,
      isMandatory: false,
      helpText: "",
      additionalDetails: {},
      isSaving: false,
    };

    const error = getQuestionError(question);
    expect(error).toBeUndefined();
  });

  describe("NUMBER type questions", () => {
    it("should return minError when min is greater than max", () => {
      const question: Question = {
        id: "1",
        title: "Number Question",
        type: QuestionType.NUMBER,
        isMandatory: false,
        helpText: "",
        additionalDetails: { min: 10, max: 5 },
        isSaving: false,
      };

      const error = getQuestionError(question);
      expect(error).toEqual({
        additionalDetailsError: { minError: "Min must be less than max" },
      });
    });

    it("should return undefined when min is less than max", () => {
      const question: Question = {
        id: "1",
        title: "Number Question",
        type: QuestionType.NUMBER,
        isMandatory: false,
        helpText: "",
        additionalDetails: { min: 5, max: 10 },
        isSaving: false,
      };

      const error = getQuestionError(question);
      expect(error).toBeUndefined();
    });
  });

  describe("SELECT type questions", () => {
    it("should return optionsError when there are less than 2 options", () => {
      const question: Question = {
        id: "1",
        title: "Select Question",
        type: QuestionType.SELECT,
        isMandatory: false,
        helpText: "",
        additionalDetails: { options: [{ id: "1", label: "Option 1" }] },
        isSaving: false,
      };

      const error = getQuestionError(question);
      expect(error).toEqual({
        additionalDetailsError: {
          optionsError: "At least two options are required for SELECT type",
        },
      });
    });

    it("should return optionsErrorMap when an option label is empty", () => {
      const question: Question = {
        id: "1",
        title: "Select Question",
        type: QuestionType.SELECT,
        isMandatory: false,
        helpText: "",
        additionalDetails: {
          options: [
            { id: "1", label: "Option 1" },
            { id: "2", label: "" },
          ],
        },
        isSaving: false,
      };

      const error = getQuestionError(question);
      expect(error).toEqual({
        additionalDetailsError: {
          optionsErrorMap: { "2": "Option label is required" },
        },
      });
    });

    it("should return undefined when SELECT question is valid", () => {
      const question: Question = {
        id: "1",
        title: "Select Question",
        type: QuestionType.SELECT,
        isMandatory: false,
        helpText: "",
        additionalDetails: {
          options: [
            { id: "1", label: "Option 1" },
            { id: "2", label: "Option 2" },
          ],
        },
        isSaving: false,
      };

      const error = getQuestionError(question);
      expect(error).toBeUndefined();
    });
  });
});
