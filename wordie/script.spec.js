import { describe, expect, it } from "@jest/globals";
import checkWord from "./script";
//import getIncorrectWords from "./script";

describe("the function checkWord()", () => {
  test("it should be successful", () => {
    document.body.innerHTML = ` <div class="buttons">
    <button class="refresh">Refresh Word</button>
    <button class="check">Check Word</button>
  </div>
`;
    let checkBtn = document.querySelector(".check");
    let result = checkBtn.attributes("click", checkWord("river", "river"));
    let refreshBtn = document.querySelector(".refresh");
    checkBtn.click();
    const expected = [
      "r/correct",
      "i/correct",
      "v/correct",
      "e/correct",
      "r/correct",
    ];
    console.log("expected", expected, checkBtn);
    expect(result).toStrictEqual(expected);
  });
});

/* describe("the function guessWord()", () => {
    it("returns the correct result for double letters where one is in the right place", () => {
      const result = guessWord("hallå", "cykla");
      const expected = [
        { letter: "h", result: "incorrect" },
        { letter: "a", result: "misplaced" },
        { letter: "l", result: "incorrect" },
        { letter: "l", result: "correct" },
        { letter: "å", result: "incorrect" }
      ];
      expect(result).toStrictEqual(expected);
    }); */
