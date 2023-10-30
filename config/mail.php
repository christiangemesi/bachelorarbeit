<?php

return [

    'driver' => env('MAIL_DRIVER', 'smtp'),

    'host' => env('MAIL_HOST', 'smtp.gmail.com'),

    'port' => env('MAIL_PORT', 587),


    'from' => [
        'address' => env('EMAILS_FROM',false),
        'name' => env('EMAILS_FROM_NAME',false)
    ],

    'encryption' => env('MAIL_ENCRYPTION', 'tls'),


    'username' => env('MAIL_USERNAME'),
    'password' => env('MAIL_PASSWORD'),


    'sendmail' => '/usr/sbin/sendmail -bs',

    'pretend' => false,

    /*
    |--------------------------------------------------------------------------
    | Markdown Mail Settings
    |--------------------------------------------------------------------------
    |
    | If you are using Markdown based email rendering, you may configure your
    | theme and component paths here, allowing you to customize the design
    | of the emails. Or, you may simply stick with the Laravel defaults!
    |
    */

    'markdown' => [
        'theme' => 'default',

        'paths' => [
            resource_path('views/vendor/mail'),
        ],
    ],

];
