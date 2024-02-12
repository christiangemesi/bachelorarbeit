#!/bin/bash

# Fetch changes from the remote repository
git fetch origin master

# Check if there are changes
if ! git diff --quiet origin/master; then
    echo "Changes detected. Rebuilding Docker container..."

    # Pull the latest changes from the remote repository
    git pull origin master || { echo "Error: Unable to pull the latest changes"; exit 1; }

    # Build the Docker image
    docker compose build || { echo "Error: Unable to build the Docker image"; exit 1; }

    # Stop the current Docker container if it's running
    docker compose down || { echo "Error: Unable to stop the Docker container"; exit 1; }

    # Start the Docker container in the background
    docker compose up -d || { echo "Error: Unable to start the Docker container"; exit 1; }

    echo "Docker container rebuilt and started successfully."
else
    echo "No changes detected. Docker container is up to date."
fi