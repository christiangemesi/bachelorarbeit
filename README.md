# ThekRe

ThekRe is a web application for the FHNW campus library to manage their theme boxes. 
It got setup by Maurice Meier and Nick Koch in the course of an IP5 Project and now got extended with Features by
Christian Gémesi and Ramanan Rasaiah in the course of an IP6 Project.

## Table of content
[Installation](#installation)
- [Installation Development Environment with XAMPP](#Installation Development Environment with XAMPP)
- [Installation Development Environment with Docker](#Installation Development Environment with Docker)
- [Set the Application Live on the FHNW Server](#Set the Application Live on the FHNW Server)

[Architecture](#architecture)
- [Class Diagram](#class-diagram)
- [Database](#database)
- [Order Status](#order-status)
- [External Libraries](#external-libraries)



## Installation
### Installation Development Environment with XAMPP
In the following section, we will guide you through the installation of the development environment via XAMPP on your local machine. We prefer this method for development as the application loads quicker and it has hot-reloading. <br>
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
> Clone the Project into the Directory "C:\xampp\htdocs\thek-re-2" (thek-re-2 Folder needs to be created) <br> <br>
> If phpstorm just got installed, the setup is slightly different. After opening PHPStorm you need to click on "Get from Version Control" and paste the Link into the URL field. The directory will also need to be created manually and selected. See images below: <br>
> ![img.png](images_readme/newphpstorm_open_from_version_control.png) <br>
> ![img_1.png](images_readme/newphpstorm_clone_repo_into_folder.png)

> 5. Setup Development EMail <br>
> - We used Gmail as our Email provider. Ensure you create a new fresh Gmail account, as we will place our password in plain text within the .env file. This precaution is taken to mitigate potential issues if the file is accidently pushed to Git. <br>
> - To setup, you first need to enable 2-Step Verification on your Gmail account. You can do this [here](https://myaccount.google.com/security)<br>
> - Direct Link to 2-Step Verification: [here](https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome) <br>
> - After that you can create an App Password. This password will be placed in your .env file. You can get the Password [here](https://myaccount.google.com/apppasswords) by setting an App name. Copy the password into fresh txt file to store it until we have the .env file created. <br>

> 6. Setup .env file <br>
> Create a new file called .env in C:\xampp\htdocs\thek-re-2 (Since you have the PHPStorm IDE Open you can rightclick on the thek-re-2 folder and select New -> File -> .env) and add the following values: <br>
> Replace \<\<YOUR NAME HERE\>\> with the name which your emails will be sent by. (We used Development) <br>
> Replace \<\<YOUR EMAIL HERE\>\> with the email address you created in step 5 <br>
> Replace \<\<YOUR APP PASSWORD HERE\>\> with the app password you created in step 5 <br>
> 
> 
> ```
> APP_NAME=ThekRe
> APP_ENV=local
> APP_KEY=base64:OXiQSLCrUXYKg8PH2U7ulTM8cg8e5POG+H+wX4hXK4A=
> APP_DEBUG=false
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

### Installation Development Environment with Docker
In the following section, we will guide you through the installation of the dockerized environment on your local machine. Docker is used to set the application live on the FHNW Server. So it is good to also have set it up once locally for better understanding.<br>
To make the installation easier we mainly used the User Interface of the Windows OS. <br>
Keep in mind that there is no hot-reload for the dockerized environment. If you want to see changes you need to stop the container and start it again. <br>

> 1. Install [Docker](https://www.docker.com/) <br>
>    - Download the Docker Desktop Installer from [here](https://www.docker.com/products/docker-desktop) and run the installer. <br>
>    - You can verify the installation by running `docker --version` in a Terminal or run `Docker Desktop` on Windows <br>

> 2. Preparing the Folder Structure <br>
> The Following steps should be done in your IDE, since otherwise youd be needed to download additional software to create a .sh file. <br>
>
>      1. `right click on the root directory (thek-re-2) -> New -> Directory` (Name: thekre_webportal)
>      2.  In the folder create a new file called `thekre_docker.sh` and paste the content from the file below:
>          ```
>          #!/bin/bash
>          echo "Creating a new folder..."
>          mkdir thekre && cd thekre || { echo "Error: Unable to create or change into thekre folder"; exit 1; }
>          echo "Folder 'thekre' created and switched to."
>          
>          echo "Cloning the repository..."
>          git clone https://gitlab.fhnw.ch/christian.gemesi/thek-re-2.git || { echo "Error: Unable to clone the repository"; exit 1; }
>          cd thek-re-2 || { echo "Error: Unable to change into thek-re-2 folder"; exit 1; }
>          echo "Repository cloned and switched to 'thek-re-2' folder."
>          
>          echo "Copying the .env file into the folder..."
>          cp '..\..\.env' . || { echo "Error: Unable to copy the .env.production file"; exit 1; }
>          echo ".env file copied."
>          
>          echo "Building the Docker image..."
>          docker compose build || { echo "Error: Unable to build the Docker image"; exit 1; }
>          echo "Docker image built successfully."
>          
>          echo "Moving back to the parent folder..."
>          cd .. || { echo "Error: Unable to change into the parent folder"; exit 1; }
>          echo "Successfully moved back to the parent folder."
>          
>          echo "Creating a new folder for deployment..."
>          mkdir deployment || { echo "Error: Unable to create the deployment folder"; exit 1; }
>          echo "Deployment folder created."
>          
>          echo "Copying docker-compose.yml into the deployment folder..."
>          cp 'thek-re-2/docker-compose.yml' deployment/ || { echo "Error: Unable to copy docker-compose.yml"; exit 1; }
>          echo "docker-compose.yml copied into the deployment folder."
>          
>          echo "Copying .env into the deployment folder..."
>          cp 'thek-re-2/.env' deployment/ || { echo "Error: Unable to copy the .env.production file"; exit 1; }
>          echo ".env file copied into the deployment folder."
>          
>          echo "Removing the 'thek-re-2' folder..."
>          rm -rf thek-re-2 || { echo "Error: Unable to remove thek-re-2 folder"; exit 1; }
>          echo "'thek-re-2' folder removed."
>          
>          echo "Changing into the deployment folder..."
>          cd deployment || { echo "Error: Unable to change into the deployment folder"; exit 1; }
>          
>          echo "Starting the Docker container in the background..."
>          docker compose up -d || { echo "Error: Unable to start the Docker container"; exit 1; }
>          echo "Docker container started successfully."
>          ```
>      3.  In the folder create a new file called  `.env` and paste the content from the file below:
>           ```
>           APP_NAME=ThekRe
>           APP_ENV=local
>           APP_KEY=base64:OXiQSLCrUXYKg8PH2U7ulTM8cg8e5POG+H+wX4hXK4A=
>           APP_DEBUG=true
>           APP_LOG_LEVEL=debug
>           APP_URL=http://127.0.0.1
>           
>           UNIQUE_SERVER_URL=themenkisten/
>           
>           BROADCAST_DRIVER=log
>           CACHE_DRIVER=file
>           SESSION_DRIVER=file
>           QUEUE_DRIVER=sync
>           
>           REDIS_HOST=127.0.0.1
>           REDIS_PASSWORD=null
>           REDIS_PORT=6379
>           
>           PUSHER_APP_ID=
>           PUSHER_APP_KEY=
>           PUSHER_APP_SECRET=
>           
>           EMAILS_FROM_NAME="<<YOUR NAME HERE>>"
>           MAIL_DRIVER=smtp
>           MAIL_HOST=smtp.gmail.com
>           MAIL_PORT=587
>           MAIL_USERNAME="<<YOUR EMAIL HERE>>"
>           MAIL_PASSWORD="<<YOUR APP PASSWORD HERE>>"
>           MAIL_ENCRYPTION=tls
>           
>           DATABASE_DRIVER=mysql
>           DATABASE_HOST=mysql
>           DATABASE_PORT=3306
>           DATABASE=thekre
>           DATABASE_USERNAME=thekre_admin
>           DATABASE_PASSWORD=cSCdrkd1VNEbk8PW
>           
>           DATABASE_ROOT_PASSWORD="156deq1ws56dwq5e245864e5w6qe45w61cw5dw"
>           ```
>      4. Replace all the "<< >>" with the respective values. See 5. and 6. of the [Installation Development Environment with XAMPP](#Installation Development Environment with XAMPP). <br>
>    
>  - After doing the steps above for the respective OS, the folder structure should look like this:
> ```
>  -folder
>  |-thekre_docker.sh
>  |-.env
>  ```

> 3. Run docker <br>
>    Open Docker Desktop and wait for the service to start. After the service is running, Docker Desktop should look like this: <br>
>    ![img.png](images_readme/Docker_Desktop.png)

> 4. Run the thekre_docker.sh <br>
>    
>    1. Open git bash and change into the directory where thekre_werbportal is located. (`cd Path/From/C/To/thekre_webportal`) <br>
>       Note that git bash needs to be installed. You can download it [here](https://git-scm.com/download/win) <br>
>    2. type "./thekre_docker" (This will execute the script) <br>
>       You can see the running container in the Docker Desktop <br>
>    ![img.png](images_readme/running_docker_container.png)
>        
>
> Note: You might be asked to enter login credentials for git (You can not use your Password, you need to create a Personal Access Token. See the instructions [here](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token))

> 3. Open the application in your browser <br>
>  http://127.0.0.1/user <br>
> 
> If the application is run for the first time the database needs to be importet manually. (see step 7 of the [Installation Development Environment with XAMPP](#Installation Development Environment with XAMPP))  <br>

> 4. Take the application offline <br>
>    To take the application offline you need to stop the Docker container. You can do this by clicking the "Stop" button in the Docker Desktop <br>
>    ![img.png](images_readme/stop_docker_container.png)

> 4. Notes to keep in mind: <br>
>   2.  If the application is run for the first time the thekre_admin user does also need to be created. (see step 7 of the [Installation Development Environment with XAMPP](#Installation Development Environment with XAMPP)) <br>
>   3.  If the Website is not shown correctly (e.g. no CSS) clear the browser cache and, or history and reload the page. <br>
>   4.  If the application got taken offline, and you want to start it again, you can do so by deleting the thekre folder and running the thekre_docker.sh again or by clicking the "Start" button in the Docker Desktop <br>
>   ![img.png](images_readme/start_docker_container.png)

## Set the Application Live on the FHNW Server
In the following section, we will guide you through the installation of the dockerized environment. This will set the application Live on the FHNW Server. This setup is only needed to do once. <br>

> 0. Connect to the FHNW Server <br>
>    - Connect to the FHNW Server via SSH <br>

> 1. Install [Docker](https://www.docker.com/) <br>
>    - Check if Docker is already installed by running `docker --version` in the Terminal. If so, skip to the next step. <br>
>    - Install Docker by running this command `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin` (this will install docker and all necessary plugins) <br>

> 2. Preparing the Folder Structure <br>
>      1. `mkdir thekre_webportal` (to create a new folder)
>      2.  `cd thekre_webportal` (to change into the folder)
>      3. `vim thekre_script_run_once.sh` (to create a new file and open it with vim)
>      4.  click `i` to enter insert mode and enter the content from /scripts/thekre_script_run_once.sh
>      5. click `esc` to exit insert mode and type `:wq` to save the file
>      6. type `vim .env` (to create a new file and open it with vim)
>      7. click `i` to enter the insert mode and paste the content from the file below. (Replace all login Credentials with new ones!) <br>
>      - Replace the \<\<HERE_COMES_URL\>\> with the URL of the application. (liveserver: https://www.fhnw.ch/de/die-fhnw/bibliotheken/bibliothek-brugg-windisch/themenkisten, testserver: server1120.cs.technik.fhnw.ch) <br>
>      - Replace the \<\<HERE COMES DATABASE USERNAME\>\> with the username of the database user. (like: thekre_admin) <br>
>      - Replace the \<\<HERE COMES DATABASE PASSWORD\>\> with the password of the database user. (like: dajlskjlklk232lkjSD) <br>
>      - Replace the \<\<HERE COMES DATABASE ROOT PASSWORD\>\> with the password of the root user in mysql. (like: sdljkapsdj2kjkld2lkjdjl22j2JD=FDSJKLD231) <br>
>           ``` bash
>          APP_NAME=ThekRe
>          APP_ENV=local
>          APP_KEY=base64:OXiQSLCrUXYKg8PH2U7ulTM8cg8e5POG+H+wX4hXK4A=
>          APP_DEBUG=true
>          APP_LOG_LEVEL=debug
>          APP_URL=<<HERE_COMES_URL>>
>          
>          UNIQUE_SERVER_URL=themenkisten/
>          
>          BROADCAST_DRIVER=log
>          CACHE_DRIVER=file
>          SESSION_DRIVER=file
>          QUEUE_DRIVER=sync
>          
>          REDIS_HOST=127.0.0.1
>          REDIS_PASSWORD=null
>          REDIS_PORT=6379
>          
>          PUSHER_APP_ID=
>          PUSHER_APP_KEY=
>          PUSHER_APP_SECRET=
>          
>          EMAILS_FROM_NAME='Campusbibliothek Brugg-Windisch TESTUMGEBUNG'
>          MAIL_USERNAME="bibliothek.windisch@fhnw.ch"
>          MAIL_PASSWORD=
>          MAIL_DRIVER=smtp
>          MAIL_HOST=lmailer.ict.fhnw.ch
>          MAIL_PORT=25
>          MAIL_ENCRYPTION=null
>          
>          DATABASE_DRIVER=mysql
>          DATABASE_HOST=mysql
>          DATABASE_PORT=3306
>          DATABASE=thekre
>          DATABASE_USERNAME="<<HERE COMES DATABASE USERNAME>>"
>          DATABASE_PASSWORD="<<HERE COMES DATABASE PASSWORD>>"
>          #Database root user in mysql per default is root
>          DATABASE_ROOT_PASSWORD="<<HERE COMES DATABASE ROOT PASSWORD>>"
>           ``` 
>      6.  click `esc` to exit insert mode and type `:wq` to save the file 
>      7.  type `vim clone_address.txt` (to create a new file and open it with vim)
>      8.   click `i` to enter the insert mode and paste the content from the file below. This file contains the clone address of the repository with the token. This is required to automatically clone the repository. (so the Server doesnt ask for login credentials) <br>
>      9.    ```txt
>            https://user:<<TOKEN>>@git@gitlab.fhnw.ch:thekre/ThekRe.git
>            ```
>            Replace << TOKEN>> with the Project Access Token. That token can be generated by going to the project in Gitlab, On the left side clickiing on Settings -> Access Tokens: <br>
>            ![img.png](images_readme/going_to_access_token.png) <br>
>            Click "Add new token" and fill in the form as followed as shown in the picture below. Choose the Expiration date to be 1 year in the future (thats the maximum) and click "Create project access token". <br>
>            ![img.png](images_readme/create_access_token.png) <br>
>            Now you can copy the token and paste it into the clone_address.txt file. <br>
>            ![img_1.png](images_readme/copy_access_token.png)
>            After pasting the token into the file, click `esc` to exit insert mode and type `:wq` to save the file <br> <br>
> 
>            Note: This Token as we created it is only valid for 1 year. (this is also the maximum duration) After that you need to create a new one. Any pushes to the repository will not be possible without a valid token. <br> <br>

>    After doing the steps above the folder structure should look like this:
>   ```
>    -folder
>    |-thekre_script_run_once.sh
>    |-.env
>    |-clone_address.txt
>    ```
>    Explenations for the files:
>    - thekre_script_run_once.sh: creates the deploymend folder, runs the docker containers, creates rebuild_docker_container.sh which will be scheduled with a cronjob to run every day at 00:00
>    - .env: contains the environment variables for the application like logindata
>    - clone_address.txt: contains the clone address of the repository with the token

> 3. Add User to the Docker Group <br>
>    To run Docker commands without sudo, add your user to the docker group. You can do this by running the following command: <br>
>    ```sudo usermod -a -G docker $USER``` <br>
>    After that you need to logout and login again to apply the changes. <br>

> 4. Setup the Mail Server (LMailer) <br>
> The Setup of this Mail Server is a combination of our findings and the official documentation of the FHNW from the [official_documention_lmailer.pdf](readme_docs%2Fofficial_documention_lmailer.pdf) <br>
> To send the order confirmation e-mail we use the FHNW intern LMailer.
> This setup only needs to be done once. If youd change to another server, youd need to follow theese steps: <br>
>
>    1.  Unistall exim4: ```sudo apt-get remove exim4 exim4-base``` <br>
>    2.  Install postfix: ```sudo apt-get install postfix libsasl2-modules ca-certificates``` <br> <br>
>    3.  type```sudo vim /etc/postfix/main.cf``` (to open the file and paste the content from the file below with vim and Replace HERE_COMES_THE_HOSTNAME_OF_THE_SERVER with the hostname of the server. (liveserver: server1121.cs.technik.fhnw.ch, testserver: server1120.cs.technik.fhnw.ch))<br>
>    ```bash
>     # See /usr/share/postfix/main.cf.dist for a commented, more complete version
>     
>     
>     # Debian specific:  Specifying a file name will cause the first
>     # line of that file to be used as the name.  The Debian default
>     # is /etc/mailname.
>     #myorigin = /etc/mailname
>     
>     smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)
>     biff = no
>     
>     # appending .domain is the MUA's job.
>     append_dot_mydomain = no
>     
>     # Uncomment the next line to generate "delayed mail" warnings
>     #delay_warning_time = 4h
>     
>     readme_directory = no
>     
>     # See http://www.postfix.org/COMPATIBILITY_README.html -- default to 2 on
>     # fresh installs.
>     compatibility_level = 2
>     
>     # TLS parameters
>     smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
>     smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
>     smtpd_tls_security_level=may
>     
>     smtp_tls_CApath=/etc/ssl/certs
>     smtp_tls_security_level=may
>     smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache
>     
>     
>     smtpd_relay_restrictions = permit_mynetworks permit_sasl_authenticated defer_unauth_destination
>     myhostname = HERE_COMES_THE_HOSTNAME_OF_THE_SERVER
>     alias_maps = hash:/etc/aliases
>     alias_database = hash:/etc/aliases
>     myorigin = /etc/mailname
>     mydestination = $myhostname, server1120.cs.technik.fhnw.ch, localhost.cs.technik.fhnw.ch, , localhost
>     relayhost =
>     mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
>     mailbox_size_limit = 0
>     recipient_delimiter = +
>     inet_interfaces = all
>     inet_protocols = all
>     
>    ```
>    4. type ```sudo vim /etc/postfix/sender_canonical``` (to open the file with vim and add the lines below. This has to be done, so that all local E-Mails get forwarded to the collective address.) <br>
>    ```bash
>    @<hostname>.imvs.technik.fhnw.ch admin.imvs.windisch@fhnw.ch
>    @<hostname> admin.imvs.windisch@fhnw.ch
>    @localhost admin.imvs.windisch@fhnw.ch
>    ```
>    5. Now execute the following commands to create the hash files: <br>
>   ```bash
>    postmap hash:/etc/aliases
>   ```
>   ```bash
>    postmap hash:/etc/postfix/recipient_canonical
>   ```
>   ```bash
>    postmap hash:/etc/postfix/sender_canonical
>   ````
>   **After every change of the files the hashes have to generated again.**

> 5. Run docker <br>
>     1.  you can check if the service is running with `docker ps`, if no service is running start it with `sudo systemctl start docker`

> 6. Run the thekre_script_run_once.sh <br>
>     1. `sudo chmod +x thekre_script_run_once.sh` (to make the file executable)
>     2. `./thekre_script_run_once.sh` (to run the file)

> 7. Setup automatic updates <br>
>    For the application to always have the lates version running, we need to setup a cronjob. The cronjob will run the rebuild_docker_container.sh script every day at 00:00. Execute the following command to set it up: <br>
>    1.  ```crontab -e``` (to open the file) <br>
>    2. click `i` to enter the insert mode and add the following line to the file: <br>
>        ```0 0 * * * cd /home/matrix/thekre_webportal && sh rebuild_docker_container.sh >> /home/matrix/thekre_webportal/rebuild.log```  (this will also log any errors into rebuild.log) <br>
>    3. click `esc` to exit insert mode and type `:wq` to save the file <br>
>    
>   This will run the rebuild_docker_container.sh script every day at 00:00. The script looks for changes in git, pulls them, rebuilds and reruns the containers and removes the previous images so that we dont run out of space. <br>

> 8. Open the application in your browser <br>
>    liveserver: https://www.fhnw.ch/de/die-fhnw/bibliotheken/bibliothek-brugg-windisch/themenkisten/user <br>
>    testserver: server1120.cs.technik.fhnw.ch/user <br>
>
>    If the application is run for the very first time the database needs to be importet manually. (see step 7 of the [Installation Development Environment](#Installation Development Environment))  <br>
>    Setup is now complete. 9. Can be skipped and only needs to be done whenever you want to take the application offline. <br>

> 9. Take the application offline <br>
>    To take the application offline you need to stop the Docker container. You need to change into the deployment folder and run the following command: <br>
>    `docker compose down` <br>
> You also need to remove the cronjob. You can do this by running `crontab -e` click `i` to change to insert mode and deleting the line we added in step 6. (or you can comment it out by adding a `#` at the beginning of the line, `esc` to exit insert mode and type `:wq` to save the file) <br>

> 10. Notes to keep in mind: <br>
>    1. If the application is run for the very first time the thekre_admin user does also need to be created. (see step 7 of the [Installation Development Environment](#Installation Development Environment)) <br>
>    2. If the Website is not shown correctly (e.g. no CSS) and you get 404 errors, compose down the containers, and delete everything (inclusive the thekre_webportal folder). That problem seems to occur if you run the script multiple times. <br>

## Architecture
### Information to the Classes

| Class Name      | Description                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| UserController  | The class UserController is used to provide all the functionality for the user, like to see the availability from theme boxes or create an order. |
| AdminController | The class AdminController is used to provide all the functionality for the administrator, like the login or view the theme boxes.                 |
| Themebox        | The class Themebox provides all the theme box data.                                                                                               |
| Order           | The class Order provide all the order data.                                                                                                       |
| HourlyOrder     | The class HourlyOrder provides all data to hourly Orders.                                                                                         |
| Order Type      | The class Order Type provides all the different order type data.                                                                                  |
| Delivery        | The class Delivery provides all the different delivery type data.                                                                                 |
| Status          | The class Status provides all the different status type data.                                                                                     |
| Blocked_Period  | The class Blocked_Period provides all the different blocked period type data.                                                                     |
| EditMail        | The class Edit Mail provides all the different data for editing the mail templates.                                                               |
| PasswordReset   | The class PasswordReset provides all the different password reset type data.                                                                      |
| Login           | The class Login provides all the different Login type data.                                                                                       |

### Database

| Table              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| tbl_themebox       | The table tbl_themebox represents a renting object.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| tbl_status         | The table tbl_status represents a status from an order. There are five different status which an order can have:<br /><ul><li>“Neu” (a new order is created in the database)</li><li>“Bereit” (the theme box is ready to be supplied)</li><li>“im Umlauf” (the person, who created the order, has the theme box)</li><li>“zurück gekommen” (the theme box is back at the FHNW li-brary</li><li>“abgeschlossen” (the theme box is checked form a library staff and the order is completed)</li></ul> |
| tbl_delivery       | The table tbl_delivery represents the different delivery types:<br /><ul><li>“Abholung an Ort” (the theme box will be picked up)</li><li>“Lieferung an Aargauer Schulen” (the theme box will be delivered to a school)</li></ul>                                                                                                                                                                                                                                                                    |
| tbl_order          | The table tbl_order represents an order.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| tbl_hourly_order   | The table tbl_hourly_order represents an hourly order.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| tbl_mail           | The table tbl_mail represents the different mail template types:<br /><ul><li>"mail_delivery_school" (the theme box will be delivered to a school)</li><li>"mail_delivery_pickup" (the theme box will be picked up)</li><li>"mail_ready_pickup" (mail template, for sending pickup mail when delivery status gets changed to "Bereit")</li></ul>                                                                                                                                                    |
| tbl_blocked_period | The table tbl_blocked_period represents the blocked periods.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| tbl_login          | In the tbl_login the hashed and salted administrator password gets stored.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| tbl_password_reset | The table tbl_password_reset represents the password reset.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| tbl_order_type     | The table tbl_order_type represents the different order types:<br /><ul><li>“Tagesbestellung” (a daily order)</li><li>“Stundenbestellung” (an hourly order)</li></ul>                                                                                                                                                                                                                                                                                                                               |
| tbl_category       | The table tbl_category represents the different categories of renting objects.                                                                                                                                                                                                                                                                                                                                                                                                                      |

### Order Status

When a user orders a box, a new order record will be created in the database. An order refers always to one theme box. Each order has a status. There are 6 different statuses: new, ready, running, returned, closed and cancelled. In the following image, we can see the sequence from the order statuses. Those statuses are recorded in German in the database.

![status_diagram.png](images_readme%2Fstatus_diagram.png)

1. A **new** order is created, when the user places an order for a theme box over the order form. **New** is the initial status from an order.

2. The administrator sees the **new** order in their administration section.

3. The administrator prepares the theme box and check if its content is complete.

4. When the theme box is complete, the administrator sets the status from **new** to **ready**. When an item is missing in the theme box, the replacement is done in few hours.

5. The user comes to the library and picks the theme box up. The administrator sets the status from **ready** to **running**. The status is also set to **running** when the theme box is delivered to the customer.

6. On the end-date of the order, the user brings the theme box back to the library. The administrator sets the status from **running** to **returned**.

7. When the theme box content is complete, the administrator sets the status from **returned** to **closed**.

8. When the order gets cancelled, the administrator sets the status from **closed** to **cancelled**.

9. When there is a missing part in the theme box, the administrator marks the theme box as incomplete in the order tool.


### External Libraries

The following external libraries are used.

| Library                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| jQuery<br/>v1.12.4      | jQuery is a JavaScript library which offers the opportunity to manipulate the DOM. jQuery contains the module AJAX, which allows asynchronous JavaScript calls. The asynchronous JavaScript is used to load data from the back end without reloading the page.<br/>https://jquery.com/ |
| Bootstrap<br/>v3.3.7    | Bootstrap is a CSS library which offers a lot of different pattern for HTML elements. Bootstrap is used for different user interface elements such as but-tons or callback modals.<br/>https://getbootstrap.com/ |
| Fullcalendar<br/>v3.5.1 | Fullcalendar is an external JavaScript library to generate a month-view based calendar. This calendar is used as view element to create and edit an order.<br/>https://fullcalendar.io/ |
| DataTable<br/>v1.10.16  | DataTable is an external JavaScript library to generate a data table with a search module. This table is used to show all the orders and theme boxes.<br/>https://datatables.net/ |
| Summernote<br/>v0.8.9   | Summernote is a JavaScript library that helps you create WYSIWYG editors online.<br />https://summernote.org/ |


## Coding Conventions

### Boundaries and Parameter

| Parameter                             | Boundary / Value   |
| ------------------------------------- | ------------------ |
| theme box block days before order     | 7 days             |
| theme box block days after the return | 7 days             |
| personal data text length             | 0 - 100 characters |
| order data text length                | 0 - 100 characters |
| plz length                            | 4 digit            |
| phone number length                   | 10 digit           |
| order number                          | 8 characters       |
| amount of administrator accounts      | 1                  |
| calendar                              | Gregorian          |
