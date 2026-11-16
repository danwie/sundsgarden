## Exercise 1

The command docker ps shows a list of all running containers. The list has columns: CONTAINER ID, IMAGE, COMMAND, CREATED, STATUS, PORTS and NAMES. The STATUS column shows if the container is running, and for how long. The PORTS column shows 0.0.0.0:9000->9000/tcp. This means that port 9000 on my computer is forwarded to port 9000 inside the container.

Running SonarQube in Docker means I don’t have to install it and its dependencies on my computer. Everything runs inside a container.

## Excercise 2

My project "passed". SonarQube found 0 issues: 0 in Security, 0 in Reliability and 0 in Maintainability, and 0 security hotspots. The coverage was 0.0%, and the duplication was 5.8%. SonarQube also showed a warning that the Community Build doesn’t scan for injection vulnerabilities like SQL injection and XSS.

## Exercise 3

My scan found 0 issues (as I said in excercise 2). So I had no issues to read and describe. I am moving on to the next exercise.

My SonarQube groups issues by:

- Security. It is about code that could be exploited, like a hard-coded password or token in the source code, or an SQL query built from user input.
- Reliability. It is about code that can break or behave incorrectly. Like reading a value when it can be null.
- Maintainability. Is the code easy to read and change, and not too complex. Maby also if it has comments.

SonarQube reads the code, but doesn't run it. Tests test the code before deploying it, but only the tests that I have defined. Sentry catch errors that actually happens.

## Exercise 4

If someone find my SonarQube token in package.json on GitHub, they could use it to authenticate against my SonarQube server. With a database password someone could connect to the database and read, change or in worst case scenario delete all the data. A Sentry DSN is less dangerous, because it only lets people send events to my project, not read them. Also: Git keeps the whole history. Even if I remove a secret it is still in the history. This means a secret that was pushed to GitHub has to be replaced by a new.

It is better to put settings like the project key in sonar-project.properties because the file is part of the project and is committed to Git, so everyone uses the same settings.

### Notes (these were tricky to find)

- **Scanner command:** In my version of `@sonar/scan` (5.1.0) the command is called `sonar-scanner-npm`, not `sonar`. The assignment's `dotenv -- sonar` did not work for me, so my script is `"sonar": "dotenv run -- sonar-scanner-npm"`.
- **dotenv-cli syntax:** In my version of `dotenv-cli` (11.1.0) the command needs the word `run`: `dotenv run -- ...` instead of `dotenv -- ...`. Without it I only got the usage text.
- **Node path:** The scanner's built-in Node.js did not start on my computer, so I added `sonar.nodejs.executable=/opt/homebrew/bin/node` to `sonar-project.properties`. This path probably only works on my machine.
- **Source folder:** My code is in the root and not in `src`, so I used `sonar.sources=.`.

## Exercise 5

In my project the numbers barely changed. Issues stayed at 0, coverage stayed at 0.0% and the quality gate still passed. The only number that changed was duplications, from 5.8% to 7.6%. I think this is because the test files are no longer counted as normal code (the log shows 9 files checked for duplication instead of 14), so the same duplicated code is a bigger share of fewer lines.

I did not really experience the problem the assignment describes. My .gitignore already excluded node_modules, so SonarQube never scanned downloaded code, and I have no generated code in my source folder.

In general it is a problem when a tool reports issues in code you didn’t write, because you can’t fix it, and the real problems in your own code drown in noise. However, scanning other people’s code can be useful on purpose, for example to judge the quality of a library before using it, or to find bugs and send a pull request to an open source project.
