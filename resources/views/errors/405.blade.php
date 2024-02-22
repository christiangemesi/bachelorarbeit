@extends('layouts.master')
@section('title', 'ThekRe')

@section('content')
    @include('layouts.nav_background')

    <div id="page-content-wrapper">
        <div class="col-md-12 main-Panel">
            <div class="row">
                <div class="col-md-12">
                    <h1>Die Seite existiert leider nicht…</h1>

                    <p class="order_feeback_text">Entschuldigung, aber die Webseite die Sie versucht haben zu erreichen, ist unter dieser Adresse nicht verfügbar.</p>

                    <a href="../">
                        <button type="button" class="btn btn-primary">Zurück zur Startseite</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection