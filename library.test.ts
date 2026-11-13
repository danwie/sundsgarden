import { describe, test, expect } from "vitest";
import { findBook, checkOutBook, registerLoan } from "./library";

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

  test("checkOutBook throws when no copies are available", () => {
    expect(() =>
      checkOutBook({ title: "foundation", copiesAvailable: 0 }),
    ).toThrow("No copies available");
  });

  test("checkOutBook throws for a book without copiesAvailable", () => {
    expect(() => checkOutBook({ title: "dune" })).toThrow();
  });

  test("registerLoan returns the loan", () => {
    expect(registerLoan(1234, "dune", 7)).toEqual({
      loanId: 1234,
      title: "dune",
      memberId: 7,
    });
  });

  test("registerLoan throws when memberId is 0", () => {
    expect(() => registerLoan(1234, "dune", 0)).toThrow();
  });

  test("registerLoan throws when the title is not in the catalogue", () => {
    expect(() => registerLoan(1234, "harry potter", 7)).toThrow();
  });
});
