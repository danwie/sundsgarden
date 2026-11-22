## Exercise 1

**What do `on`, `runs-on`, `strategy.matrix` and `steps` do?**

- `on` says which events start the workflow, and for which branches. You can list several branches, not only "week/12/ci".
- `runs-on` chooses the machine the job runs on. "ubuntu-latest" is a temporary machine (virtual/docker?).
- `strategy.matrix` runs the same job several times with different values. Here it is one job per Node.js version.
- `steps` is the list of things a job does, in order: check out the code, install Node, run commands. If one step fails, the job stops and is marked red.

**Why did nothing happen when you only pushed the branch?**

GitHub starts a workflow if there is one or several workflow files in the .github/workflows directory and its "on" section matches. The workflow started after I committed "ci.yml" and pushed it to my repo. If there are several workflow files then they are run in parallell. They are independent of each other.

## Exercise 2

**How many jobs ran, and why?**

Three jobs ran: "build (22.x)", "build (24.x)" and "build (26.x)". One job per version in the matrix.

**Pizza and library test names**

- Pizza: `pizzashop.test.ts` and `pizzashop.integration.test.ts`
- Library: `library.test.ts` and `library.integration.test.ts`
- Schemas: `schemas.test.ts`

**Question: Why can a test pass on your laptop but fail in CI?**

CI runs on a clean machine that is not the same as my laptop. My laptop has a newer Node version and things that happen to be installed. In my first run, Node 18 failed with "The requested module 'node:util' does not provide an export named 'styleText'", because Vitest 5 needs a newer Node. My laptop did not show the error because it runs a newer version. Other common causes are files that are only on my computer (like ".env" or an ignored file) and differences in operating system.

## Exercise 3

**Question:** Why is a red cross on the pull request better than one after merging?

A red cross on the pull request tells me the code is broken and I can fix it on my branch. If the red cross comes after merging, then the broken code is already in the shared branch. It is better to catch a problem early.
