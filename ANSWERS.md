## Exercise 1

The command docker ps shows a list of all running containers. The list has columns: CONTAINER ID, IMAGE, COMMAND, CREATED, STATUS, PORTS and NAMES. The STATUS column shows if the container is running, and for how long. The PORTS column shows 0.0.0.0:9000->9000/tcp. This means that port 9000 on my computer is forwarded to port 9000 inside the container.

Running SonarQube in Docker means I don’t have to install it and its dependencies on my computer. Everything runs inside a container.

## Excercise 2

My project "passed". SonarQube found 0 issues: 0 in Security, 0 in Reliability and 0 in Maintainability, and 0 security hotspots. The coverage was 0.0%, and the duplication was 5.8%. SonarQube also showed a warning that the Community Build doesn’t scan for injection vulnerabilities like SQL injection and XSS.
