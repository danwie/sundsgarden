## Exercise 1

**What do `on`, `runs-on`, `strategy.matrix` and `steps` do?**

- `on` says which events start the workflow, and for which branches. You can list several branches, not only "week/12/ci".
- `runs-on` chooses the machine the job runs on. "ubuntu-latest" is a temporary machine (virtual/docker?).
- `strategy.matrix` runs the same job several times with different values. Here it is one job per Node.js version.
- `steps` is the list of things a job does, in order: check out the code, install Node, run commands. If one step fails, the job stops and is marked red.

**Why did nothing happen when you only pushed the branch?**

GitHub starts a workflow if there is one or several workflow files in the .github/workflows directory and its "on" section matches. The workflow started after I committed "ci.yml" and pushed it to my repo. If there are several workflow files then they are run in parallell. They are independent of each other.
