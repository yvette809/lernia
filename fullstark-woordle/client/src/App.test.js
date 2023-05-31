/* import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

import { describe, expect, it } from "@jest/globals";
import { getWordFeedback } from "./utils/Feedback";

describe("the function getWordFeedback()", () => {
  test('Check if the results "incorrect, misplaced, correct" are in the right place', () => {
    const result = getWordFeedback("renir", "river");
    const expected = [
      { letter: "r", result: "correct" },
      { letter: "e", result: "misplaced" },
      { letter: "n", result: "incorrect" },
      { letter: "i", result: "misplaced" },
      { letter: "r", result: "correct" },
    ];

    expect(result).toEqual(expected);
  });
});

