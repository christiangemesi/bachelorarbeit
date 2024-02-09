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
git clone "$clone_address" . || { echo "Error: Unable to clone the repository"; exit 1; }
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

# Change directory to one folder outside of the deployment folder
cd ..

# Create a new script file with the provided content
sudo cat <<EOF > rebuild_docker_container.sh
#!/bin/bash

# Define the path to the Docker project directory
DOCKER_PROJECT_DIR="/home/matrix/thekre_webportal/deployment"

# Change directory to the Docker project directory
cd "$DOCKER_PROJECT_DIR" || { echo "Error: Unable to change into the Docker project directory"; exit 1; }

# Fetch changes from the remote repository
git fetch origin master

# Check if there are changes
if ! git diff --quiet origin/master; then
    echo "Changes detected. Rebuilding Docker container..."

    # Stop the current Docker container if it's running
    sudo docker compose -f "$DOCKER_PROJECT_DIR/docker-compose.yml" down || { echo "Error: Unable to stop the Docker container"; exit 1; }

    # Pull the latest changes from the remote repository
    sudo git pull origin master || { echo "Error: Unable to pull the latest changes"; exit 1; }

    # Build the Docker image
    sudo docker compose -f "$DOCKER_PROJECT_DIR/docker-compose.yml" build || { echo "Error: Unable to build the Docker image"; exit 1; }

    # Start the Docker container in the background
    sudo docker compose -f "$DOCKER_PROJECT_DIR/docker-compose.yml" up -d || { echo "Error: Unable to start the Docker container"; exit 1; }

    echo "Docker container rebuilt and started successfully."
else
    echo "No changes detected. Skipping Docker container rebuild."
fi
EOF

# Grant executable rights to the script
sudo chmod +x rebuild_docker_container.sh

echo "Script 'rebuild_docker_container.sh' created with rebuild instructions."

# Schedule the execution of rebuild_docker_container.sh using cron
# Check if the cronjob is already present
if ! crontab -l | grep -q "rebuild_docker_container.sh"; then
    # Add cronjob to run rebuild_docker_container.sh every 5 minutes
    (crontab -l ; echo "*/5 * * * * /home/matrix/thekre_webportal/rebuild_docker_container.sh") | crontab -
    echo "Cronjob installed successfully."
else
    echo "Cronjob is already installed."
fi
