#!/bin/bash

# Check if clone_address.txt exists
if [ ! -f "clone_address.txt" ]; then
    echo "Error: clone_address.txt file not found."
    exit 1
fi

# Check if rebuild_docker_container.sh already exists
if [ -f "rebuild_docker_container.sh" ]; then
    echo "Error: rebuild_docker_container.sh already exists. Please delete it before running this script."
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
git clone "$clone_address" . || { echo "Error: Unable to clone the repository"; exit 1; }
echo "Repository cloned and switched to 'thek-re-2' folder."

echo "Copying the .env file into the folder..."
cp '../.env' . || { echo "Error: Unable to copy the .env.production file"; exit 1; }
echo ".env file copied."

echo "Building the Docker image..."
docker compose build || { echo "Error: Unable to build the Docker image"; exit 1; }
echo "Docker image built successfully."

echo "Starting the Docker container in the background..."
docker compose up -d || { echo "Error: Unable to start the Docker container"; exit 1; }
echo "Docker container started successfully."

# Navigate back to the parent directory
cd ..

# Create rebuild_docker_container.sh script
cat <<'EOF' > rebuild_docker_container.sh
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
        echo "$current_date - Error: $error_message"
        exit 1
    }

    # Build the Docker image
    docker compose build 2>&1 || {
        error_message=$(docker compose build 2>&1)
        echo "$current_date - Error: $error_message"
        exit 1
    }

    # Stop the current Docker container if it's running
    docker compose down 2>&1 || {
        error_message=$(docker compose down 2>&1)
        echo "$current_date - Error: $error_message"
        exit 1
    }

    # Start the Docker container in the background
    docker compose up -d 2>&1 || {
        error_message=$(docker compose up -d 2>&1)
        echo "$current_date - Error: $error_message"
        exit 1
    }

    # Remove dangling images so that the disk space is not consumed
    docker rmi $(docker images --filter "dangling=true" -q --no-trunc) 2>&1 || {
        error_message=$(docker rmi $(docker images --filter "dangling=true" -q --no-trunc) 2>&1)
        echo "$current_date - Error: $error_message"
        exit 1
    }

    echo "$current_date - Docker container rebuilt and started successfully."
else
    echo "$current_date - No changes detected. Docker container is up to date."
fi
EOF

# Grant executable rights to the script
chmod +x rebuild_docker_container.sh
