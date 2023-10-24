<?php

use Tests\TestCase;
use ThekRe\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use ThekRe\Order;
use ThekRe\Status;
use ThekRe\Themebox;


class AdminControllerTest extends TestCase
{
    public function setUp() : void {
        parent::setUp();

        @$admin_controller = new AdminController();;
        $this->controller = $admin_controller;
    }


    public function test_checkLogin()
    {
        $_SESSION['ThekRe_Admin'] = true;

        $status =  $this->controller->checkLogin();

        $this->assertTrue($status);
    }


    public function test_getOrders()
    {
        $orders =  $this->controller->getOrders();

        $this->assertEquals(count($orders), count(Order::get()));
    }


    public function test_loginSuccess()
    {
        $request = new Request(array("password" => config('admin_auth.admin_password')));

        $json_response = $this->controller->login($request);
        $this->assertEquals($json_response->content(), '"success"');
    }


    public function test_loginFailed()
    {
        $request = new Request(array("password" => "wrong"));

        $json_response = $this->controller->login($request);

        $this->assertEquals($json_response->content(), '"failure"');
    }


    public function test_getThemeboxes(){
        $themeboxes = $this->controller->getThemeboxes();

        $this->assertEquals(count($themeboxes), count(Themebox::get()));
    }


    public function test_getStatutes(){
        $statuses = $this->controller->getStatuses();

        $this->assertEquals(count($statuses), count(Status::get()));
    }


    public function test_formatDate(){
        $new_date = $this->controller->formatDate("2017.10.20");
        $this->assertEquals($new_date, "20-10-2017");
    }


    public function test_logout()
    {
        $_SESSION['ThekRe_Admin'] = true;

        $this->controller->logout();
        $logged_out = true;

        if(isset($_SESSION['ThekRe_Admin'])){
            $logged_out = false;
        }

        $this->assertTrue($logged_out);
    }


    public function test_removeThemebox(){
        $themebox = new Themebox();
        $themebox->title = "Test Title";
        $themebox->signatur = "Test Sig";
        $themebox->schoollevel = "Sek4";
        $themebox->barcode = "K979808";
        $themebox->size = "10";
        $themebox->content = "1 Buch";
        $themebox->weight = "12";
        $themebox->complete = 1;

        $themebox->save();

        $new_themebox = Themebox::orderBy('pk_themebox', 'desc')->first();
        $request = new Request(array("themebox_id" => $new_themebox->pk_themebox));
        $json_response = $this->controller->removeThemebox($request);

        $this->assertEquals($json_response->content(), "[]");
    }

    public function test_getLatestOrderDates(){
        $orders = Order::get();

        $result = $this->controller->getLatestOrderDates();

        $this->assertEquals(count($orders), count($result));
    }

    public function test_removeOrder(){
        $current_orders = Order::get();
        $order_amount = count($current_orders);

        $order = new Order();
        $order->fk_themebox = 1;
        $order->startdate = "2010-12-12";
        $order->enddate = "2010-12-24";
        $order->name = "mueller";
        $order->surname = "max";
        $order->email = "mail";
        $order->phonenumber = "9779";
        $order->nebisusernumber = "J898";
        $order->fk_delivery = 1;
        $order->ordernumber = "JJL";
        $order->datecreated = "2010-12-12";
        $order->fk_status = 1;
        $order->save();

        $orders = Order::get();
        $new_order = $orders[count($orders)-1];
        $request = new Request(array("order_id" => $new_order->pk_order));
        $this->controller->removeOrder($request);

        $this->assertEquals($order_amount, count(Order::get()));
    }

    public function test_getThemebox(){
        $themebox = new Themebox();
        $themebox->title = "Test Title";
        $themebox->signatur = "Test Sig";
        $themebox->schoollevel = "Sek4";
        $themebox->barcode = "K979808";
        $themebox->size = "10";
        $themebox->content = "1 Buch";
        $themebox->weight = "12";
        $themebox->complete = 1;
        $themebox->save();

        $themeboxes = Themebox::get();
        $new_themebox = $themeboxes[count($themeboxes)-1];
        $request = new Request(array("themebox_id" => $new_themebox->pk_themebox));
        $json_response = $this->controller->getThemebox($request);
        $themebox->forceDelete();
        $this->assertEquals(count(array($json_response)), 1);
    }

    public function tearDown(): void{
    }
}
