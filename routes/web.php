<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return redirect('user');
});

Route::get('/admin', 'AdminController@index')->name('adminIndex');
Route::get('/admin/loginForm', 'AdminController@loginForm')->name('loginForm');
Route::post('/admin/login', 'AdminController@login');

Route::get('/admin/forgetPasswordForm', 'AdminController@ForgetPasswordForm')->name('forgetPasswordForm');
Route::post('/admin/forgetPassword', 'AdminController@forgetPassword');

Route::get('/admin/resetPasswordForm/{token}', 'AdminController@ResetPasswordForm')->name('resetPasswordForm');
Route::post('/admin/resetPassword', 'AdminController@resetPassword');
Route::get('/admin/logout', 'AdminController@logout');

Route::get('/admin/categories', 'AdminController@indexCategories');
Route::post('/admin/createCategory', 'AdminController@createCategory');
Route::post('/admin/removeCategory', 'AdminController@removeCategory');
Route::post('/admin/getCategory', 'AdminController@getCategory');
Route::post('/admin/updateCategory', 'AdminController@updateCategory');

Route::get('/admin/themeboxes', 'AdminController@getThemeboxes');
Route::post('/admin/updateState','AdminController@updateThemeboxState');
Route::post('/admin/removeOrder','AdminController@removeOrder');
Route::post('/admin/removeThemebox','AdminController@removeThemebox');
Route::get('/admin/themeboxes','AdminController@indexThemebox');
Route::get('/admin/statistics','AdminController@indexStatistics');
Route::post('/admin/loadStatisticsThemebox','AdminController@loadStatisticsThemebox');
Route::post('/admin/createThemebox', 'AdminController@createThemebox');
Route::post('/admin/getThemebox', 'AdminController@getThemebox');
Route::post('/admin/updateThemebox', 'AdminController@updateThemebox');
Route::post('/admin/getOrder', 'AdminController@getOrder');
Route::post('/admin/updateOrder', 'AdminController@updateOrder');
Route::get('/admin/blockedPeriods', 'AdminController@indexBlockedPeriods');
Route::post('/admin/getBlockedPeriods', 'AdminController@getBlockedPeriods');
Route::post('/admin/createBlockedPeriod', 'AdminController@createBlockedPeriod');
Route::post('/admin/removeBlockedPeriod', 'AdminController@removeBlockedPeriod');
Route::post('/admin/getBlockedPeriod', 'AdminController@getBlockedPeriod');
Route::post('/admin/updateBlockedPeriod', 'AdminController@updateBlockedPeriod');
Route::get('/admin/changeCredentials', 'AdminController@indexChangeCredentials');

Route::get('/admin/email', 'AdminController@indexEmail');
Route::post('/admin/updatePassword', 'AdminController@updatePassword');
Route::post('/admin/updateAdminEmail', 'AdminController@updateAdminEmail');

Route::post('/admin/updatePoweruserPassword', 'AdminController@updatePoweruserPassword');
Route::post('/admin/getMail', 'AdminController@getMail');
Route::post('/admin/updateMail', 'AdminController@updateMail');

Route::get('/poweruser','PowerUserController@index')->name('poweruserIndex');
Route::get('/poweruser/themboxes','PowerUserController@getThemeboxes');
Route::get('/poweruser/themboxes','PowerUserController@indexThembox');
Route::post('/poweruser/login', 'PowerUserController@login');
Route::get('/poweruser/loginForm', 'PowerUserController@loginForm')->name('PowerloginForm');
Route::get('/poweruser/logout', 'PowerUserController@logout');
Route::post('/poweruser/updateOrder', 'PowerUserController@updateOrder');
Route::post('/poweruser/getOrder','PowerUserController@getOrder');
Route::post('/poweruser/getOrderAddData','PowerUserController@getOrderAddData');
Route::post('/poweruser/addOrder','PowerUserController@addOrder');
Route::post('/poweruser/updateState', 'PowerUserController@updateThemeboxState');




Route::get('/user', 'UserController@index');
Route::post('/user/getThemebox','UserController@getThemebox');
Route::post('/user/getThemeboxContent','UserController@getThemeboxContent');
Route::post('/user/createOrder', 'UserController@createOrder');
Route::get('/user/orderSuccess', 'UserController@orderSuccess')->name('orderSuccess');
Route::get('/user/orderFailed', 'UserController@orderFailed')->name('orderFailed');
Route::post('/user/login', 'UserController@login');
Route::get('/user/loginForm', 'UserController@loginForm');
Route::post('/user/updateOrderDates', 'UserController@updateOrderDates');
Route::post('/user/getBlockedPeriods', 'UserController@getBlockedPeriods');
Route::post('/user/getThemeboxesByFilter', 'UserController@getThemeboxesByFilter');
Route::get('/user/getAllThemeboxes', 'UserController@getAllThemeboxes');






