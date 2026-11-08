import { describe, test, expect } from "vitest";
import { findBook } from "./library";

describe("Library Unit Tests", () => {
  test("findBook returns the book for dune", () => {
    expect(findBook("dune")).toEqual({ title: "dune", copiesAvailable: 3 });
  });
});
