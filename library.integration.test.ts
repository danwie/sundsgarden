import { describe, test, expect } from "vitest";
import { borrowBook } from "./library";

describe("Library Integration Tests", () => {
  test("borrowBook returns a loan with the right title and member ID", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.title).toBe("dune");
    expect(loan.memberId).toBe(7);
  });

  test("borrowBook returns a loan ID between 1000 and 9999", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.loanId).toBeGreaterThanOrEqual(1000);
    expect(loan.loanId).toBeLessThanOrEqual(9999);
  });

  test("borrowBook throws when there are no copies available", () => {
    expect(() => borrowBook("foundation", 7)).toThrow("No copies available");
  });

  test("borrowBook throws for an invalid member ID", () => {
    expect(() => borrowBook("dune", -1)).toThrow();
  });
});
