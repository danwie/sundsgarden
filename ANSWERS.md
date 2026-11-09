## Exercise 1

PizzaSchema stopped the test, because vegetarian is not on the menu and the price is undefined. This is what the editor/TypeScript tells me by underlining menu["vegetarian"]. TypeScript know this, because it checks the code that I write. Vitest runs the code, because it runs JavaScript without type checking. Zod check the values at runtime and throws an error whitch causes the test to fail (red).

orderPizza("vegetarian") belongs to the integration test in pizzashop.integration.test.ts because it calls both createPizza, sendOrder and chargeCustomer. So it is a test to check that they work together. Unit tests only check that they work indpendently.

## Exercise 2

The spelling of error message used the word cutomer (customer) and that would not have been found without a test. The program didn't crash and TypeScript or editor didn't complain. This means I should test the exact texts and not only return values or what is thrown.

## Exercise 3

toEqual compares a structure. toBe compares single value. toBe would always fail when comparing structure, because two different structures with the same content are not equal.

## Exercise 4

Yes, the test could pass by luck, because a test only checks one of the 9000 possible numbers. If the code was wrong only some of the time, a single call would probably miss it. The test would be better if it was calling the function many times in a loop and checking the range every time. First I thought a loop through all the possible values would be best, but that would also be slow and inefficiant.A better solution would be to check the lower and upper part of the range, where the limits are. That is probably where an error would be located.

## Exercise 6

The error is thrown inside checkOutBook, but borrowBook does not catch it, so it goes up to the test. The functions after the one that throws, like registerLoan, never run. This is good, because no loan is registered when something fails earlier in the chain. This shows that an error in one function stops the whole chain and the error is unchanged, so I can test the whole chain by only calling borrowBook.
