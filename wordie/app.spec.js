import { describe, expect, it } from "@jest/globals";
import { getIncorrectWords } from "./utils/wordFeedback.js";

describe("the function getIncorrectWords()", () => {
   it("returns all correct for a correct guess", () => {
    const result = getIncorrectWords("river", "river");
    const expected = [
      { letter: "r", result: "Correct" },
      { letter: "i", result: "Correct" },
      { letter: "v", result: "Correct" },
      { letter: "e", result: "Correct" },
      { letter: "r", result: "Correct" },
    ];
    expect(result).toStrictEqual(expected);
  }); 

  it("shows the right character message of misplaced", () => {
    const result = getIncorrectWords("relov", "lover");
    const expected = [
      { letter: "r", result: "Misplaced" },
      { letter: "e", result: "Misplaced" },
      { letter: "l", result: "Misplaced" },
      { letter: "o", result: "Misplaced" },
      { letter: "v", result: "Misplaced" },
    ];
    expect(result).toStrictEqual(expected);
  }); 

  test('Check if the results "incorrect, misplaced, correct" are in the right place', () => {
    const result = getIncorrectWords("renir", "river");
    const expected = [
        { letter: 'r', result: 'Correct' },
        { letter: 'e', result: 'Misplaced' },
        { letter: 'n', result: 'Incorrect' },
        { letter: 'i', result: 'Misplaced' },
        { letter: 'r', result: 'Correct' }
    ];

    expect(result).toEqual(expected);
});
});
