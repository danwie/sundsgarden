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

  test("PizzaTypeSchema accepts pepperoni, price 120", () => {
    expect(PizzaSchema.parse({ type: "pepperoni", price: 120 })).toEqual({
      type: "pepperoni",
      price: 120,
    });
  });

  test("PizzaSchema does not accept pepperoni without a price", () => {
    expect(() => PizzaSchema.parse({ type: "pepperoni" })).toThrow();
  });

  test("AmountSchema throws when argument is a string, even if it looks like a number", () => {
    expect(() => AmountSchema.parse("100")).toThrow();
  });
});
