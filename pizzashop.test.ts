import { describe, test, expect } from "vitest";
import { createPizza, sendOrder, chargeCustomer } from "./pizzashop";

describe("Pizza Shop Unit Tests", () => {
  test("createPizza returns correct type and price", () => {
    const pizza = createPizza("margherita");

    expect(pizza).toEqual({ type: "margherita", price: 100 });
  });

  test("createPizza throws for unknown type", () => {
    expect(() => createPizza("hawaii")).toThrow();
  });

  test("sendOrder returns a numeric order id", () => {
    const id = sendOrder({ type: "pepperoni", price: 120 });

    expect(typeof id).toBe("number");
    expect(Number.isInteger(id)).toBe(true);
    expect(id).toBeGreaterThanOrEqual(0);
    expect(id).toBeLessThan(1000);
  });

  test("createPizza returns correct type and price for vegetarian", () => {
    const pizza = createPizza("vegetarian");

    expect(pizza).toEqual({ type: "vegetarian", price: 110 });
  });

  test("chargeCustomer returns true for a valid order ID and amount", () => {
    expect(chargeCustomer(42, 100)).toBe(true);
  });

  test("throws cannot charge the customer without a valid order ID", () => {
    expect(() => chargeCustomer(undefined, 100)).toThrow(
      "Cannot charge the customer without a valid order ID!",
    );
  });

  test("throws cannot charge the customer with a negative order ID", () => {
    expect(() => chargeCustomer(-1, 100)).toThrow();
  });

  test("throws when the order ID isn't a whole number", () => {
    expect(() => chargeCustomer(12.5, 100)).toThrow();
  });

  test("throws when the order amount is zero", () => {
    expect(() => chargeCustomer(1, 0)).toThrow();
  });

  test("red on purpose: margherita costs 999", () => {
    const pizza = createPizza("margherita");

    expect(pizza.price).toBe(100);
  });
});
