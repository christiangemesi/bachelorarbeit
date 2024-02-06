# ThekRe

ThekRe is a web application for the FHNW campus library to manage their theme boxes. 
It got setup by Maurice Meier and Nick Koch in the course of an IP5 Project and now got extended with Features by
Christian Gémesi and Ramanan Rasaiah in the course of an IP6 Project.

## Table of content
[Installation](#installation)
- [Installation Development Environment](#Installation Development Environment)
- [Put the Application Live](#Installation Dockerized Environment)


## Installation
### Installation Development Environment
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

### Put the Application Live

> 1. Install [Docker](https://www.docker.com/) <br>
> 2. Follow the Installation instructions from below <br>
>```
>  i.   Create a new folder (Windows: right click -> New -> Folder, Linux: mkdir <<folder>>)
>  ii.  Copy "thekre_docker.sh" into the created folder (Windows: Copy the file, Linux: vim thekre_docker.sh -> paste the content -> save the file with :wq!)
>  iii. Create a .env file in the same folder with the content shown below at ".env file:" (Windows: just copy the file, Linux: vim .env -> paste the content -> save the file with :wq!)
>  iv.  The Structure should look like this:
>   -folder
>   |- thekre_docker.sh
>   |- .env
>  iv.  Make sure that docker is running (Windows: search for Docker Desktop and open it, Linux: check if the service is running with "docker ps", if no service is running start it with "sudo systemctl start docker")
>  iv.  Change into the folder with the thekre_docker.sh (Windows: double click on the folder, Linux: cd <<folder>>)
>  v.   Run the thekre_docker.sh (Windows: double click on the file, Linux: ./thekre_docker.sh)
>
>  You might be asked to enter login credentials for git
>```
> 3. Open the application in your browser at http://127.0.0.1/user <br>
> Note: If the application is run for the first time the database needs to be importet manually. (see step 7 of the [Installation Development Environment](#Installation Development Environment))  <br>
> Note 2: The thekre_admin user does also need to be created if run for the first time. (see step 7 of the [Installation Development Environment](#Installation Development Environment)) <br>
> Note 3: If the Website is not shown correctly (e.g. no CSS) clear the browser cache and reload the page. <br>
> 
>.env file:
> ``` 
> APP_NAME=ThekRe
> APP_ENV=local
> APP_KEY=base64:OXiQSLCrUXYKg8PH2U7ulTM8cg8e5POG+H+wX4hXK4A=
> APP_DEBUG=true
> APP_LOG_LEVEL=debug
> APP_URL=http://127.0.0.1
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
> DATABASE_USERNAME="thekre_user"
> DATABASE_PASSWORD="cSCdrkd1VNEbk8PW"
> #Database root user in mysql per default is root
> DATABASE_ROOT_PASSWORD="156deq1ws56dwq5e245864e5w6qe45w61cw5dw"
> ``` 