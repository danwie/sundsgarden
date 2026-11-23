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

**Question:** Which event starts the new run on `week12/ci` after the merge?

The tests run twice for the same change. First on the pull request event, befor the merge. Then after the merge on the push event.

**Question:** Why is a red cross on the pull request better than one after merging?

A red cross on the pull request tells me the code is broken and I can fix it on my branch. If the red cross comes after merging, then the broken code is already in the shared branch. It is better to catch a problem early.

## Exercise 4

**Question:** Would this step have caught the _possibly null_ bug from Week 11, Exercise 9?

I did not do Exercise 9 in Week 11. But now I've read the assignment. If I understand it correctly, the bug was using a value that can be null without checking first. My guess is that the typecheck step would have caught it. Vitest would not, because it only runs the code and does not check types (unless you write a specific test for it).

## Exercise 5

**Question:** What's the difference between `npm ci` and `npm install`, and why does CI use `npm ci`?

npm ci installs exactly the versions in package-lock.json and it fails if package.json package-lock.json don't match. npm install starts from package.json and can pick newer versions inside the allowed ranges. If package-lock doesn't exist, npm install can create one using the latest versions. CI uses npm ci so every run gets exactly the same versions, and a new package version can't suddenly make CI red or green by itself.

## Exercise 6

**Question:** What does branch protection do that CI alone can't?

CI only runs the tests and shows a green or red mark. It doesn't stop anyone from merging. Branch protection makes the merge button grey/blocked while the required checks were failing. So CI finds the problem, and branch protection makes sure broken code can't be merged.

My repository is public. THe rule was enforced.
