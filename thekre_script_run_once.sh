#!/bin/bash

# Check if clone_address.txt exists
if [ ! -f "clone_address.txt" ]; then
    echo "Error: clone_address.txt file not found."
    exit 1
fi

# Read the clone address from clone_address.txt
clone_address=$(<clone_address.txt)

echo "Creating deployment folder..."
mkdir deployment || { echo "Error: Unable to create the deployment folder"; exit 1; }
echo "Deployment folder created and switched to."

echo "Switching to the deployment folder..."
cd deployment || { echo "Error: Unable to switch to the deployment folder"; exit 1; }
echo "Switched to the deployment folder."

echo "Cloning the repository..."
sudo git clone "$clone_address" . || { echo "Error: Unable to clone the repository"; exit 1; }
echo "Repository cloned and switched to 'thek-re-2' folder."

echo "Copying the .env file into the folder..."
cp '../.env' . || { echo "Error: Unable to copy the .env.production file"; exit 1; }
echo ".env file copied."

echo "Building the Docker image..."
sudo docker compose build || { echo "Error: Unable to build the Docker image"; exit 1; }
echo "Docker image built successfully."

echo "Starting the Docker container in the background..."
sudo docker compose up -d || { echo "Error: Unable to start the Docker container"; exit 1; }
echo "Docker container started successfully."

# Grant executable rights to the script
sudo chmod +x rebuild_docker_container.sh
