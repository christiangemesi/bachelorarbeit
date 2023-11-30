@extends('layouts.master')
@section('title', 'ThekRe')

@section('content')
    @include('layouts.nav_user')

        <div id="page-content-wrapper">
            <div class="col-md-12 main-Panel">
                <div class="row">
                    <div class="col-md-12">
                        <h1>Bestellung erfolgreich abgeschlossen!</h1>
                    </div>
                </div>
                <br><br>
                <div class="row">
                    <div class="col-md-1">
                        <span class="glyphicon glyphicon-ok-circle glyphicon-order-success"></span>
                    </div>

                    <div class="col-md-10">
                        <p class="order_feeback_text">
                            Vielen Dank für Ihre Bestellung. <br>
                            Sie erhalten in Kürze eine <b>E-Mail</b> mit den Informationen zu Ihrer Bestellung.
                            Es besteht die Möglichkeit, dass die Bestätigungs E-Mail in Ihrem Spam Ordner landet.</p>
                    </div>
                </div><br>
                <a href="../">
                    <button type="button" class="btn btn-primary">neue Themenkiste bestellen</button>
                </a>
            </div>
        </div>
@endsection