## Exercise 1

**Why must `instrument.js` be imported before everything else?**

Sentry is watching the other libraries.

**Why do we keep the DSN in `.env` instead of in the code?**

.env is in .gitignore and usually contains secrets. DSN is like a secret, because if it was public then others could push content to it. But - in some cases DSN can actually be public. If used on the client. But there is a setting in Sentry so that you can limit the usage to a specific hostname.

## Exercise 2

It contains: time and date, error type, tags (url, environment, os, level, browser user agent, interface_type, runtime.name, os.build, runtime, server_name), stack trace including the error, code and exact line that throws the error, context (memory, geography, locale, timezone, device info).

## Exercise 3

When the handler was above the routes it was run registered before anything happened, so that's why the error didn't transfer to Sentry. Express handles the routes in order, so handler needs to be at the bottom for it to know about the error.

## Exercise 4

Answer 1: In my routes I catch the errors myself, the error never travels to the Sentry handler. That's why I have to call captureException() myself.

Answer 2: Sentry only showed me 1 issue. After I did some experimenting with debug: true I found that if several of the same error occurs after one another, only the first one is sent to Sentry. This is called Dedupe and this behaviour can be turned off. If similar errors occurs Sentry groups them into issues. One issue can have several events. The benefit is that when solving issues, there is only one issue for each problem and it is possible to see when it started, how long it's been going on and how many times it has occured.

## Exercise 5

When I call Sentry.captureException(error), Sentry creates an event. The event automatically gets the breadcrumbs and tags that were set earlier in the same context, so I can see them when I open the issue. A breadcrumb is a event text that give context to what happened before the error. A tag is a word that can be used to group and filter events. Example: One team member can focus on fixing bugs for a specific tag.

## Exercise 6

The question does not name the second tool, so I assume it means logging - but I would be very interested in learning about similar tools to Sentry, especially if they are open source.

Logging gives me a simple view of what happens while the app runs. I can log anything, not only errors. But the problem is that nobody sees a log line unless they happen to look at the terminal, and usually the log line is gone when the terminal is closed. For example, when the database connection failed at startup, the error from testDbConnection() only showed up in my terminal, and nothing reached Sentry.

Sentry gives me what logging does not. It notifies me (and my team) when something breaks, so we don’t have to watch the server. It groups errors into one issue and I can se how often the problem happens, and for how long it has been going on. It also stores context with each issue and I can mark an issue as resolved when it is fixed.
