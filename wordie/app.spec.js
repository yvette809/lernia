/**
 * --- TESTER ---
 * I used unit test because it is only a single function which is to be tested
 * I tested if the right error message is placed correctly
 * I tested if the lenght of guess and correct word are the same
 * I tested if the right message is obtained if input field is empty
 
**/

import { describe, expect, it } from "@jest/globals";
import { getIncorrectWords } from "./utils/wordFeedback.js";

describe("the function getIncorrectWords()", () => {
  test('Check if the results "incorrect, misplaced, correct" are in the right place', () => {
    const result = getIncorrectWords("renir", "river");
    const expected = [
      { letter: "r", result: "correct" },
      { letter: "e", result: "misplaced" },
      { letter: "n", result: "incorrect" },
      { letter: "i", result: "misplaced" },
      { letter: "r", result: "correct" },
    ];

    expect(result).toEqual(expected);
  });

  test("if word length of guess and correct word are equal", () => {
    const result = getIncorrectWords("riv", "river");
    const expected = "Both inputs must have the same length!";
    expect(result).toBe(expected);
  });

  test("if guess input is empty", () => {
    const result = getIncorrectWords("", "river");
    const expected = "Input cannot be empty";
    expect(result).toBe(expected);
  });
});
