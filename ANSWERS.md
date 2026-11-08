## Exercise 1

PizzaSchema stopped the test, because vegetarian is not on the menu and the price is undefined. This is what the editor/TypeScript tells me by underlining menu["vegetarian"]. TypeScript know this, because it checks the code that I write. Vitest runs the code, because it runs JavaScript without type checking. Zod check the values at runtime and throws an error whitch causes the test to fail (red).

orderPizza("vegetarian") belongs to the integration test in pizzashop.integration.test.ts because it calls both createPizza, sendOrder and chargeCustomer. So it is a test to check that they work together. Unit tests only check that they work indpendently.

## Exercise 2

The spelling of error message used the word cutomer (customer) and that would not have been found without a test. The program didn't crash and TypeScript or editor didn't complain. This means I should test the exact texts and not only return values or what is thrown.

## Exercise 3

toEqual compares a structure. toBe compares single value. toBe would always fail when comparing structure, because two different structures with the same content are not equal.
