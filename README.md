# ThekRe

ThekRe is a web application for the FHNW campus library to manage their theme boxes.



## Table of content
[Installation](#installation)
  - [Install Ubuntu](#install-ubuntu)
    - [Update System](#update-system)
  - [Install Apache](#install-apache)
  - [Install PHP](#install-php)
  - [Install MySQL](#install-mysql)
  - [Install phpMyAdmin](#install-phpmyadmin)
  - [Source Code](#source-code)
  - [Administration](#administration)

[Architecture](#architecture)
  - [Class Diagram](#class-diagram)
  - [Database](#database)
  - [Order Status](#order-status)
  - [External Libraries](#external-libraries)

[Coding Conventions](#coding-conventions)
  - [Boundaries and Parameter](#boundaries-and-parameter)
  - [File Extensions](#file-extensions)
  - [File Content](#file-content)

[Naming Conventions](#naming-conventions)

  - [PHP](#php)
  - [HTML](#html)
  - [JS](#js)

[Support](#support)
  - [Issue Tracker](#issue-tracker)

[Roadmap](#roadmap)
  - [Ideas for Future Features/Extensions](#ideas-for-future-featuresextensions)
  - [Considerations for Extensions](#considerations-for-extensions)
    - [Database Extension](#database-extension)

    - [View Extensions](#view-extensions)

    - [New View](#new-view)

    - [Controller Extensions](#controller-extensions)

    - [New Controller](#new-controller)



## Installation

#### Install Ubuntu
We use [Ubuntu 18.04.1 LTS](https://www.ubuntu.com/download/desktop) with the standard installation. We need at least 10 GB of hard disk space and 2 GB RAM.

##### Update System

```bash
sudo apt-get update
sudo apt-get upgrade
```



#### Install Apache

```bash
sudo apt-get install apache2
```

To test the installation of apache, open http://ip-adress-server/ or http://localhost/ (local on the server or the VM) in a web browser you should get the following view.

![apache_default_page](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/apache_default_page.png)



#### Install PHP

We need to install PHP and some extensions.

``` bash
sudo apt-get install php php-mcrypt php-gd php-mbstring php-xml php-common php-zip php-mysql apache2-dev libapache2-mod-php php-curl php-gd php-json
```

You can test the installation with:

``` bash
sudo nano /var/www/html/info.php
```

This command creates a new file. Copy Paste the following code in to the file.

```bash
<?php
phpinfo();
?>
```

To test the installation of PHP and the extensions, open a web browser and type http://ip-adress-server/info.php or http://localhost/info.php (local on the server or the VM) and you should get the following view.

![php_default_page](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/php_default_page.png)

After the test the file can be deleted again.

```bash
sudo rm /var/www/html/info.php
```



#### Install MySQL

Install MySQL with the following command.

```bash
sudo apt-get install mysql-server
```

You get asked for a root Password. This can be set individually. The Password now is **4oZ3ackSg0RiU4M**.![config_mysql_password](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/config_mysql_password.png)

After selecting "OK" confirm the password.

With the following command you can test the installation:

```bash
mysql -u root -p
```

After the successful login you should get something like the following output:

![test_mysql](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/test_mysql.png)



#### Install phpMyAdmin

phpMyAdmin is a graphical interface for MySql and can be downloaded with the following command:

```bash
sudo apt-get install phpmyadmin
```

Set **apache2** as default web server:

![config_phpmyadmin_webserver](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/config_phpmyadmin_webserver.png)

Configure database for phpMyAdmin with **dbconfig-common**

![config_phpmyadmin_dbconfig](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/config_phpmyadmin_dbconfig.png)

Enter the same password as set in the MySql installation chapter.

![config_phpmyadmin_mysql_password](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/config_phpmyadmin_mysql_password.png)

To test the installation of phpMyAdmin, open http://ip-adress-server/phpmyadmin or http://localhost/phpmyadmin (local on the server or the VM) in a web browser you should get the following view.

![welcome_phpmyadmin](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/welcome_phpmyadmin.png)

If you get the following view:

![phpmyadmin_not_found](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/phpmyadmin_not_found.png)

then enter the following commands in the terminal:

```bash
sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
sudo a2enconf phpmyadmin.conf
sudo service apache2 reload
```

After that reload the page in the browser and it should work.

Set the username to: **root** and enter the Password and you should see the following page:

![settings_phpmyadmin](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/settings_phpmyadmin.png)

Create the database **thekre** as show in the following picture:

![create_database_thekre](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/master/images_readme/create_database_thekre.JPG)

After that you can import the tables of ThekRe. Import the .sql file **ThekRe_DB.sql**.

Klick in the navigation bar on **Importieren** and then on **Datei auswählen**. Choose the .sql File (ThekRe_DB.sql) and klick on **OK**.

![import_db_phpmyadmin](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/import_db_phpmyadmin.png)

Now the database **thekre** with the 7 tables got generated.

![tables_thekre](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/tables_thekre.png)

After that have to create a new database user for the system access. Go to **Benutzerkonten** in the navigation bar and klick **Benutzerkonten hinzufügen**.

![add_user_phpmyadmin](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/add_user_phpmyadmin.png)

The username is **thekre_admin**, hostname is **localhost** and the password is **cSCdrkd1VNEbk8PW**.

![add_user_name_password_phpmyadmin](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/add_user_name_password_phpmyadmin.png)

Choose the following user privilege's and klick **OK**.

![user_privileges_phpmyadmin](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/user_privileges_phpmyadmin.png)

The password is defined in the .env file on the server.

```env
DATABASE=thekre
DATABASE_USERNAME=thekre_admin
DATABASE_PASSWORD=cSCdrkd1VNEbk8PW
```



#### Source Code

The source code is on [Gitlab](https://gitlab.fhnw.ch/nick.koch/ThekRe).

Change in to the Apache directory.

```bash
cd /var/www/html
```

Clone the project from gitlab in to the directory.

```bash
cd /var/www/html
sudo git clone https://gitlab.fhnw.ch/nick.koch/ThekRe
cd ThekRe
```

Checkout the branch **develop**.

```bash
sudo git checkout develop
sudo git pull
```

Install the Laravel composer and then update it. This takes some time, so go and grab yourself a big cup of coffee.

```bash
sudo apt-get install composer
sudo composer update
```

Give write privileges to some directorys.

```bash
sudo chgrp -R www-data /var/www/html/ThekRe
sudo chmod -R 775 /var/www/html/ThekRe/storage
sudo chmod -R 775 /var/www/html/ThekRe/bootstrap
```

You have to create the apache configuration file.

```bash
cd /etc/apache2/sites-available
sudo nano laravel.conf
```

Copy the following content in to the file and save.

```bash
<VirtualHost *:80>
DocumentRoot /var/www/html/ThekRe/public/
<Directory /var/www/html/ThekRe/>
Options FollowSymLinks
AllowOverride All
Order allow,deny
allow from all
</Directory>
ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Now you have to deactivate the default configuration of apache and activate the new configuration and restart the web server.

```bash
sudo a2dissite 000-default.conf
sudo a2ensite laravel.conf
sudo a2enmod rewrite
sudo service apache2 restart
```

To test the whole installation, open http://ip-adress-server/ or http://localhost/ (local on the server or the VM) in a web browser you should get the following view.

![start_page_thekre](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/start_page_thekre.png)

#### Administration

If you open a web browser and go to http://ip-adress-server/admin or http://localhost/admin the following page should be displayed:

![admin_login_thekre](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/admin_login_thekre.png)

The administrator password is saved ([hashed and salted](https://laravel.com/docs/5.7/hashing)) in the database, in the table **tbl_login**.



## Architecture

### Class Diagram

The following image show the class diagram from ThekRe. The controllers call the model to get data from the database. The controller calls the views with model data. The views are not visualized in the class diagram, because all views are HTML files without a class description.

![classdiagram_controller](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/classdiagram_controller.JPG)

![classdiagram_model](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/classdiagram_model.JPG)


| Class Name      | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| UserController  | The class UserController is used to provide all the functionality for the user, like to see the availability from theme boxes or create an order. |
| AdminController | The class AdminController is used to provide all the functionality for the administrator, like the login or view the theme boxes. |
| Themebox        | The class Themebox provides all the theme box data.          |
| Order           | The class Order provide all the order data.                  |
| Delivery        | The class Delivery provides all the different delivery type data. |
| Status          | The class Status provides all the different status type data. |
| Blocked_Period  | The class Blocked_Period provides all the different blocked period type data. |
| EditMail        | The class Edit Mail provides all the different data for editing the mail templates. |
| Login           | The class Login provides all the different Login type data.  |



### Database

The use cases and the requirements lead to the following database design. The database layout is designed with an ORM and is forward engineered as a MySQL database. This schema was done with the tool MySQL Workbench. This tool was used, because it allows forward engineering to create the according SQL Statements for the database creation. 

In the second Version of ThekRe we added the tables: **tbl_mail**, **tbl_blocked_period** and **tbl_login**.

This is the database schema of the current system:

![database_model_diagram](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/database_model_diagram.png)

| Table              | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| tbl_themebox       | The table tbl_themebox represents a theme box.               |
| tbl_status         | The table tbl_status represents a status from an order. There are five different status which an order can have:<br /><ul><li>“Neu” (a new order is created in the database)</li><li>“Bereit” (the theme box is ready to be supplied)</li><li>“im Umlauf” (the person, who created the order, has the theme box)</li><li>“zurück gekommen” (the theme box is back at the FHNW li-brary</li><li>“abgeschlossen” (the theme box is checked form a library staff and the order is completed)</li></ul> |
| tbl_delivery       | The table tbl_delivery represents the different delivery types:<br /><ul><li>“Abholung an Ort” (the theme box will be picked up)</li><li>“Lieferung an Aargauer Schulen” (the theme box will be delivered to a school)</li></ul> |
| tbl_order          | The table tbl_order represents an order.                     |
| tbl_mail           | The table tbl_mail represents the different mail template types:<br /><ul><li>"mail_delivery_school" (the theme box will be delivered to a school)</li><li>"mail_delivery_pickup" (the theme box will be picked up)</li><li>"mail_ready_pickup" (mail template, for sending pickup mail when delivery status gets changed to "Bereit")</li></ul> |
| tbl_blocked_period | The table tbl_blocked_period represents the blocked periods. |
| tbl_login          | In the tbl_login the hashed and salted administrator password gets stored. |



### Order Status

When a user orders a box, a new order record will be created in the database. An order refers always to one theme box. Each order has a status. There are 6 different statuses: new, ready, running, returned, closed and cancelled. In the following image, we can see the sequence from the order statuses. Those statuses are recorded in German in the database.

![status_diagram](https://gitlab.fhnw.ch/nick.koch/ThekRe/raw/develop/images_readme/status_diagram.png)

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

### File Extensions

| File Type              | File Extension |
| ---------------------- | -------------- |
| PHP source file        | .php           |
| HTML source file       | .blade.php     |
| CSS source file        | .css           |
| JavaScript source file | .js            |

### File Content

Every file should only contain one single class. Inner classes must be exported to new files. Coding blocks should be separated by an empty line before or after.

### Naming Conventions

In PHP, the naming should follow the PSR 2 standard. For other languages like JavaScript, HTML and CSS we will define a base set of rules:
Do not use camel case or snake case for variable naming. Use hyphen-separated-case:

- Wrong: myStyleClass
- Wrong my_style_class
- Correct: my-style-class

Use an ID selector or class to work with an HTML object in JavaScript, for example installing a click handler:

- Correct: $("button.class").click(function() {}
- Correct: $("#settings-button").click(function() {}

Use a class selector if you want to style a HTML object, for example a text. Do not use IDs for styling – just define a new class for the HTML object and style this class.

#### PHP

Function names:

* myFunktion();
* function();

Variables:

* $id
* $themebox_id;

#### HTML

* Do not write inline JavaScript. Export all the JavaScript in a separate .js file.
* Do not write inline CSS. Use CSS classes and the .css file.

#### JS

* Whenever possible use jQuery, the library offers an easier way to handle DOM elements than the normal JavaScript
* All functions have a comment describing their purpose and parameters.



## Support

### Issue Tracker

For smaller and major issues use [Jira](https://www.cs.technik.fhnw.ch/jira2/projects/THEKRE/summary).



## Roadmap

### Ideas for Future Features/Extensions

- new user roles and privileges

  >
  >Since the students/processors of the orders have access to the admin area, my suggestion would be that the admin area is divided into two and there is an area for the students on which the topic boxes and orders can be handled and one for the employees of the library in which the passwords, the mails and the blocked periods can be changed.
  >



### Considerations for Extensions

The following chapters describe how to proceed with system extensions. This chapter is written as manual, so a person can take this chapter as a manual for any extensions.

#### Database Extension

Change in the database can be done over the phpMyAdmin or over the command line. If you add a new attribute to existing database table, you do not have to do any changes in the specific model classes. The Eloquent ORM module from Laravel maps automatically the changes from the table.
If a new table is created in the database, you have to write the following line in the command line in the base path from the project:

```bash
php artisan make:model <Table-name>
```

Laravel will create a new Model class in the **app** folder. Now, you have to declare the table name and the primary key as in the following example.

```bash
protected $table = “<Table-name>”;
protected $primaryKey = “<Primary Key Attribute Name>”;
```

Now, you can call the new created model from the controller classes, like in the following example.

```bash
$table-name = new <Table-name>();
```

#### View Extensions

The views can be extended normally with standard HTML and CSS. JavaScript has to be declared in separate JavaScript file. For each view, there is a JavaScript file with the related functions. You have to consider the declared coding convention to keep the code quality.

#### New View

A new View has to be added as an PHP file. If you want to have the overall elements as the navigation bar, you have to write the name as “<View Name>.blade.php”. The .blade is needed to load the page templates.
After creating the view, you have to add the view in the URL routing configuration file routes/web.php. A new entry has to be created depending on the Http call method.
For calling the view with the GET method (normal call of a view), you have to add the following line in the config file.

```bash
Route::get('user/loginForm', 'UserController@loginForm');
1(2, 3);
```

1. Declaration for an GET call
2. Declaration of called URL in the browser
3. Declaration of the Controller + @ + Action in the Controller

If the URL “…/user/ updateOrderDates'” is called with the POST method, then call the action “updateOrderDates'” from the Controller “UserController”.

You have to add the following element to the array **$except**. from the class “Middleware/ Veri-fyCsrfToken.php” to allow the POST method.

```bash
'user/ updateOrderDates',
```

#### Controller Extensions

An existing controller can be extended with usual PHP attributes and functions. You have to con-sider the declared coding convention to keep the code quality.

#### New Controller

A new controller can be created with the following command line in the base path from the project:

```bash
php artisan make:controller <controller-name> --plain
```

The new controller will be added in the “Http/Controller” path. In new Controller, you can declare your new functions.
