<?php

namespace ThekRe\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Request;
use Illuminate\View\View;
use League\Flysystem\Exception;
use ThekRe\Blocked_Period;
use ThekRe\Category;
use ThekRe\Delivery;
use ThekRe\HourlyOrder;
use ThekRe\Http\Requests;
use ThekRe\Order;
use ThekRe\Themebox;
use ThekRe\Status;
use Illuminate\Support\Facades\Mail;
use ThekRe\EditMail;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * render user start page
     * @return Factory|View
     */
    public function index()
    {

        $themeboxes = Themebox::all();
        $deliveries = Delivery::all();
        $categories = Category::all();
        $schoollevel = $this->getAllSchoolLevel();

        return view('user/index', [
            'themeboxes' => $themeboxes,
            'deliveries' => $deliveries,
            'categories' => $categories,
            'schulklassen' => $schoollevel,
        ]);
    }

    /**
     * get all the themeboxes
     */
    public function getAllThemeboxes()
    {
        $themeboxes = Themebox::all();

        return response()->json($themeboxes, 200);
    }


    /**
     * get all the school levels
     */
    public function getAllSchoolLevel()
    {
        // Select all schoollevel from themebox in alphabetical order
        $schulklassen = Themebox::select('schoollevel')->distinct()->orderBy('schoollevel', 'asc')->get();

        return $schulklassen;
    }

    /**
     * get all themeboxes with present category and school level
     */
    public function getThemeboxesByFilter(Request $request)
    {
        // Decode the selected category data
        $selectedCategory = json_decode($request->selectedCategoryData, true);
        $categoryID = !empty($selectedCategory) ? $selectedCategory['pk_category'] : null;

        // Get an array of selected school levels
        $selectedSchoolLevels = !empty($request->selectedSchoolLevels) ? explode(",", $request->selectedSchoolLevels) : [];

        // Start building the query
        $query = Themebox::query();

        // Apply category filter if available
        if (!is_null($categoryID)) {
            $query->where('fk_category', $categoryID);
        }

        // Apply school level filter if available
        if (!empty($selectedSchoolLevels)) {
            $query->whereIn('schoollevel', $selectedSchoolLevels);
        }

        // Get the theme boxes based on the applied filters
        $themeboxes = $query->get();

        return response()->json(['themeboxes' => $themeboxes], 200);
    }


    /**
     * get themebox data from selected themebox
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getThemebox(Request $request)
    {

        $themebox_Id = $request["themeboxId"];
        $themebox = Themebox::find($themebox_Id);

        $orders = Order::select('startdate', 'enddate')->where('fk_themebox', '=', $themebox_Id)->get();

        $data = array(
            "themebox" => $themebox,
            "orders" => $orders,
        );

        return response()->json(['data' => $data], 200);
    }

    /**
     * get themebox data from selected themebox
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getThemeboxContent(Request $request)
    {
        $themebox_Id = $request["themeboxId"];
        $themebox = Themebox::find($themebox_Id);

        return response()->json($themebox, 200);
    }


    /**
     * create new order
     * @param Request $request
     */
    public function createOrder(Request $request){
        //set the order_type where as 1 == hourly order and 2 == daily order
        $order_type = $request->selectedVon || $request->selectedBis ? 1 : 2;
        error_log("order_type: " . $order_type);

        if($order_type == 1){ //hourly order
            $startDatetime = $this->concatenateDatetime($request->startdate, $request->selectedVon);

            $endDatetime = $this->concatenateDatetime($request->enddate, $request->selectedBis);

            error_log($request);
            $hourly_order = new HourlyOrder();
            $hourly_order->fk_themebox = $request->themeboxId;
            $hourly_order->StartDateTime = $startDatetime; // Set the start date and time
            $hourly_order->EndDateTime = $endDatetime; // Set the end date and time
            $hourly_order->name = $request->name;
            $hourly_order->surname = $request->surname;
            $hourly_order->email = $request->email;
            $hourly_order->phonenumber = $request->phone;
            $hourly_order->nebisusernumber = $request->nebisusernumber;
            $hourly_order->fk_status = 1; // You may need to adjust this based on your requirements
            $hourly_order->ordernumber = $this->createOrdernumber();
            $dt = Carbon::now();
            $hourly_order->datecreated = $dt;

            $themebox = Themebox::find($hourly_order->fk_themebox);

            $mail_data = array(
                'title' => $themebox->title,
                'signatur' => $themebox->signatur,
                'startdate' => $request->StartDateTime,
                'enddate' => $request->EndDateTime,
                'receiver_mail' => $hourly_order->email,
                'receiver_name' => $hourly_order->name,
                'receiver_surname' => $hourly_order->surname,
                'ordernumber' => $hourly_order->ordernumber,
                'extra_text' => $themebox->extra_text
            );

            try {
                $this->sendEmail($mail_data, $request->delivery);
                $hourly_order->save();
                return redirect()->route('orderSuccess');
            } catch (Exception $e) {
                return redirect()->route('orderFailed');
            }
        } else { //daily order
            $order = new Order();
            $order->fk_themebox = $request->themeboxId;
            $order->startdate = $this->formatDate($request->startdate);
            $order->enddate = $this->formatDate($request->enddate);
            $order->name = $request->name;
            $order->surname = $request->surname;
            $order->email = $request->email;
            $order->phonenumber = $request->phone;
            $order->nebisusernumber = $request->nebisusernumber;
            $order->fk_delivery = $request->delivery;

            if ($request->delivery == 2) {
                $order->schoolname = $request->schoolname;
                $order->schoolstreet = $request->schoolstreet;
                $order->schoolcity = $request->schoolcity;
                $order->schoolphonenumber = $request->schoolphonenumber;
                $order->placeofhandover = $request->placeofhandover;
            }

            $order->fk_status = 1;
            $order->ordernumber = $this->createOrdernumber();
            $dt = Carbon::now();
            $order->datecreated = $dt;

            $themebox = Themebox::find($order->fk_themebox);

            $mail_data = array(
                'title' => $themebox->title,
                'signatur' => $themebox->signatur,
                'startdate' => $request->startdate,
                'enddate' => $request->enddate,
                'receiver_mail' => $order->email,
                'receiver_name' => $order->name,
                'receiver_surname' => $order->surname,
                'ordernumber' => $order->ordernumber,
                'extra_text' => $themebox->extra_text
            );

            try {
                $this->sendEmail($mail_data, $request->delivery);
                $order->save();
                return redirect()->route('orderSuccess');
            } catch (Exception $e) {
                return redirect()->route('orderFailed');
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
     * render order success view
     * @return Factory|View
     */
    public function orderSuccess()
    {
        return view('user/order_success');
    }

    /**
     * render order failed view
     * @return Factory|View
     */
    public function orderFailed()
    {
        return view('user/order_failed');
    }

    /**
     * create ordernumber
     * @return string
     */
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

    /**
     * create random number for the ordernumber
     * @return string
     */
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

    /**
     * send the order email
     * @param $mail_data
     * @param $delivery_type
     */
    public function sendEmail($mail_data, $delivery_type)
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

            error_log("delivery_type: " . $delivery_type);

            $mail = EditMail::find(1);
            error_log("mail: " . $mail);
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
            $message->to($mail_data['receiver_mail'], $mail_data['receiver_name'] . " " . $mail_data['receiver_surname'])->bcc('christian.hasley1337@gmail.com', 'Bibliothek Windisch')->subject('Bestellbestätigung Themenkiste');
        });
    }

    /**
     * get the next monday for delivery to school
     * @param $date
     * @return false|string
     */
    public function getNextMonday($date)
    {
        return date('d.m.Y', strtotime('next monday', strtotime($date)));
    }

    /**
     * load user login view
     * @return Factory|View
     */
    public function loginForm()
    {
        return view('user/login_form');
    }

    /**
     * check login and return order details
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $order = Order::where('name', $request->name)->where('ordernumber', '=', $request->ordernumber)->get();

        try {
            if (count($order) != 0) {
                $themebox = Themebox::find($order[0]->fk_themebox);
                $status = Status::find($order[0]->fk_status);
                $delivery = Delivery::find($order[0]->fk_delivery);
                $orders = Order::where('fk_themebox', $themebox->pk_themebox)->get();

                $data = array("order" => $order,
                    "themebox" => $themebox,
                    "status" => $status,
                    "delivery" => $delivery,
                    "orders" => $orders);

                return response()->json($data);
            } else {
                return response()->json($request, 500);
            }
        } catch (Exception $e) {
            return response()->json([], 500);
        }
    }

    /**
     * get order by ordernumber
     * @param $ordernumber
     * @return mixed
     */
    public function getOrder($ordernumber)
    {
        $order = Order::where('ordernumber', $ordernumber)->get();
        return $order;
    }

    /**
     * User can change the order dates by him/herself
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOrderDates(Request $request)
    {
        try {
            Order::find($request->order_data[0]["value"])->update(
                ['startdate' => $this->formatDate($request->order_data[1]["value"]),
                    'enddate' => $this->formatDate($request->order_data[2]["value"]),
                    'name' => $request->order_data[3]["value"],
                    'surname' => $request->order_data[4]["value"],
                    'email' => $request->order_data[5]["value"],
                    'phonenumber' => $request->order_data[6]["value"],
                    // 'nebisusernumber' => $request->order_data[7]["value"]
                ]
            );

            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json([], 500);
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
     * get blocked period data from selected blocked period
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBlockedPeriod(Request $request)
    {
        $blocked_period_Id = $request["blocked_period_Id"];
        $blocked_period = Blocked_Period::find($blocked_period_Id);

        $data = array(
            "blocked_period" => $blocked_period,
        );

        return response()->json(['data' => $data]);
    }



}