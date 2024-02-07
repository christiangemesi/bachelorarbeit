#!/bin/bash

echo "Creating a new folder..."
mkdir thekre && cd thekre || { echo "Error: Unable to create or change into thekre folder"; exit 1; }
echo "Folder 'thekre' created and switched to."

echo "Cloning the repository..."
git clone https://gitlab.fhnw.ch/christian.gemesi/thek-re-2.git || { echo "Error: Unable to clone the repository"; exit 1; }
cd thek-re-2 || { echo "Error: Unable to change into thek-re-2 folder"; exit 1; }
echo "Repository cloned and switched to 'thek-re-2' folder."

echo "Copying the .env file into the folder..."
cp '..\..\.env' . || { echo "Error: Unable to copy the .env.production file"; exit 1; }
echo ".env file copied."

echo "Building the Docker image..."
docker compose build || { echo "Error: Unable to build the Docker image"; exit 1; }
echo "Docker image built successfully."

echo "Moving back to the parent folder..."
cd .. || { echo "Error: Unable to change into the parent folder"; exit 1; }
echo "Successfully moved back to the parent folder."

echo "Creating a new folder for deployment..."
mkdir deployment || { echo "Error: Unable to create the deployment folder"; exit 1; }
echo "Deployment folder created."

echo "Copying docker-compose.yml into the deployment folder..."
cp 'thek-re-2/docker-compose.yml' deployment/ || { echo "Error: Unable to copy docker-compose.yml"; exit 1; }
echo "docker-compose.yml copied into the deployment folder."

echo "Copying .env into the deployment folder..."
cp 'thek-re-2/.env' deployment/ || { echo "Error: Unable to copy the .env.production file"; exit 1; }
echo ".env file copied into the deployment folder."

echo "Removing the 'thek-re-2' folder..."
rm -rf thek-re-2 || { echo "Error: Unable to remove thek-re-2 folder"; exit 1; }
echo "'thek-re-2' folder removed."

echo "Changing into the deployment folder..."
cd deployment || { echo "Error: Unable to change into the deployment folder"; exit 1; }

echo "Starting the Docker container in the background..."
docker compose up -d || { echo "Error: Unable to start the Docker container"; exit 1; }
echo "Docker container started successfully."
