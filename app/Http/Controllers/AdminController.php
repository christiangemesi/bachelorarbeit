<?php
namespace ThekRe\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use League\Flysystem\Exception;
use ThekRe\Blocked_Period;
use ThekRe\Delivery;
use ThekRe\Http\Requests;
use ThekRe\Login;
use ThekRe\Order;
use ThekRe\Status;
use ThekRe\Themebox;
use Mail;

class AdminController extends Controller
{
    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    /**
     * render admin start page
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        if ($this->checkLogin()) {
            return view('admin/index',  ['orders' => $this->getOrders(), 'statuses' => $this->getStatuses()]);
        } else {
            return redirect()->route('loginForm');
        }
    }

    /**
     * check if admin is logged in
     * @return bool
     */
    public function checkLogin()
    {
        if (isset($_SESSION['ThekRe_Admin'])) {
            return true;
        }
        return false;
    }

    /**
     * render admin login form
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function loginForm()
    {
        if ($this->checkLogin()) {
            return redirect()->route('adminIndex');
        } else {
            return view('admin/login_form');
        }
    }

    /**
     * check admin login
     * @param Request $request
     * @return mixed
     */
    public function loginOld(Request $request)
    {
        if ($request->password == $this->getAdminPassword()) {
            $_SESSION['ThekRe_Admin'] = true;
            return response()->json('success');
        } else {
            return response()->json('failure');
        }
    }

    /**
     * compare input against hashed password
     */
    public function login(Request $request)
    {
        if (Hash::check($request->password, $this->getAdminPassword())) {
            $_SESSION['ThekRe_Admin'] = true;
            return response()->json('success');
        } else {
            return response()->json('failure');
        }
    }




    /**
     * get admin password from db
     */
    public function getAdminPassword(){
        $passwordJSON = Login::where('pk_login', 1)->get();
        return $passwordJSON[0]{'password'};
    }



    /**
     * admin logout
     * @return mixed
     */
    public function logout()
    {
        unset($_SESSION['ThekRe_Admin']);
        return redirect('admin');
    }

    /**
     * load all themeboxes
     * @return mixed
     */
    public function indexThemebox()
    {
        if ($this->checkLogin()) {
            return view('admin.themebox_index',['themeboxes' => $this->getThemeboxes()]);
        } else {
            return view('admin/login_form');
        }
    }

    /**
     * load statistic view
     * @return mixed
     */
    public function indexStatistics()
    {
        if ($this->checkLogin()) {
            $startdates = $this->getLatestOrderDates();
            $dates = array();

            foreach ($startdates as $order_startdate) {
                $date = explode("-", $order_startdate);

                if (!in_array($date[0], $dates)) {
                    $dates[] = $date[0];
                }
            }

            return view('admin.statistics_index')->with('dates', $dates);
        } else {
            return view('admin/login_form');
        }
    }


    /**
     * get latest order date for statistics
     * @return mixed
     */
    public function getLatestOrderDates()
    {
        $order_startdates = Order::orderBy('startdate', 'desc')->get()->pluck('startdate');
        return $order_startdates;
    }

    /**
     * return all orders
     * @return array
     */
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

    /**
     * find order id based
     * @param Request $request
     * @return mixed
     */
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

    /**
     * update order
     * @param Request $request
     * @return mixed
     */
    public function updateOrder(Request $request){

        try {/*
            //if new status is "ready"
            if(2 == $request->order_data[3]["value"] && 1 == $request->order_data[9]["value"]){
                //todo change back
                $this->sendEmail($request->order_data[0]["value"]);
            }*/
            Order::find($request->order_data[0]["value"])->update(
                ['startdate' => $this->formatDate($request->order_data[1]["value"]),
                    'enddate' => $this->formatDate($request->order_data[2]["value"]),
                    'fk_status' => $request->order_data[3]["value"],
                    'name' => $request->order_data[4]["value"],
                    'surname' => $request->order_data[5]["value"],
                    'email' => $request->order_data[6]["value"],
                    'phonenumber' => $request->order_data[7]["value"],
                    'nebisusernumber' => $request->order_data[8]["value"],
                    'fk_delivery' => $request->order_data[9]["value"]
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

    /**
     * get all themeboxes
     * @return mixed
     */
    public function getThemeboxes()
    {
        $themeboxes = Themebox::get();
        return $themeboxes;
    }

    /**
     * get all states
     * @return mixed
     */
    public function getStatuses()
    {
        $statuses = Status::get();
        return $statuses;
    }

    /**
     * edit themebox state from status dropdown
     * @param Request $request
     * @return mixed
     */
    public function updateThemeboxState(Request $request)
    {
        $request_data = explode('-', $request->status_data);
        $order_id = $request_data[1];
        $new_state_id = $request_data[0];
        $status_ready = 0;
        $order = Order::find($order_id);

        try {
            if("Bereit" == Status::find($new_state_id)->name && 1 == $order["fk_delivery"]){
                //TODO reactivate, to send email
                //$this->sendEmail($order_id);
                $status_ready = 1;
            }
            Order::find($order_id)->update(['fk_status' => $new_state_id]);
            return response()->json($status_ready, 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * remove order
     * @param Request $request
     * @return mixed
     */
    public function removeOrder(Request $request)
    {
        $order_id = $request->order_id;
        $order = Order::find($order_id);

        try {
            $order->forceDelete();
            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * remove themebox
     * @param Request $request
     * @return mixed
     */
    public function removeThemebox(Request $request)
    {
        $themebox_id = $request->themebox_id;
        $themebox = Themebox::find($themebox_id);

        $orders = Order::where('fk_themebox', $themebox_id)->get();

        if (count($orders) != 0) {
            foreach ($orders as $order) {
                $order->forceDelete();
            }
        }

        try {
            $themebox->forceDelete();
            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * load amount orders from themebox for statistics
     * @param Request $request
     * @return mixed
     */
    public function loadStatisticsThemebox(Request $request)
    {
        try {
            $orders = Order::where('startdate', 'like', '%' . $request->year . '%')->get();
            $themeboxes = Themebox::get();

            $themeboxes_tmp = array();
            foreach ($themeboxes as $themebox) {
                $themeboxes_tmp[$themebox->title] = 0;
                foreach ($orders as $order) {
                    if ($order->fk_themebox == $themebox->pk_themebox) {
                        $themeboxes_tmp[$themebox->title] = $themeboxes_tmp[$themebox->title] + 1;
                    }
                }
                arsort($themeboxes_tmp);
            }

            return response()->json(["themeboxes" => $themeboxes_tmp],200);
        } catch (Exception $e) {
            return response()->json([], 500);
        }
    }

    /**
     * create themebox
     * @param Request $request
     * @return mixed
     */
    public function createThemebox(Request $request)
    {
        $themebox = new Themebox();
        $themebox->title = $request->themebox_data[0]["value"];
        $themebox->signatur = $request->themebox_data[1]["value"];
        $themebox->schoollevel = $request->themebox_data[2]["value"];
        $themebox->barcode = $request->themebox_data[3]["value"];
        $themebox->size = $request->themebox_data[4]["value"];
        $themebox->weight = $request->themebox_data[5]["value"];
        $themebox->content = $request->themebox_data[6]["value"];
        $themebox->complete = true;

        try {
            $themebox->save();
            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    /**
     * get themebox data from selected themebox
     * @param Request $request
     * @return mixed
     */
    public function getThemebox(Request $request)
    {
        $themebox_Id = $request["themebox_id"];
        $themebox = Themebox::find($themebox_Id);

        return response()->json($themebox,200);
    }

    /**
     * update themebox
     * @param Request $request
     * @return mixed
     */
    public function updateThemebox(Request $request){
       try {
           Themebox::find($request->themebox_data[0]["value"])->update(
               ['title' => $request->themebox_data[1]["value"],
                'signatur' => $request->themebox_data[2]["value"],
                'schoollevel' => $request->themebox_data[3]["value"],
                'barcode' => $request->themebox_data[4]["value"],
                'size' => $request->themebox_data[5]["value"],
                'weight' => $request->themebox_data[6]["value"],
                'content' => $request->themebox_data[7]["value"]]
           );

           $status = 0;
           if(!empty($request->themebox_data[8]["value"])){
               $status = 1;
           }

           Themebox::find($request->themebox_data[0]["value"])->update(
               ['complete' => $status]);

           return response()->json($request, 200);

       }catch (Exception $e){
           return response()->json($e, 500);
       }
    }

    /**
     * send email when order state ready
     * @param $order_id
     */
    /*public function sendEmail($order_id)
    {
        $order = Order::find($order_id);
        $themebox = Themebox::find($order->fk_themebox);

        $mail_data = array(
            'title' => $themebox->title,
            'signatur' => $themebox->signatur,
            'receiver_mail' => $order->email,
            'receiver_name' => $order->name,
            'receiver_surname' => $order->surname,
            'ordernumber' => $order->ordernumber
        );

        Mail::send('admin.mail_ready_pickup', $mail_data, function ($message) use ($mail_data) {
            $message->to($mail_data['receiver_mail'], $mail_data['receiver_name'] . " " . $mail_data['receiver_surname'])->subject('Abholungseinladung Themenkiste');
        });
    }*/

    /**
     * format date from DD.MM.YYYY to YYYY-MM-DD
     * @param $date
     * @return string
     */
    public function formatDate($date)
    {
        $temp_date = explode(".", $date);
        $new_date = $temp_date[2] . "-" . $temp_date[1] . "-" . $temp_date[0];
        return $new_date;
    }

    /**
     * load settings view
     * @return mixed
     */
    public function indexBlockedPeriods()
    {
        if ($this->checkLogin()) {
            return view('admin.blocked-periods_index',['blocked_periods' => $this->getBlockedPeriods()]);
        } else {
            return view('admin/login_form');
        }
    }


    /**
     * return all blocked periods
     * @return array
     */
    public function getAllBlockedPeriods()
    {
        $blocked_periods = Blocked_Period::get();
        return $blocked_periods;
    }


    /**
     * find order id based
     * @param Request $request
     * @return mixed
     */
    public function getBlockedPeriod(Request $request){

        $blocked_period = Blocked_Period::find($request->blocked_period_id);

        try {
            return response()->json($blocked_period, 200);
        }catch(Exception $e){
            return response()->json($e, 500);
        }
    }



    /**
     * return all blocked periods
     * @return array
     */
    public function getBlockedPeriods()
    {
        $blocked_periods = Blocked_Period::get();
        $blocked_periods_list = array();

        $counter = 0;
        foreach ($blocked_periods as $blocked_period) {

            $blocked_periods_list[$counter] = array(
                "pk_blocked-period" => $blocked_period->pk_blocked_period,
                "reason" => $blocked_period->reason,
                "startdate" => date('d.m.Y', strtotime($blocked_period->startdate)),
                "enddate" => date('d.m.Y', strtotime($blocked_period->enddate)));
            $counter++;
        }

        return $blocked_periods_list;
    }


    /**
     * update blocked period
     * @param Request $request
     * @return mixed
     */
    public function updateBlockedPeriod(Request $request){

        try {
            Blocked_Period::find($request->blocked_period_data[0]["value"])->update(
                    ['reason' => $request->blocked_period_data[1]["value"],
                    'startdate' =>  $this->formatDate($request->blocked_period_data[2]["value"]),
                    'enddate' =>  $this->formatDate($request->blocked_period_data[3]["value"])
                    ]);

            return response()->json($request, 200);
        }catch (Exception $e){
            return response()->json($e, 500);
        }
    }



    /**
     * create blocked_period
     * @param Request $request
     * @return mixed
     */
    public function createBlockedPeriod(Request $request)
    {
        $blocked_period = new Blocked_Period();
        $blocked_period->reason = $request->blocked_period_data[0]["value"];
        $blocked_period->startdate = $this->formatDate($request->blocked_period_data[1]["value"]);
        $blocked_period->enddate = $this->formatDate($request->blocked_period_data[2]["value"]);


        try {
            $blocked_period->save();
            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }



    /**
     * remove blocked period
     * @param Request $request
     * @return mixed
     */
    public function removeBlockedPeriod(Request $request)
    {
        $blocked_period_id = $request->blocked_period_id;
        $blocked_period = Blocked_Period::find($blocked_period_id);

        try {
            $blocked_period->forceDelete();
            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }



    /**
     * render change password form
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexChangePassword()
    {
        if ($this->checkLogin()) {
            return view('admin/indexChangePassword');
        } else {
            return view('admin/login_form');
        }
    }


    /**
     * return the password
     * @return mixed
     */
    public function getPassword()
    {
        $login = Login::find(1);

        return $login->password;
    }



    /**
     * update password
     * @param Request $request
     * @return mixed
     */
    public function updatePassword(Request $request){

        $passwords = $request->all();

        if(Hash::check($passwords["password-now"], $this->getPassword())){
            if($passwords["password"] == $passwords["confirm_password"]){

                try {
                    $password = $passwords["confirm_password"];
                    $hashed_password = Hash::make($password);

                    $pass = Login::find(1);
                    $pass->password=$hashed_password;
                    $pass->save();

                    return redirect('admin/changePassword')->with('success-message', 'Das Passwort wurde geändert!');
                }catch (Exception $e){
                    return redirect('admin/changePassword')->with('alert-message', 'Das Passwort konnte nicht geändert werden!');

                }
            }else{
                return redirect('admin/changePassword')->with('alert-message', 'Das Passwort konnte nicht geändert werden! Bitte geben Sie Bestätigen Sie das Passwort, mit erneuter Eingabe.');
            }
        }else{
            return redirect('admin/changePassword')->with('alert-message', 'Das Passwort konnte nicht geändert werden! Ihr eingebenes Passwort entspricht nicht dem aktuellen Passwort!');
        }
    }



    /**
     * render change password form
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function indexEmail()
    {
        if ($this->checkLogin()) {
            return view('admin/indexEmail');
        } else {
            return view('admin/login_form');
        }
    }


}