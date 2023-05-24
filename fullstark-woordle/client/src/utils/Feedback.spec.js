import { describe, expect, it } from "@jest/globals";
import { getWordFeedback } from "./Feedback";

describe("the function getWordFeedback()", () => {
  test("Check if cat + car returns correct, correct, incorrect ", () => {
    const result = getWordFeedback("cat", "car");
    const expected = [
      { letter: "c", result: "correct" },
      { letter: "a", result: "correct" },
      { letter: "t", result: "incorrect" },
    ];

    expect(result).toEqual(expected);
  });
  test("Check if the words love + love returns correct in all letters", () => {
    const result = getWordFeedback("love", "love");
    const expected = [
      { letter: "l", result: "correct" },
      { letter: "o", result: "correct" },
      { letter: "v", result: "correct" },
      { letter: "e", result: "correct" },
    ];

    expect(result).toEqual(expected);
  });

  test("Check if rac + car  returns misplaced, correct, misplaced ", () => {
    const result = getWordFeedback("rac", "car");
    const expected = [
      { letter: "r", result: "misplaced" },
      { letter: "a", result: "correct" },
      { letter: "c", result: "misplaced" },
    ];

    expect(result).toEqual(expected);
  });

  test("Check if cow + lan  returns incorrect, incorrect, incorrect", () => {
    const result = getWordFeedback("cow", "lan");
    const expected = [
      { letter: "c", result: "incorrect" },
      { letter: "o", result: "incorrect" },
      { letter: "w", result: "incorrect" },
    ];

    expect(result).toEqual(expected);
  });
});
