<?php

use Tests\TestCase;
use ThekRe\Category;
use ThekRe\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use ThekRe\Order;
use ThekRe\HourlyOrder;
use ThekRe\Status;
use ThekRe\Themebox;


class AdminControllerTest extends TestCase
{
    public function setUp(): void{
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

        $countHourlyOrders = count(HourlyOrder::get());
        $countDailyOrders = count(Order::get());

        $this->assertEquals(count($orders), $countHourlyOrders + $countDailyOrders);
    }



    public function test_loginSuccess()
    {
        $this->markTestSkipped('We do not want to run this test on the production server.');

        // Assuming you have set up the admin password and email for testing
        $adminPassword = config('admin_auth.admin_password');
        $adminEmail = config('admin_auth.admin_email');

        // Correct login credentials
        $requestCorrect = new Request(['password' => $adminPassword, 'email' => $adminEmail]);
        $jsonResponseCorrect = $this->controller->login($requestCorrect);

        // Assert that the response for correct credentials is 'success'
        $this->assertEquals($jsonResponseCorrect->content(), '"success"');
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

        // Create a new Themebox to be used in the order
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

        // Retrieve the ID of the newly created themebox
        $themebox_id = $themebox->pk_themebox;


        $order = new Order();
        $order->fk_themebox = $themebox_id; // assuming that there is a themebox with this id
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

        Themebox::destroy($themebox_id);
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

    // test category
    public function test_createCategory()
    {
        // Get the current number of categories
        $current_categories = Category::get();
        $category_amount = count($current_categories);

        // Create a category
        $request = new Request(['category_data' => [['value' => 'Test Category']]]);
        $this->controller->createCategory($request);

        // Assert that the category has been added to the database
        $this->assertEquals($category_amount + 1, count(Category::get()));

        // Assert that the last added category has the correct name
        $new_category = Category::orderBy('pk_category', 'desc')->first();
        $this->assertEquals('Test Category', $new_category->name);

        // Remove the category
        $new_category->forceDelete();
    }

    public function test_removeCategory()
    {
        $current_categories = Category::get();
        $category_amount = count($current_categories);

        // Create a category to be removed
        $category = new Category();
        $category->name = "Test Category";
        $category->save();

        $categories = Category::get();
        $new_category = $categories[count($categories)-1];
        $request = new Request(array("category_id" => $new_category->pk_category));
        $this->controller->removeCategory($request);

        $this->assertEquals($category_amount, count(Category::get()));
    }

    public function test_getCategories()
    {
        $categories = $this->controller->getCategories();

        $this->assertEquals(count($categories), count(Category::get()));
    }

    public function test_getCategory(){
        $category = new Category();
        $category->name = "Test Category";
        $category->save();

        $categories = Category::get();
        $new_category = $categories[count($categories)-1];
        $request = new Request(array("category_id" => $new_category->pk_category));
        $json_response = $this->controller->getCategory($request);
        $category->forceDelete();
        $this->assertEquals(count(array($json_response)), 1);
    }

    public function test_updateCategory()
    {
        // Create a category to update
        $category = new Category();
        $category->name = "Old Category";
        $category->save();

        // Get the current number of categories
        $current_categories = Category::get();
        $category_amount = count($current_categories);

        // Update the category
        $request = new Request([
            'category_data' => [
                ['value' => $category->pk_category],         // category_id
                ['value' => 'Updated Category'],    // category_name
            ],
        ]);

        $this->controller->updateCategory($request);

        // Assert that the number of categories remains the same
        $this->assertEquals($category_amount, count(Category::get()));

        // Assert that the category has been updated in the database
        $updated_category = Category::find($category->pk_category);
        $this->assertEquals('Updated Category', $updated_category->name);

        // Remove the category
        $updated_category->forceDelete();
    }

    public function tearDown(): void{
    }
}
