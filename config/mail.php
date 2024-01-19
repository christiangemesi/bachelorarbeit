<?php

return [

    'driver' => env('MAIL_DRIVER', false),

    'host' => env('MAIL_HOST', false),

    'port' => env('MAIL_PORT', false),


    'from' => [
        'address' => env('MAIL_USERNAME',false),
        'name' => env('EMAILS_FROM_NAME',false)
    ],

    'encryption' => env('MAIL_ENCRYPTION', false),


    'username' => env('MAIL_USERNAME',false),
    'password' => env('MAIL_PASSWORD',false),


    'sendmail' => '/usr/sbin/sendmail -bs',

    'verify_peer' => false,

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
