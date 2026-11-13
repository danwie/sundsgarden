import { orderPizza } from "./pizzashop";
import { describe, test, expect } from "vitest";

describe("Pizza Shop Integration Test", () => {
  test("should successfully complete a full pizza order", () => {
    const result = orderPizza("margherita");
    expect(result).toBe(true);
  });

  test("orderPizza returns true for a valid pizza", () => {
    const result = orderPizza("pepperoni");

    expect(result).toBe(true);
  });

  test("should order a vegetarian pizza", () => {
    expect(orderPizza("vegetarian")).toBe(true);
  });
});
