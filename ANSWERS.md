## Exercise 1

1. Automation - The steps are always the same (export, email).
2. Agent - The AI has to decide for itself which steps it needs.
3. Automation - The path is always the same.
4. Automation - A fixed rule with nothing to decide.
5. Agent - It chooses which tools to use depending on the situation.
6. Automation - Always the same steps.

**Question:** Scenario 3 uses AI but is still not an agent. Explain why, using the video's example of the Reddit summary.

Even though ChatGPT writes the summary, the workflow is fixed and decided in advance. It is an automation that happens to contain an AI step, not an agent that decides its own path.

**Question:** The video says: "Build the simplest thing that works." Why is an automation often a better choice than an agent? Think about cost, speed, and how easy it is to test.

An automation is cheaper because it uses few or no tokens. It is faster because there is no thinking between the steps. Testing: automation is easier to test.

## Exercise 2

**Question:** What happened when the context window was 1, and when there was no memory? Explain what the context window length means.

With a context window of 1, the agent only kept the most recent interaction. I told it my name was Daniel, then my last name, and when I asked "What is my first name?" it said it did not know. Without memory, the agent did not remember my name at all. When I connected the memory again it started empty, so I had to tell the agent my name again before it was stored.

**Question:** Why not just set the context window to 1000? Think about what the model has to read on every message, and what that costs.

On every message, the agent sends everything in the history to the AI model, and the model has to read all of it again. A large context window potentially sends a lot of text each time. Since we pay per token and there also is a tier both for paid and free AI models, it is important to keep the text size to a minimum. A large text means it cost more money and it can also be slower. A small context window keeps only what the agent needs for the current conversation. It is also possible to compress a conversation to keep the text to a minimum. I find that a lot of AI models like to talk more than necessary, so it is always a good idea to instruct the model to only talk when actually needed. And only ask for information that is needed to solve a problem.

## Exercise 3:

**Question:** Which questions made the agent use the weather tool, and which didn't? Nobody told the agent when to use the tool. How did it decide?

The umbrella question and the jacket question made the agent use "Get weather". The question "What is 12 times 7?" did not. Nobody told the agent when to use the tool. The model reads the tool's name and description (here "Get weather") together with my question, and decides by itself if the tool is useful. A simple math question does not need weather data.

**Question:** This is the difference between an agent and the automation from Exercise 1. Explain it using what you saw in the logs.

In an automation, the steps are fixed and every step runs every time. In the logs the steps was different depending on my question. For the weather questions the log showed Memory, Gemini, Get weather, Memory, Gemini. For the multiplication, the log only showed Memory, Gemini, Memory.

**Question:** Read the recap about MCP again. In this exercise, the weather tool only works inside n8n. What would change if OpenWeatherMap offered an MCP server instead? Name one advantage.

If OpenWeatherMap offered an MCP server, the weather tool would not be tied to n8n. Any AI app with an MCP client could connect to the same server and use the same weather tools, without having to build a separate connection.

## Exercise 4:

**Question:** Explain API, HTTP request and function in your own words. Use the vending machine from the video, **and** one example from your own Express API.

An API is like the buttons on a vending machine: it is the list of things I am allowed to ask for, and I do not need to know how the machine works inside. An HTTP request is me actually pressing the buttons and getting something back, for example with the method GET or POST. A function is one specific button. The one specific thing I can ask for.

In my own Express API, the whole set of routes is the API, GET /books is a function, and sending that request from Insomnia is an HTTP request.

**Question:** What happened to your agent's answer when you changed the tool's description to something vague, like `tool`? Try it, then change it back.

When the description was just tool, the agent answered the question about running outside using only the weather. It never mentioned air quality In the log I could see that it did not call the air quality tool at all. It could not understand that the tool was about air quality. A clear name and description is what tells the agent when the tool is useful.
