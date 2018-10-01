@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <script src="{{ asset('js/settings.js') }}"></script>
    <script src="{{ asset('/js/jquery-ui.js') }}"></script>




    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Einstellungen</h1>

        <div class="panel panel-default">
            <div class="spacer">
                <p>Hallo, ich bin die Einstellungsseite!</p>
                <br>
                <p>Lorem ipsum</p>

                <div class="form-group text-align-left">
                    <label for="blocked-dates">Von</label>
                    <div class="input-group">
                        <input type="text" class="form-control cursor-pointer modal-datepicker" id="blocked-dates" name="blocked-dates">
                        <span class="input-group-addon cursor-pointer" id="order-from-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>


            </div>
        </div>
    </div>

    <div>
    <!--foreach($blockedDates as $blockedDate)
        {$blockedDate->message}}
    endforeach
            -->
    </div>


    <form id="orderform" name="orderform" action="{{url('user/createBlockedPeriod')}}" method="post" autocomplete="off">
        Date one:<br>
        <input type="text" name="date" value="date">
        <br>
        <input type="submit" value="Submit">
    </form>

@endsection


