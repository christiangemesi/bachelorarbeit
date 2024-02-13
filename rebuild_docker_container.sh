#!/bin/bash

# Get current date
current_date=$(date +"%Y-%m-%d %H:%M:%S")

# Fetch changes from the remote repository
git fetch origin master

# Check if there are changes
if ! git diff --quiet HEAD origin/master; then
    echo "$current_date - Changes detected. Rebuilding Docker container..."

    # Pull the latest changes from the remote repository
    git pull origin master || { echo "$current_date - Error: Unable to pull the latest changes"; exit 1; }

    # Build the Docker image
    docker compose build || { echo "$current_date - Error: Unable to build the Docker image"; exit 1; }

    # Stop the current Docker container if it's running
    docker compose down || { echo "$current_date - Error: Unable to stop the Docker container"; exit 1; }

    # Start the Docker container in the background
    docker compose up -d || { echo "$current_date - Error: Unable to start the Docker container"; exit 1; }

    # remove dangling images so that the disk space is not consumed
    docker rmi $(docker images --filter "dangling=true" -q --no-trunc) || { echo "$current_date - Error: Unable to remove dangling images"; exit 1; }

    echo "$current_date - Docker container rebuilt and started successfully."
else
    echo "$current_date - No changes detected. Docker container is up to date."
fi
