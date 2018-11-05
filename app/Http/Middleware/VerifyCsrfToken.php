<?php

namespace ThekRe\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'user/createOrder',
        'user/getThemebox',
        'user/getThemeboxContent',
        'user/updateOrderDates',
        'user/login',
        'admin/login',
        'admin/updateState',
        'admin/createThemebox',
        'admin/removeOrder',
        'admin/removeThemebox',
        'admin/loadStatisticsThemebox',
        'admin/getThemebox',
        'admin/updateThemebox',
        'admin/getOrder',
        'admin/updateOrder',
        'user/getBlockedPeriods',
        'admin/removeBlockedPeriod',
        'admin/createBlockedPeriod',
        'admin/getBlockedPeriod',
        'admin/updateBlockedPeriod',
        'admin/updatePassword',
        'admin/getMail'
    ];
}
