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

Route::get('admin', 'AdminController@index')->name('adminIndex');
Route::get('admin/loginForm', 'AdminController@loginForm')->name('loginForm');
Route::post('admin/login', 'AdminController@login');
Route::get('admin/logout', 'AdminController@logout');
Route::get('admin/themeboxes', 'AdminController@getThemeboxes');
Route::post('admin/updateState','AdminController@updateThemeboxState');
Route::post('admin/removeOrder','AdminController@removeOrder');
Route::post('admin/removeThemebox','AdminController@removeThemebox');
Route::get('admin/themeboxes','AdminController@indexThemebox');
Route::get('admin/statistics','AdminController@indexStatistics');
Route::post('admin/loadStatisticsThemebox','AdminController@loadStatisticsThemebox');
Route::post('admin/createThemebox', 'AdminController@createThemebox');
Route::post('admin/getThemebox', 'AdminController@getThemebox');
Route::post('admin/updateThemebox', 'AdminController@updateThemebox');
Route::post('admin/getOrder', 'AdminController@getOrder');
Route::post('admin/updateOrder', 'AdminController@updateOrder');
Route::get('admin/blockedPeriods', 'AdminController@indexBlockedPeriods');
Route::post('admin/getBlockedPeriods', 'AdminController@getBlockedPeriods');
Route::post('admin/createBlockedPeriod', 'AdminController@createBlockedPeriod');
Route::post('admin/removeBlockedPeriod', 'AdminController@removeBlockedPeriod');
Route::post('admin/getBlockedPeriod', 'AdminController@getBlockedPeriod');
Route::post('admin/updateBlockedPeriod', 'AdminController@updateBlockedPeriod');




Route::get('user', 'UserController@index');
Route::post('user/getThemebox','UserController@getThemebox');
Route::post('user/getThemeboxContent','UserController@getThemeboxContent');
Route::post('user/createOrder', 'UserController@createOrder');
Route::get('user/orderSuccess', 'UserController@orderSuccess')->name('orderSuccess');
Route::get('user/orderFailed', 'UserController@orderFailed')->name('orderFailed');
Route::post('user/login', 'UserController@login');
Route::get('user/loginForm', 'UserController@loginForm');
Route::post('user/updateOrderDates', 'UserController@updateOrderDates');
Route::post('user/getBlockedPeriods', 'UserController@getBlockedPeriods');

