#!/bin/bash

# Get current date
current_date=$(date +"%Y-%m-%d %H:%M:%S")

# Fetch changes from the remote repository
git fetch origin master

# Check if there are changes
if ! git diff --quiet HEAD origin/master; then
    echo "$current_date - Changes detected. Rebuilding Docker container..."

    # Pull the latest changes from the remote repository
    git pull origin master 2>&1 || {
        error_message=$(git pull origin master 2>&1)
        echo "$current_date - Error: $error_message";
        exit 1;
    }

    # Build the Docker image
    docker compose build 2>&1 || {
        error_message=$(docker compose build 2>&1)
        echo "$current_date - Error: $error_message";
        exit 1;

    # Stop the current Docker container if it's running
    docker compose down 2>&1 || {
        error_message=$(docker compose down 2>&1)
        echo "$current_date - Error: $error_message";
        exit 1;
    }

    # Start the Docker container in the background
    docker compose up -d 2>&1 || {
        error_message=$(docker compose up -d 2>&1)
        echo "$current_date - Error: $error_message";
        exit 1;

    # Remove dangling images so that the disk space is not consumed
    docker rmi $(docker images --filter "dangling=true" -q --no-trunc) 2>&1 || {
        error_message=$(docker rmi $(docker images --filter "dangling=true" -q --no-trunc) 2>&1)
        echo "$current_date - Error: $error_message";
        exit 1;
    }

    echo "$current_date - Docker container rebuilt and started successfully."
else
    echo "$current_date - No changes detected. Docker container is up to date."
fi
