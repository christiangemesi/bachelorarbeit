# ThekRe

ThekRe is a web application for the FHNW campus library to manage their theme boxes. 
It got setup by Maurice Meier and Nick Koch in the course of an IP5 Project and now got extended with Features by
Christian Gémesi and Ramanan Rasaiah in the course of an IP6 Project.

## Table of content
[Installation](#installation)
- [Installation Development Environment](#Installation Development Environment)
- [Set the Application Live on the FHNW Server](#Installation Dockerized Environment)


## Installation
### Installation Development Environment
In the following section, we will guide you through the installation of the development environment on your local machine.
> 1. Install [XAMPP](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.4/) <br>
> Download xampp-windows-x64-8.2.4-0-VS16-installer.exe from the above Link and run the installer.
> - At Selected Components only MySQL and phpMyAdmin are required. <br>
> - The Installation folder needs to be C:\xampp <br>
> - Language: Choose your preferred language <br>
> - Click Next and wait for the installation to finish. <br>

> 2. Install [Composer](https://getcomposer.org/download/) <br>
> Download Composer-Setup.exe from the Link above and run the installer. (direct Download Link: [here](https://getcomposer.org/Composer-Setup.exe))
> - Developer mode: Uncheck the box
> - The Installation path needs to be C:\xampp\php\php.exe <br>
> - Add PHP to PATH: Check the box, if existent <br> 
> - No Proxy settings needed <br>
> - Click Next and wait for the installation to finish. <br>

> 3. Install IDE <br>
> We used PhpStorm as our IDE. You can download it [here](https://www.jetbrains.com/phpstorm/) <br>
> Note: As a student/teacher you can apply to get a free premium license
> - No special settings needed <br>

> 4. Clone the Repository <br>
> Open your IDE (in our case PHPStorm) and copy the HTTPS Link from the Project [here](https://gitlab.fhnw.ch/christian.gemesi/thek-re-2/) <br>
<img src="images_readme/clone_via_http_link.png" alt="Clone via HTTP Link" width="1000"> <br>
> In PHPStorm go to File -> New -> Project from Version Control -> Git and paste the Link into the URL field.
> Clone the Project into the Directory "C:\xampp\htdocs\thek-re-2" (thek-re-2 Folder needs to be created) <br>

> 5. Setup Development EMail <br>
> - We used Gmail as our Email provider. Ensure you create a new fresh Gmail account, as we will place our password in plain text within the .env file. This precaution is taken to mitigate potential issues if the file is accidently pushed to Git. <br>
> - To setup, you first need to enable 2-Step Verification on your Gmail account. You can do this [here](https://myaccount.google.com/security)<br>
> - Direct Link to 2-Step Verification: [here](https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome) <br>
> - After that you can create an App Password. This password will be placed in your .env file. You can get the Password [here](https://myaccount.google.com/apppasswords) by setting an App name. Copy the password into fresh txt file to store it until we have the .env file created. <br>

> 6. Setup .env file <br>
> Create a new file called .env in C:\xampp\htdocs\thek-re-2 (Since you have the PHPStorm IDE Open you can rightclick on the thek-re-2 folder and select New -> File -> .env) and add the following values: <br>
> Replace "<<YOUR NAME HERE >>" with the name which your emails will be sent by. (We used Development) <br>
> Replace <<YOUR EMAIL HERE>> with the email address you created in step 5 <br>
> Replace <<YOUR APP PASSWORD HERE >> with the app password you created in step 5 <br>
> 
> ```
> APP_NAME=ThekRe
> APP_ENV=local
> APP_KEY=base64:OXiQSLCrUXYKg8PH2U7ulTM8cg8e5POG+H+wX4hXK4A=
> APP_DEBUG=true
> APP_LOG_LEVEL=debug
> APP_URL=http://127.0.0.1:8000
> 
> UNIQUE_SERVER_URL=themenkisten/
> 
> BROADCAST_DRIVER=log
> CACHE_DRIVER=file
> SESSION_DRIVER=file
> QUEUE_DRIVER=sync
> 
> REDIS_HOST=127.0.0.1
> REDIS_PASSWORD=null
> REDIS_PORT=6379
> 
> PUSHER_APP_ID=
> PUSHER_APP_KEY=
> PUSHER_APP_SECRET=
>
> EMAILS_FROM_NAME="<<YOUR NAME HERE>>"
> MAIL_DRIVER=smtp
> MAIL_HOST=smtp.gmail.com
> MAIL_PORT=587
> MAIL_USERNAME="<<YOUR EMAIL HERE>>"
> MAIL_PASSWORD="<<YOUR APP PASSWORD HERE>>"
> MAIL_ENCRYPTION=tls
> 
> DATABASE_DRIVER=mysql
> DATABASE_HOST=127.0.0.1
> DATABASE_PORT=3306
> DATABASE=thekre
> DATABASE_USERNAME=thekre_admin
> DATABASE_PASSWORD=cSCdrkd1VNEbk8PW
> 
> DATABASE_ROOT_PASSWORD="156deq1ws56dwq5e245864e5w6qe45w61cw5dw"
> ```

> 7. Setup Database <br>
> - Open XAMPP Control Panel and start Apache and MySQL <br>
> - Go to http://127.0.0.1/phpmyadmin/ and create a new database called "thekre" and select "utf8_general_ci" <br>
> ![create_database_thekre.JPG](images_readme%2Fcreate_database_thekre.JPG)
> - Import the database from the file database\thekre_empty.sql <br>
> ![import_db_phpmyadmin.png](images_readme%2Fimport_db_phpmyadmin.png)
> - Now the database thekre with the 11 tables got generated. <br>
> ![tables_thekre.png](images_readme%2Ftables_thekre.png)
> - After that we have to create a new database user for the system access. Go back to the homepage and then choose "Benutzerkonten" in the navigation bar and klick Benutzerkonten hinzufügen. <br>
> ![add_user_phpmyadmin.png](images_readme%2Fadd_user_phpmyadmin.png)
> - The hostname is localhost. The username and password are defined in the .env file. <br>
> ![add_user_name_password_phpmyadmin.png](images_readme%2Fadd_user_name_password_phpmyadmin.png)
> - Choose the following user privilege's and klick OK.
> ![user_privileges_phpmyadmin.png](images_readme%2Fuser_privileges_phpmyadmin.png)


> 8. Run the application <br>
> - Open the file C:\xampp\php\php.ini with any texteditor (we chose editor.txt) and search for the line ";extension=zip". Remove the ";" at the beginning of the line to enable the extension. <br>
> - In Your IDE open the terminal (if not already open, the terminal is located on the bottom) change into the cloned repository directory (cd <<thek-re-2>> if not already inside), and run the following commands: <br>
> - ```composer install``` <br>
> - ```php artisan key:generate``` <br>
> - ```php artisan serve``` <br>
> - Now you can open the application in your browser at http://127.0.0.1:8000/ You should see the following page: <br>
> ![homepage.jpg](images_readme%2Fhomepage.jpg)
> - PS: the username and password for the admin under http://127.0.0.1:8000/admin/loginForm are: username: "root@localhost", password: "root@localhost" <br>
> - PS: the password for the poweruser under http://127.0.0.1:8000/poweruser/loginForm is: "poweruser" <br>

### Setup the Dockerized Environment (Linux: Live on FHNW Server, Windows: Local Machine)
In the following section, we will guide you through the installation of the dockerized environment. Following the Linux setup will set the application Live <br>
Following the Windows setup will setup the application on your local machine (not live). <br>

> 1. Install [Docker](https://www.docker.com/) <br>
>    - On Windows: Download the Docker Desktop Installer from [here](https://www.docker.com/products/docker-desktop) and run the installer. <br>
>    - On Linux: Install by running this command `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin` <br>
>    You can verify the installation by running `docker --version` in a Terminal or run `Docker Desktop` on Windows <br>

> 2. Preparing the Folder Structure <br>
>    - On Linux:
>      1. `mkdir <<ThekRe_Webportal>>`
>      2.  `cd <<ThekRe_Webportal>>`
>      3. `vim thekre_docker.sh` and paste the content from the file thekre_docker.sh
>      4.  type `:wq` to save the file
>      5.  `vim .env` and paste the content from the file .env (Shown below: ".env file Production Environment")
>      6.  type `:wq` to save the file
> 
>    - On Windows:
>      1. `right click -> New -> Folder` (Name: ThekRe_Webportal)
>      2.  Copy "thekre_docker.sh" into the created folder
>      3.  Create a .env file and paste the content from the file .env (Shown below: ".env file Dockerized Development Environment")
>    
>  - After doing the steps above for the respective OS, the folder structure should look like this:
> ```
>  -folder
>  |-thekre_docker.sh
>  |-.env
>  ```

> 3. Run docker <br>
>   - On Linux:
>      1.  you can check if the service is running with `docker ps`, if no service is running start it with `sudo systemctl start docker`)
>   - On Windows:
>      2. Open Docker Desktop and wait for the service to start

> 4. Run the thekre_docker.sh <br>
>    - On Linux:
>     1. `chmod +x thekre_docker.sh` (to make the file executable)
>     2. `sudo ./thekre_docker.sh` (to run the file)
>   - On Windows:
>     1. Double click on the thekre_docker.sh file
>     
>  Note: You might be asked to enter login credentials for git

> 3. Open the application in your browser
>  - On Linux: https://www.fhnw.ch/de/die-fhnw/bibliotheken/bibliothek-brugg-windisch/themenkisten
>  - On Windows: http://127.0.0.1/user <br>

> 4. Notes to keep in mind: <br>
>   1.  If the application is run for the first time the database needs to be importet manually. (see step 7 of the [Installation Development Environment](#Installation Development Environment))  <br>
>   2.  If the application is run for the first time the thekre_admin user does also need to be created. (see step 7 of the [Installation Development Environment](#Installation Development Environment)) <br>
>   3.  If the Website is not shown correctly (e.g. no CSS) clear the browser cache and, or history and reload the page. <br>
>   4.  If setup on a local machine other than the FHNW Server. You will not be able to send emails over the FHNW-E-Mail. If nevertheless you want to test the email functionality, please setup the email part as shown in step 5 and 6 of the [Installation Development Environment](#Installation Development Environment). You can replace the part of the .env file for the email with the following one: <br>
>       ``` 
>       EMAILS_FROM_NAME="<<YOUR NAME HERE>>"
>       MAIL_DRIVER=smtp
>       MAIL_HOST=smtp.gmail.com
>       MAIL_PORT=587
>       MAIL_USERNAME="<<YOUR EMAIL HERE>>"
>       MAIL_PASSWORD="<<YOUR APP PASSWORD HERE>>"
>       MAIL_ENCRYPTION=tls
>       ```

> **Files** <br>
>.env file Production Environment:
> ``` 
> APP_NAME=ThekRe
> APP_ENV=local
> APP_KEY=base64:OXiQSLCrUXYKg8PH2U7ulTM8cg8e5POG+H+wX4hXK4A=
> APP_DEBUG=true
> APP_LOG_LEVEL=debug
> APP_URL=https://www.fhnw.ch/de/die-fhnw/bibliotheken/bibliothek-brugg-windisch/themenkisten
> 
> UNIQUE_SERVER_URL=themenkisten/
> 
> BROADCAST_DRIVER=log
> CACHE_DRIVER=file
> SESSION_DRIVER=file
> QUEUE_DRIVER=sync
> 
> REDIS_HOST=127.0.0.1
> REDIS_PASSWORD=null
> REDIS_PORT=6379
> 
> PUSHER_APP_ID=
> PUSHER_APP_KEY=
> PUSHER_APP_SECRET=
> 
> EMAILS_FROM_NAME='Campusbibliothek Brugg-Windisch TESTUMGEBUNG'
> MAIL_USERNAME="bibliothek.windisch@fhnw.ch"
> MAIL_PASSWORD=
> MAIL_DRIVER=smtp
> MAIL_HOST=lmailer.ict.fhnw.ch
> MAIL_PORT=25
> MAIL_ENCRYPTION=null
> 
> DATABASE_DRIVER=mysql
> DATABASE_HOST=mysql
> DATABASE_PORT=3306
> DATABASE=thekre
> DATABASE_USERNAME="thekre_admin"
> DATABASE_PASSWORD="cSCdrkd1VNEbk8PW"
> #Database root user in mysql per default is root
> DATABASE_ROOT_PASSWORD="156deq1ws56dwq5e245864e5w6qe45w61cw5dw"
> ``` 
> 
> thekre_docker.sh file:
> ```
> #!/bin/bash
> echo "Creating a new folder..."
> mkdir thekre && cd thekre || { echo "Error: Unable to create or change into thekre folder"; exit 1; }
> echo "Folder 'thekre' created and switched to."
> 
> echo "Cloning the repository..."
> git clone https://gitlab.fhnw.ch/christian.gemesi/thek-re-2.git || { echo "Error: Unable to clone the repository"; exit 1; }
> cd thek-re-2 || { echo "Error: Unable to change into thek-re-2 folder"; exit 1; }
> echo "Repository cloned and switched to 'thek-re-2' folder."
> 
> echo "Copying the .env file into the folder..."
> cp '..\..\.env' . || { echo "Error: Unable to copy the .env.production file"; exit 1; }
> echo ".env file copied."
> 
> echo "Building the Docker image..."
> docker compose build || { echo "Error: Unable to build the Docker image"; exit 1; }
> echo "Docker image built successfully."
> 
> echo "Moving back to the parent folder..."
> cd .. || { echo "Error: Unable to change into the parent folder"; exit 1; }
> echo "Successfully moved back to the parent folder."
> 
> echo "Creating a new folder for deployment..."
> mkdir deployment || { echo "Error: Unable to create the deployment folder"; exit 1; }
> echo "Deployment folder created."
> 
> echo "Copying docker-compose.yml into the deployment folder..."
> cp 'thek-re-2/docker-compose.yml' deployment/ || { echo "Error: Unable to copy docker-compose.yml"; exit 1; }
> echo "docker-compose.yml copied into the deployment folder."
> 
> echo "Copying .env into the deployment folder..."
> cp 'thek-re-2/.env' deployment/ || { echo "Error: Unable to copy the .env.production file"; exit 1; }
> echo ".env file copied into the deployment folder."
> 
> echo "Removing the 'thek-re-2' folder..."
> rm -rf thek-re-2 || { echo "Error: Unable to remove thek-re-2 folder"; exit 1; }
> echo "'thek-re-2' folder removed."
> 
> echo "Changing into the deployment folder..."
> cd deployment || { echo "Error: Unable to change into the deployment folder"; exit 1; }
> 
> echo "Starting the Docker container in the background..."
> docker compose up -d || { echo "Error: Unable to start the Docker container"; exit 1; }
> echo "Docker container started successfully."
> ```