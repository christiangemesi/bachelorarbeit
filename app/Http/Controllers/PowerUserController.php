<?php

namespace ThekRe\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use League\Flysystem\Exception;
use ThekRe\Delivery;
use ThekRe\EditMail;
use ThekRe\Login;
use ThekRe\Order;
use ThekRe\Status;
use ThekRe\Themebox;
use Mail;


class PowerUserController extends Controller
{
    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    //
    public function index()
    {
        if ($this->checkLogin()) {
            return view('poweruser/index',  ['orders' => $this->getOrders(), 'statuses' => $this->getStatuses(),'themeboxes' => $this->getThemeboxes()]);
        } else {
            return redirect()->route('PowerloginForm');
        }

    }

    public function checkLogin(){
        if (isset($_SESSION['ThekRe_Poweruser'])) {
            return true;
        }
        return false;
    }


    public function login(Request $request)
    {
        if (Hash::check($request->password, $this->getPoweruserPassword())) {

            $_SESSION['ThekRe_Poweruser'] = true;
            return response()->json('success');
        } else {
            return response()->json('failure');
        }
    }
    public function logout()
    {
        unset($_SESSION['ThekRe_Poweruser']);
        return redirect('poweruser');
    }

    public function loginForm()
    {
        if ($this->checkLogin()) {
            return redirect()->route('poweruserIndex');
        } else {
            return view('poweruser/login_form');
        }
    }

    /**
     * get admin password from db
     */
    public function getPoweruserPassword(){
        $passwordJSON = Login::where('pk_login', 2)->get();
        return $passwordJSON[0]{'password'};
    }

    public function getOrders()
    {
        $orders = Order::get();
        $order_list = array();
        $counter = 0;
        foreach ($orders as $order) {
            $themebox = Themebox::find($order->fk_themebox);
            $status = Status::find($order->fk_status);
            $delivery = Delivery::find($order->fk_delivery);

            $order_list[$counter] = array("themebox" => $themebox["title"],
                "name" => $order->name,
                "startdate" => date('d.m.Y', strtotime($order->startdate)),
                "enddate" => date('d.m.Y', strtotime($order->enddate)),
                "themeboxsig" => $themebox["signatur"],
                "deliverytype" => $delivery["type"],
                "fk_status" => $order->fk_status,
                "status" => $status["name"],
                "order_id" => $order->pk_order,
                "ordernumber" => $order->ordernumber);
            $counter++;
        }
        return $order_list;
    }
    public function getOrdersWhereStatusIs($statusFK)
    {
        $orders = Order::where('fk_status',$statusFK)->get();
        $order_list = array();
        $counter = 0;
        foreach ($orders as $order) {
            $themebox = Themebox::find($order->fk_themebox);
            $status = Status::find($order->fk_status);
            $delivery = Delivery::find($order->fk_delivery);

            $order_list[$counter] = array("themebox" => $themebox["title"],
                "name" => $order->name,
                "startdate" => date('d.m.Y', strtotime($order->startdate)),
                "enddate" => date('d.m.Y', strtotime($order->enddate)),
                "themeboxsig" => $themebox["signatur"],
                "deliverytype" => $delivery["type"],
                "fk_status" => $order->fk_status,
                "status" => $status["name"],
                "order_id" => $order->pk_order,
                "ordernumber" => $order->ordernumber);
            $counter++;
        }
        return $order_list;
    }

    public function getStatuses()
    {
        $statuses = Status::get();
        return $statuses;
    }
    public function getThemeboxes()
    {
        $themeboxes = Themebox::get();
        return $themeboxes;
    }

//    public function console_log($data){
//        echo '<script>';
//        echo 'console.log('. json_encode( $data ) .')';
//        echo '</script>';
//    }
    function console_log($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);

        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }

    public function indexThembox(){
        return view('poweruser/themebox_index',['themeboxes' => $this->getThemeboxes()]);
    }

    public function updateOrder(Request $request){
        try {
            //if new status is "ready"
            if(2 == $request->order_data[3]["value"] && 1 == $request->order_data[9]["value"]){
                $this->sendEmail($request->order_data[0]["value"]);
            }
            Order::find($request->order_data[0]["value"])->update(
                ['startdate' => $this->formatDate($request->order_data[1]["value"]),
                    'enddate' => $this->formatDate($request->order_data[2]["value"]),
                    'fk_status' => $request->order_data[3]["value"],
                    'name' => $request->order_data[4]["value"],
                    'surname' => $request->order_data[5]["value"],
                    'email' => $request->order_data[6]["value"],
                    'phonenumber' => $request->order_data[7]["value"],
                    'nebisusernumber' => $request->order_data[8]["value"],
                    'fk_delivery' => $request->order_data[9]["value"],
                ]);

            if( $request->order_data[9]["value"] == 2){
                Order::find($request->order_data[0]["value"])->update(
                    ['schoolname' => $request->order_data[10]["value"],
                        'schoolstreet' => $request->order_data[11]["value"],
                        'schoolcity' => $request->order_data[12]["value"],
                        'placeofhandover' => $request->order_data[13]["value"],
                        'schoolphonenumber' => $request->order_data[14]["value"]]);
            }

            return response()->json($request->order_data[3]["value"], 200);
        }catch (Exception $e){
            return response()->json($e, 500);
        }
    }

    public function updateThemeboxState(Request $request)
    {
        $request_data = explode('-', $request->status_data);
        $order_id = $request_data[1];
        $new_state_id = $request_data[0];
        $status_ready = 0;
        $order = Order::find($order_id);

        try {
            if("Bereit" == Status::find($new_state_id)->name && 1 == $order["fk_delivery"]){
                $this->sendEmail($order_id);
                $status_ready = 1;
            }
            Order::find($order_id)->update(['fk_status' => $new_state_id]);
            return response()->json($status_ready, 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function getOrder(Request $request){
        $order = Order::find($request->order_id);

        try {
            $themebox = Themebox::find($order->fk_themebox);
            $all_status = Status::get();
            $all_deliveries = Delivery::get();
            $orders = Order::where('fk_themebox', $themebox->pk_themebox)->get();

            $data = array("order" => $order,
                "themebox" => $themebox,
                "all_status" => $all_status,
                "all_deliveries" => $all_deliveries,
                "orders" => $orders);

            return response()->json($data, 200);
        }catch(Exception $e){
            return response()->json($e, 500);
        }
    }

    public function sendEmail($order_id)
    {
        $order = Order::find($order_id);
        $themebox = Themebox::find($order->fk_themebox);

        $mail = EditMail::find(3);
        $html_db = $mail->mail_text;

        $html_replaced = str_replace("!titel!", $themebox->title, $html_db);
        $html_replaced = str_replace("!signatur!", $themebox->signatur, $html_replaced);
        $html_replaced = str_replace("!email!", $order->email, $html_replaced);
        $html_replaced = str_replace("!name!", $order->name, $html_replaced);
        $html_replaced = str_replace("!vorname!", $order->surname, $html_replaced);
        $html_replaced = str_replace("!bestellnummer!", $order->ordernumber, $html_replaced);

        $mail_data = array(
            'html' => $html_replaced,
            'title' => $themebox->title,
            'signatur' => $themebox->signatur,
            'receiver_mail' => $order->email,
            'receiver_name' => $order->name,
            'receiver_surname' => $order->surname,
            'ordernumber' => $order->ordernumber
        );

        Mail::send('admin.mail_ready_pickup', $mail_data, function ($message) use ($mail_data) {
            $message->to($mail_data['receiver_mail'], $mail_data['receiver_name'] . " " . $mail_data['receiver_surname'])->bcc('bibliothek.windisch@fhnw.ch', 'Bibliothek Windisch')->subject('Abholungseinladung Themenkiste');
        });
    }
    public function formatDate($date)
    {
        $temp_date = explode(".", $date);
        $new_date = $temp_date[2] . "-" . $temp_date[1] . "-" . $temp_date[0];
        return $new_date;
    }
    public function getOrderAddData(Request $request)
    {
        $fk_themboxrequest = $request->fk_thembox;
        $deliveries = Delivery::get();
        $orders = Order::where('fk_themebox', $fk_themboxrequest )->get();
        $counter  =0;
        $orderData = array();
        foreach ($orders as $order){
            $orderstartdate = $order->startdate;
            $orderenddate = $order->enddate;
            $orderid = $order->pk_order;
            $orderData[$counter] = array("pk_order"=>$orderid,"order_startdate"=>$orderstartdate,"order_enddate"=>$orderenddate);
            $counter++;
        }
        $data = array("delivery"=>$deliveries,"orderData"=>$orderData);
        return response()->json($data,200);

    }

    public function addOrder(Request $request){
        $path = $request->orderData;

        $newOrder = new Order();
        $newOrder->fk_themebox = $request->themeboxId;
        $newOrder->startdate = $this->formatDate($path[0]["value"]);
        $newOrder->enddate = $this->formatDate($path[1]["value"]);
        $newOrder->name = $path[2]["value"];
        $newOrder->surname = $path[3]["value"];
        $newOrder->email = $path[4]["value"];
        $newOrder->phonenumber = $path[5]["value"];
        $newOrder->nebisusernumber = $path[6]["value"];
        $newOrder->fk_delivery = $path[7]["value"];

        if ($path[7]["value"] == 2) {
            $newOrder->schoolname = $path[8]["value"];
            $newOrder->schoolstreet = $path[9]["value"];
            $newOrder->schoolcity = $path[10]["value"];
            $newOrder->schoolphonenumber = $path[11]["value"];
            $newOrder->placeofhandover = $path[12]["value"];
        }

        $newOrder->fk_status = 1;
        $newOrder->ordernumber = $this->createOrdernumber();
        $dt = Carbon::now();
        $newOrder->datecreated = $dt;

        $themebox = Themebox::find($newOrder->fk_themebox);

        $mail_data = array(
            'title' => $themebox->title,
            'signatur' => $themebox->signatur,
            'startdate' => $path[0]["value"],
            'enddate' => $path[1]["value"],
            'receiver_mail' => $newOrder->email,
            'receiver_name' => $newOrder->name,
            'receiver_surname' => $newOrder->surname,
            'ordernumber' => $newOrder->ordernumber,
            'extra_text' => $themebox->extra_text
        );

        try {
            $this->sendEmailNewOrder($mail_data, $path[7]["value"]);
            $newOrder->save();
            return response()->json($mail_data["title"],200);
        } catch (Exception $e) {
            return response()->json($newOrder->fk_themebox,500);
        }

    }
    public function createOrdernumber()
    {
        $new_ordernumber = '';
        $count = 1;

        while ($count >= 1) {
            $new_ordernumber = $this->createRandomnumber();
            $orders = Order::where('ordernumber', $new_ordernumber)->get();
            $count = count($orders);
        }

        return $new_ordernumber;
    }
    public function createRandomnumber()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $characters_length = strlen($characters);
        $random_string = '';
        for ($i = 0; $i < 10; $i++) {
            $random_string .= $characters[rand(0, $characters_length - 1)];
        }
        return $random_string;
    }
    public function getNextMonday($date)
    {
        return date('d.m.Y', strtotime('next monday', strtotime($date)));
    }
    public function sendEmailNewOrder($mail_data, $delivery_type)
    {
        if ($delivery_type == 2) { //delivery to school

            $pickupdate = $this->getNextMonday($mail_data['enddate']);
            $mail_data['pickupdate'] = $pickupdate;

            $mail = EditMail::find(2);
            $html_db = $mail->mail_text;

            $html_replaced = str_replace("!titel!", $mail_data['title'], $html_db);
            $html_replaced = str_replace("!signatur!", $mail_data['signatur'], $html_replaced);
            $html_replaced = str_replace("!startdatum!", $mail_data['startdate'], $html_replaced);
            $html_replaced = str_replace("!enddatum!", $mail_data['enddate'], $html_replaced);
            $html_replaced = str_replace("!email!", $mail_data['receiver_mail'], $html_replaced);
            $html_replaced = str_replace("!name!", $mail_data['receiver_name'], $html_replaced);
            $html_replaced = str_replace("!vorname!", $mail_data['receiver_surname'], $html_replaced);
            $html_replaced = str_replace("!bestellnummer!", $mail_data['ordernumber'], $html_replaced);
            $html_replaced = str_replace("!abholdatum!", $mail_data['pickupdate'], $html_replaced);
            $html_replaced = str_replace("!extra_text!", $mail_data['extra_text'], $html_replaced);

            $mail_data['html'] = $html_replaced;

            $view = 'user.mail_delivery_school';
        } else {

            $mail = EditMail::find(1);
            $html_db = $mail->mail_text;

            $html_replaced = str_replace("!titel!", $mail_data['title'], $html_db);
            $html_replaced = str_replace("!signatur!", $mail_data['signatur'], $html_replaced);
            $html_replaced = str_replace("!startdatum!", $mail_data['startdate'], $html_replaced);
            $html_replaced = str_replace("!enddatum!", $mail_data['enddate'], $html_replaced);
            $html_replaced = str_replace("!email!", $mail_data['receiver_mail'], $html_replaced);
            $html_replaced = str_replace("!name!", $mail_data['receiver_name'], $html_replaced);
            $html_replaced = str_replace("!vorname!", $mail_data['receiver_surname'], $html_replaced);
            $html_replaced = str_replace("!bestellnummer!", $mail_data['ordernumber'], $html_replaced);
            $html_replaced = str_replace("!extra_text!", $mail_data['extra_text'], $html_replaced);

            $mail_data['html'] = $html_replaced;

            $view = 'user.mail_delivery_pickup';
        }

        Mail::send($view, $mail_data, function ($message) use ($mail_data) {
            $message->to($mail_data['receiver_mail'], $mail_data['receiver_name'] . " " . $mail_data['receiver_surname'])->bcc('bibliothek.windisch@fhnw.ch', 'Bibliothek Windisch')->subject('Bestellbestätigung Themenkiste');
        });
    }
}