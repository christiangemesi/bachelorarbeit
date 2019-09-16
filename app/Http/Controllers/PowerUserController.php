<?php

namespace ThekRe\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use ThekRe\Delivery;
use ThekRe\Login;
use ThekRe\Order;
use ThekRe\Status;
use ThekRe\Themebox;

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
            return view('poweruser/index',  ['orders' => $this->getOrders(), 'statuses' => $this->getStatuses()]);
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
    {   $this->console_log($request->password);
        $this->console_log($this->getAdminPassword());
        if (Hash::check($request->password, $this->getAdminPassword())) {

            $_SESSION['ThekRe_Poweruser'] = true;
            return response()->json('success');
        } else {
            return response()->json('failure');
        }
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
    public function getAdminPassword(){
        $passwordJSON = Login::where('pk_login', 1)->get();
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

    public function console_log($data){
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
    }

    public function indexThembox(){
        return view('poweruser/themebox_index',['themeboxes' => $this->getThemeboxes()]);
    }
}
