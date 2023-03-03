@extends('layouts.master')
@section('title', 'ThekRe')

@section('content')
    @include('layouts.nav_user')

    <div id="page-content-wrapper">
        <div class="col-md-12 main-Panel">
            <div class="row">
                <div class="col-md-12">
                    <h1>Bestellung fehlgeschlagen!</h1>
                </div>
            </div>
            <br><br>
            <div class="row">
                <div class="col-md-1">
                    <span class="glyphicon glyphicon-remove-circle glyphicon-order-failed"></span>
                </div>

                <div class="col-md-10">
                    <br>
                    <p class="order_feeback_text">Kontaktieren Sie bitte die FHNW Bibliothek Brugg-Windisch unter <a href="mailto:bibliothek.windisch@fhnw.ch">bibliothek.windisch@fhnw.ch</a></p>
                </div>
            </div>
        </div>
    </div>

@endsection