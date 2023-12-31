<?php

namespace ThekRe\Http\Controllers;

use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Str;
use ThekRe\Blocked_Period;
use ThekRe\Category;
use ThekRe\HourlyOrder;
use ThekRe\Order_Type;
use ThekRe\Delivery;
use ThekRe\Http\Requests;
use ThekRe\Login;
use ThekRe\Order;
use ThekRe\Status;
use ThekRe\Themebox;
use ThekRe\EditMail;
use ThekRe\PasswordResets;
use Illuminate\Support\Facades\Mail;


class AdminController extends Controller
{
    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    /**
     * load admin index view
     * @return Factory|\Illuminate\View\View|RedirectResponse
     */
    public function index()
    {
        if ($this->checkLogin()) {
            return view('admin/index', ['orders' => $this->getOrders(), 'statuses' => $this->getStatuses()]);
        } else {
            return redirect()->route('loginForm');
        }
    }

    /**
     * check if admin is logged in
     * @return bool
     */
    public function checkLogin(): bool
    {
        if (isset($_SESSION['ThekRe_Admin'])) {
            return true;
        }
        return false;
    }

    /**
     * render admin login form
     * @return Factory|\Illuminate\View\View
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
     * render admin forget password form
     * @return Factory|\Illuminate\View\View
     */
    public function forgetPasswordForm()
    {
        //if the forgetPassword function returned success, redirect to login form
        return view('admin/forget-password_form');
    }


    /**
     * send email with token to reset password (token 15 minutes valid)
     */
    public function forgetPassword(Request $request)
    {
        //normalisieren
        $email = strtolower($request->email);

        //validation
        if ($email != $this->getAdminEmail()) {
            return response()->json('failure');
        }

        $token = Str::random(64);

        //save token in password_resets table
        $password_reset_db = new PasswordResets();
        $password_reset_db->email = $request->email;
        $password_reset_db->token = $token;
        $password_reset_db->created_at = Carbon::now();
        $password_reset_db->save();

        Mail::send('admin.mail-forget-password', ['token' => $token], function ($message) use ($email) {
            $message->to($email)->subject('Passwort zurücksetzen');
        });

        return response()->json('success');
    }

    /**
     * render new password form
     * @return Factory|\Illuminate\View\View
     */
    public function ResetPasswordForm($token)
    {

        //check if token exists in password_resets table
        $password_reset = PasswordResets::where('token', $token)->get();
        if (count($password_reset) == 0) {
            return view('errors/404');
        }

        //check if token is older than 15 minutes
        $created_at = $password_reset[0]['created_at'];
        $diff = Carbon::now()->diffInMinutes($created_at);
        if ($diff > 15) {
            return view('errors/404');
        }
        return view('admin/new-password_form', compact('token'));
    }

    /**
     * reset password
     * @param Request $request
     * @return mixed
     */
    public function resetPassword(Request $request)
    {
        $email = strtolower($request->email);

        //validation
        //check if token exists in password_resets table
        $password_reset = PasswordResets::where('token', $request->token)->get();
        if (count($password_reset) == 0) {
            return response()->json('failure_token'); //token not found
        }
        //check if email is the same as in Login table
        if ($email != $this->getAdminEmail()) {
            return response()->json('failure_email'); //email is not the same as in Login table
        }
        //check if both passwords match
        if ($request->password != $request->password_confirmation) {
            return response()->json('failure_pw_noMatch'); //passwords do not match
        }
        //check if password is at least 8 characters long
        if (strlen($request->password) < 8) {
            return response()->json('failure_pw_short'); //password is too short
        }

        //change the password in the database login
        $this->setAdminPassword($email, $request->password);

        //delete token from password_resets table
        PasswordResets::where('token', $request->token)->delete();

        return response()->json('success');
    }


    /**
     * compare input against hashed password and email
     */
    public function login(Request $request)
    {
        $password = $request->password;
        $email = strtolower($request->email);

        if (Hash::check($password, $this->getAdminPassword()) && $email == $this->getAdminEmail()) {
            $_SESSION['ThekRe_Admin'] = true;
            return response()->json('success');
        } else {
            return response()->json('failure');
        }
    }


    /**
     * get admin password from db
     */
    public function getAdminPassword()
    {
        $passwordJSON = Login::where('pk_login', 1)->get();
        return $passwordJSON[0]['password'];
    }

    public function setAdminPassword($email, $password): void
    {
        $email = strtolower($email);

        Login::where('email', $email)->update(array('password' => Hash::make($password)));
    }

    /**
     * set admin email in db
     * @param $email
     */
    public function setAdminEmail($email): void
    {
        $email = strtolower($email);

        Login::where('pk_login', 1)->update(array('email' => $email));
    }

    /**
     * get admin email from db
     */
    public function getAdminEmail()
    {
        $emailJSON = Login::where('pk_login', 1)->get();
        return $emailJSON[0]['email'];
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
            $themeboxes = $this->getThemeboxes();
            $categories = $this->getCategories();
            $order_types = $this->getOrderTypes();
            error_log($order_types);


            return view('admin.themebox_index', ['themeboxes' => $themeboxes, 'categories' => $categories, 'order_types' => $order_types]);
        } else {
            return view('admin.login_form');
        }
    }

    public function getOrderTypes()
    {
        $order_types = Order_Type::all();
        $order_types = $order_types->sortBy('name');
        return $order_types;
    }

    /**
     * load all categories
     */
    public function indexCategories()
    {
        if ($this->checkLogin()) {
            $themeboxes = $this->getThemeboxes();
            $categories = $this->getCategories();

            return view('admin.category_index', ['themeboxes' => $themeboxes, 'categories' => $categories]);
        } else {
            return view('admin.login_form');
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

        $hourly_orders = HourlyOrder::get();
        // Process hourly orders
        foreach ($hourly_orders as $hourly_order) {
            $themebox = Themebox::find($hourly_order->fk_themebox);
            $status = Status::find($hourly_order->fk_status);
            $delivery = Delivery::find($hourly_order->fk_delivery);

            $order_list[] = array(
                "themebox" => $themebox["title"],
                "name" => $hourly_order->name,
                "startdate" => date('d.m.Y H:i:s', strtotime($hourly_order->startdate)),
                "enddate" => date('d.m.Y H:i:s', strtotime($hourly_order->enddate)),
                "deliverytype" => $delivery["type"],
                "themeboxsig" => $themebox["signatur"],
                "fk_status" => $hourly_order->fk_status,
                "status" => $status["name"],
                "order_id" => $hourly_order->pk_hourly_order,
                "ordernumber" => $hourly_order->ordernumber
            );
        }

        return $order_list;
    }

    /**
     * find order id based
     * @param Request $request
     * @return mixed
     */
    public function getOrder(Request $request)
    {
        $order = Order::find($request->order_id);
        if($order == null){
            try {
                $order = HourlyOrder::find($request->order_id);
                $themebox = Themebox::find($order->fk_themebox);
                $all_status = Status::get();
                $all_deliveries = Delivery::get();
                $orders = HourlyOrder::where('fk_themebox', $themebox->pk_themebox)->get();

                $data = array("order" => $order,
                    "themebox" => $themebox,
                    "all_status" => $all_status,
                    "all_deliveries" => $all_deliveries,
                    "orders" => $orders);

                return response()->json($data, 200);
            } catch (Exception $e) {
                return response()->json($e, 500);
            }
        } else {
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
            } catch (Exception $e) {
                return response()->json($e, 500);
            }
        }
    }

    /**
     * update order
     * @param Request $request
     * @return mixed
     */
    public function updateOrder(Request $request)
    {
        //error_log each value
        foreach ($request->order_data as $order_data) {
            error_log($order_data["name"] . " " . $order_data["value"]);
        }

        $orderId =$request->order_data[0]["value"];

        $isHourlyOrder = false;
        $order = Order::find($orderId);
        if($order == null){
            $order = HourlyOrder::find($orderId);
            $isHourlyOrder = true;
        }

        if(!$isHourlyOrder){
            try {
                //if new status is "ready"
                if (2 == $request->order_data[3]["value"] && 1 == $request->order_data[9]["value"]) {
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

                if ($request->order_data[9]["value"] == 2) {
                    Order::find($request->order_data[0]["value"])->update(
                        ['schoolname' => $request->order_data[10]["value"],
                            'schoolstreet' => $request->order_data[11]["value"],
                            'schoolcity' => $request->order_data[12]["value"],
                            'placeofhandover' => $request->order_data[13]["value"],
                            'schoolphonenumber' => $request->order_data[14]["value"]]);
                }

                return response()->json($request->order_data[3]["value"], 200);
            } catch (Exception $e) {
                return response()->json($e, 500);
            }
        } else {
            try {
                HourlyOrder::find($request->order_data[0]["value"])->update(
                    ['startdate' => $this->concatenateDatetime($request->order_data[1]["value"], $request->order_data[3]["value"]),
                        'enddate' => $this->concatenateDatetime($request->order_data[2]["value"], $request->order_data[4]["value"]),
                        'fk_status' => $request->order_data[5]["value"],
                        'name' => $request->order_data[6]["value"],
                        'surname' => $request->order_data[7]["value"],
                        'email' => $request->order_data[8]["value"],
                        'phonenumber' => $request->order_data[9]["value"],
                        'nebisusernumber' => $request->order_data[10]["value"],
                        'fk_delivery' => $request->order_data[11]["value"],
                    ]);

                return response()->json($request->order_data[5]["value"], 200);
            } catch (Exception $e) {
                return response()->json($e, 500);
            }
        }
    }

    private function concatenateDatetime($date, $time)
    {
        $tempDate = explode(".", $date);
        $newDate = $tempDate[2] . "-" . $tempDate[1] . "-" . $tempDate[0];

        // Concatenate date and time
        $datetimeString = $newDate . " " . $time;

        return $datetimeString;
    }

    /**
     * get all themeboxes
     * @return mixed
     */
    public function getThemeboxes()
    {
        $themeboxes = Themebox::get();
        $themeboxes = $themeboxes->sortBy('title');
        return $themeboxes;
    }

    public function getCategories()
    {
        $categories = Category::all();
        $categories = $categories->sortBy('name');
        return $categories;
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
            if ("Bereit" == Status::find($new_state_id)->name && 1 == $order["fk_delivery"]) {
                $this->sendEmail($order_id);
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

    public function removeCategory(Request $request)
    {
        $category_id = $request->category_id;
        $category = Category::find($category_id);

        $themeboxes = Themebox::where('fk_category', $category_id)->get();

        if (count($themeboxes) != 0) {
            // If there are associated themeboxes, return an error response
            return response()->json(["message" => "Cannot delete category with associated themeboxes."], 409);
        }

        try {
            $category->forceDelete();
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

            return response()->json(["themeboxes" => $themeboxes_tmp], 200);
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
        $themebox->fk_category = $request->themebox_data[6]["value"];
        $themebox->fk_order_type = $request->themebox_data[7]["value"];
        $themebox->content = $request->themebox_data[8]["value"];
        $themebox->extra_text = $request->themebox_data[9]["value"];
        $themebox->complete = true;

        try {
            $themebox->save();
            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function createCategory(Request $request)
    {
        $category = new Category();
        $category->name = $request->category_data[0]["value"];
        $category->save();
        return response()->json([], 200);
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

        $category = Category::find($themebox->fk_category);
        $order_type = Order_Type::find($themebox->fk_order_type);

        return response()->json([$themebox, $category,$order_type], 200);
    }

    public function getCategory(Request $request)
    {
        $category_Id = $request["category_id"];
        $category = Category::find($category_Id);

        return response()->json($category, 200);
    }

    /**
     * update themebox
     * @param Request $request
     * @return mixed
     */
    public function updateThemebox(Request $request)
    {
        try {
            Themebox::find($request->themebox_data[0]["value"])->update(
                ['title' => $request->themebox_data[1]["value"],
                    'signatur' => $request->themebox_data[2]["value"],
                    'schoollevel' => $request->themebox_data[3]["value"],
                    'barcode' => $request->themebox_data[4]["value"],
                    'size' => $request->themebox_data[5]["value"],
                    'weight' => $request->themebox_data[6]["value"],
                    'fk_category' => $request->themebox_data[7]["value"],
                    'fk_order_type' => $request->themebox_data[8]["value"],
                    'content' => $request->themebox_data[9]["value"],
                    'extra_text' => $request->themebox_data[10]["value"]]
            );

            $status = 0;
            if (!empty($request->themebox_data[10]["value"])) {
                $status = 1;
            }

            Themebox::find($request->themebox_data[0]["value"])->update(
                ['complete' => $status]);

            return response()->json($request, 200);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function updateCategory(Request $request)
    {
        try {
            $category_id = $request->category_data[0]["value"];
            $category_name = $request->category_data[1]["value"];

            Category::find($category_id)->update(
                ['name' => $category_name]
            );

            return response()->json($request, 200);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * send email when order state ready
     * @param $order_id
     */

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
            $message->to($mail_data['receiver_mail'], $mail_data['receiver_name'] . " " . $mail_data['receiver_surname'])->bcc('christian.hasley1337@gmail.com', 'Bibliothek Windisch')->subject('Abholungseinladung Themenkiste');
        });
    }


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
            return view('admin.blocked-periods_index', ['blocked_periods' => $this->getBlockedPeriods()]);
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
    public function getBlockedPeriod(Request $request)
    {

        $blocked_period = Blocked_Period::find($request->blocked_period_id);

        try {
            return response()->json($blocked_period, 200);
        } catch (Exception $e) {
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
    public function updateBlockedPeriod(Request $request)
    {

        try {
            Blocked_Period::find($request->blocked_period_data[0]["value"])->update(
                ['reason' => $request->blocked_period_data[1]["value"],
                    'startdate' => $this->formatDate($request->blocked_period_data[2]["value"]),
                    'enddate' => $this->formatDate($request->blocked_period_data[3]["value"])
                ]);

            return response()->json($request, 200);
        } catch (Exception $e) {
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
     * @return Factory|\Illuminate\View\View
     */
    public function indexChangeCredentials()
    {
        if ($this->checkLogin()) {
            return view('admin/indexChangeCredentials', ['currentAdminEmail' => $this->getAdminEmail()]);
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
     * return the poweruser password
     */
    public function getPoweruserPassword()
    {
        $login = Login::find(2);

        return $login->password;
    }

    /**
     * update email
     * @param Request $request
     * @return mixed
     */
    public function updateAdminEmail(Request $request)
    {

        //check if email and confirmation email are the same
        if ($request->email != $request->confirm_email) {
            return redirect('admin/changeCredentials')->with('alert-message', 'E-Mail stimmen nicht überein!');
        }

        $this->setAdminEmail($request->email);

        return redirect('admin/changeCredentials')->with('success-message', 'E-Mail geändert!');
    }

    /**
     * update password
     * @param Request $request
     * @return mixed
     */
    public function updatePassword(Request $request)
    {

        $passwords = $request->all();

        if (Hash::check($passwords["password-now"], $this->getPassword())) {
            if ($passwords["password"] == $passwords["confirm_password"]) {

                try {
                    $password = $passwords["confirm_password"];
                    $hashed_password = Hash::make($password);

                    $pass = Login::find(1);
                    $pass->password = $hashed_password;
                    $pass->save();

                    return redirect('admin/changeCredentials')->with('success-message', 'Das Passwort wurde geändert!');
                } catch (Exception $e) {
                    return redirect('admin/changeCredentials')->with('alert-message', 'Das Passwort konnte nicht geändert werden!');

                }
            } else {
                return redirect('admin/changeCredentials')->with('alert-message', 'Das Passwort konnte nicht geändert werden! Bitte geben Sie Bestätigen Sie das Passwort, mit erneuter Eingabe.');
            }
        } else {
            return redirect('admin/changeCredentials')->with('alert-message', 'Das Passwort konnte nicht geändert werden! Ihr eingebenes Passwort entspricht nicht dem aktuellen Passwort!');
        }
    }

    /**
     * update poweruser password
     * @param Request $request
     * @return mixed
     */
    public function updatePoweruserPassword(Request $request)
    {

        $passwords = $request->all();

        if (Hash::check($passwords["poweruser-password-now"], $this->getPoweruserPassword())) {
            if ($passwords["poweruser-password"] == $passwords["poweruser-confirm_password"]) {

                try {
                    $password = $passwords["poweruser-confirm_password"];
                    $hashed_password = Hash::make($password);

                    $pass = Login::find(2);
                    $pass->password = $hashed_password;
                    $pass->save();

                    return redirect('admin/changeCredentials')->with('success-message', 'Das Passwort wurde geändert!');
                } catch (Exception $e) {
                    return redirect('admin/changeCredentials')->with('alert-message', 'Das Passwort konnte nicht geändert werden!');

                }
            } else {
                return redirect('admin/changeCredentials')->with('alert-message', 'Das Passwort konnte nicht geändert werden! Bitte geben Sie Bestätigen Sie das Passwort, mit erneuter Eingabe.');
            }
        } else {
            return redirect('admin/changeCredentials')->with('alert-message', 'Das Passwort konnte nicht geändert werden! Ihr eingebenes Passwort entspricht nicht dem aktuellen Passwort!');
        }
    }


    /**
     * render index email
     * @return Factory|\Illuminate\View\View
     */
    public function indexEmail()
    {
        if ($this->checkLogin()) {

            $all_mails = $this->getAllMails();

            $mails = array();

            foreach ($all_mails as $all_mail) {
                $mails[] = $all_mail;
            }

            return view('admin/indexEmail')->with('mails', $mails);
        } else {
            return view('admin/login_form');
        }
    }


    /**
     * find order id based
     * @param Request $request
     * @return mixed
     */
    public function getMail(Request $request)
    {
        $mail = EditMail::find($request->mail_id);

        try {
            return response()->json($mail, 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    /**
     * get all mails
     */
    public function getAllMails()
    {
        $all_mails = EditMail::get();
        return $all_mails;
    }


    /**
     * update mail
     * @param Request $request
     * @return mixed
     */
    public function updateMail(Request $request)
    {
        try {
            EditMail::find($request->mailIdAndText[0]["value"])->update(
                ['mail_text' => $request->mailIdAndText[1]["value"]]);

            return response()->json($request, 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
}