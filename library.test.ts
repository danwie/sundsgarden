import { describe, test, expect } from "vitest";
import { findBook } from "./library";

describe("Library Unit Tests", () => {
  test("findBook returns the book for dune", () => {
    expect(findBook("dune")).toEqual({ title: "dune", copiesAvailable: 3 });
  });

  test("findBook returns foundation even though it has 0 copies", () => {
    expect(findBook("foundation")).toEqual({
      title: "foundation",
      copiesAvailable: 0,
    });
  });

  test("findBook throws for harry potter since it is not in the catalogue", () => {
    expect(() => findBook("harry potter")).toThrow();
  });

  test("findBook throws when the title is not a string", () => {
    expect(() => findBook(42)).toThrow();
  });
});
