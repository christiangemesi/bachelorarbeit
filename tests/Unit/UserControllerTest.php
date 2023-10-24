<?php

use Tests\TestCase;
use ThekRe\Http\Controllers\UserController;
use Illuminate\Http\Request;
use ThekRe\Order;
use ThekRe\Themebox;


class UserControllerTest extends TestCase
{
    public function setUp(): void {
        parent::setUp();

        @$user_controller = new UserController();;
        $this->controller = $user_controller;
    }

    public function test_formatDate(){
        $new_date = $this->controller->formatDate("2017.10.20");
        $this->assertEquals($new_date, "20-10-2017");
    }

    public function test_createRandomnumber(){
        $ran = $this->controller->createRandomnumber();

        $this->assertEquals(10, strlen($ran));
    }

    public function test_getOrder(){
        $order = new Order();
        $order->fk_themebox = 1;
        $order->startdate = "2010-12-12";
        $order->enddate = "2010-12-24";
        $order->name = "mueller";
        $order->surname = "max_user";
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
        $result = $this->controller->getOrder($new_order->ordernumber);
        $order->forceDelete();

        $this->assertEquals($result[0]["ordernumber"], "JJL");
    }

    public function test_getOrder_datecreated(){
        $order = new Order();
        $order->fk_themebox = 1;
        $order->startdate = "2010-12-12";
        $order->enddate = "2010-12-24";
        $order->name = "mueller";
        $order->surname = "max_user";
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
        $result = $this->controller->getOrder($new_order->ordernumber);
        $order->forceDelete();

        $this->assertEquals($result[0]["datecreated"], "2010-12-12");
    }

    public function test_getOrder_name(){
        $order = new Order();
        $order->fk_themebox = 1;
        $order->startdate = "2010-12-12";
        $order->enddate = "2010-12-24";
        $order->name = "mueller";
        $order->surname = "max_user";
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
        $result = $this->controller->getOrder($new_order->ordernumber);
        $order->forceDelete();

        $this->assertEquals($result[0]["name"], "mueller");
    }

    public function test_getThemeboxContent(){
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
        $request = new Request(array("themeboxId" => $new_themebox->pk_themebox));
        $response = $this->controller->getThemeboxContent($request);
        $themebox->forceDelete();

        $this->assertEquals(count(array($response)), 1);
    }

    public function tearDown(): void{
    }
}
