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
        'user/getThemeboxesByFilter',
        'user/getAllThemeboxes',

        'poweruser/login',
        'poweruser/updateOrder',
        'poweruser/getOrder',
        'poweruser/getOrderAddData',
        'poweruser/addOrder',
        '/poweruser/updateState',

        'admin/login',
        'admin/forgetPassword',
        'admin/resetPassword',

        'admin/createCategory',
        'admin/removeCategory',
        'admin/getCategory',
        'admin/updateCategory',

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

        'admin/updateAdminEmail',
        'admin/updatePassword',
        'admin/updatePoweruserPassword',
        'admin/getMail',
        'admin/updateMail',

        'themenkisten/user/createOrder',
        'themenkisten/user/getThemebox',
        'themenkisten/user/getThemeboxContent',
        'themenkisten/user/updateOrderDates',
        'themenkisten/user/login',
        'themenkisten/admin/login',
        'themenkisten/admin/updateState',
        'themenkisten/admin/createThemebox',
        'themenkisten/admin/removeOrder',
        'themenkisten/admin/removeThemebox',
        'themenkisten/admin/loadStatisticsThemebox',
        'themenkisten/admin/getThemebox',
        'themenkisten/admin/updateThemebox',
        'themenkisten/admin/getOrder',
        'themenkisten/admin/updateOrder',
        'themenkisten/user/getBlockedPeriods',
        'themenkisten/admin/removeBlockedPeriod',
        'themenkisten/admin/createBlockedPeriod',
        'themenkisten/admin/getBlockedPeriod',
        'themenkisten/admin/updateBlockedPeriod',
        'themenkisten/admin/updatePassword',
        'themenkisten/admin/getMail',
        'themenkisten/admin/updateMail'
    ];
}
