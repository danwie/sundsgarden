import { describe, test, expect } from "vitest";
import { findBook, checkOutBook } from "./library";

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

  test("checkOutBook returns a number", () => {
    const loanId = checkOutBook({ title: "dune", copiesAvailable: 3 });
    expect(typeof loanId).toBe("number");
  });

  test("checkOutBook returns a whole number", () => {
    const loanId = checkOutBook({ title: "dune", copiesAvailable: 3 });
    expect(Number.isInteger(loanId)).toBe(true);
  });

  test("checkOutBook returns a loan ID between 1000 and 9999", () => {
    const loanId = checkOutBook({ title: "dune", copiesAvailable: 3 });

    expect(loanId).toBeGreaterThanOrEqual(1000);
    expect(loanId).toBeLessThanOrEqual(9999);
  });
});
