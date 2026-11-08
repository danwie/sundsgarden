import { describe, test, expect } from "vitest";

import {
  PizzaTypeSchema,
  PizzaSchema,
  AmountSchema,
  OrderIdSchema,
} from "./pizzashop";

describe("Schema tests", () => {
  test("PizzaTypeSchema accepts margherita", () => {
    expect(PizzaTypeSchema.parse("margherita")).toBe("margherita");
  });

  test("PizzaTypeSchema does not accept Margherita with a capital M", () => {
    expect(() => PizzaTypeSchema.parse("Margherita")).toThrow();
  });
});
