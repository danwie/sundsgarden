## Exercise 1

**Why must `instrument.js` be imported before everything else?**

Sentry is watching the other libraries.

**Why do we keep the DSN in `.env` instead of in the code?**

.env is in .gitignore and usually contains secrets. DSN is like a secret, because if it was public then others could push content to it. But - in some cases DSN can actually be public. If used on the client. But there is a setting in Sentry so that you can limit the usage to a specific hostname.
