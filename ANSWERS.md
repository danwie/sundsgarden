## Exercise 1

PizzaSchema stopped the test, because vegetarian is not on the menu and the price is undefined. This is what the editor/TypeScript tells me by underlining menu["vegetarian"]. TypeScript know this, because it checks the code that I write. Vitest runs the code, because it runs JavaScript without type checking. Zod check the values at runtime and throws an error whitch causes the test to fail (red).
