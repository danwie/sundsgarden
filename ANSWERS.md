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
