## Exercise 1

The command docker ps shows a list of all running containers. The list has columns: CONTAINER ID, IMAGE, COMMAND, CREATED, STATUS, PORTS and NAMES. The STATUS column shows if the container is running, and for how long. The PORTS column shows 0.0.0.0:9000->9000/tcp. This means that port 9000 on my computer is forwarded to port 9000 inside the container.

Running SonarQube in Docker means I don’t have to install it and its dependencies on my computer. Everything runs inside a container.
