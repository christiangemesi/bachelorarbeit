#!/bin/bash

# Fetch changes from the remote repository
git fetch origin master

# Check if there are changes
if ! git diff --quiet origin/master; then
    echo "Changes detected. Rebuilding Docker container..."

    # Pull the latest changes from the remote repository and log errors
    git pull origin master 2>> test.log || { echo "Error: Unable to pull the latest changes"; exit 1; }

    # Build the Docker image and log errors
    docker compose build 2>> test.log || { echo "Error: Unable to build the Docker image"; exit 1; }

    # Stop the current Docker container if it's running and log errors
    docker compose down 2>> test.log || { echo "Error: Unable to stop the Docker container"; exit 1; }

    # Start the Docker container in the background and log errors
    docker compose up -d 2>> test.log || { echo "Error: Unable to start the Docker container"; exit 1; }

    # Remove dangling images so that the disk space doesn't get filled up
    docker rmi $(docker images -f "dangling=true" -q) 2>> test.log || { echo "Error: Unable to delete the Docker image"; exit 1; }

    echo "Docker container rebuilt and started successfully."
else
    echo "No changes detected. Docker container is up to date."
fi