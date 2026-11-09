import { describe, test, expect } from "vitest";
import { borrowBook } from "./library";

describe("Library Integration Tests", () => {
  test("borrowBook returns a loan with the right title and member ID", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.title).toBe("dune");
    expect(loan.memberId).toBe(7);
  });
});
