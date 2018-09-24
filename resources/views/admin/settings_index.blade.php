@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/admin/statistics-load.js') }}"></script>

    <div class="alert alert-danger" id="error-message-box"></div>

    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Einstellungen</h1>

        <div class="panel panel-default">
            <div class="spacer">
                <p>Hallo, ich bin die Einstellungsseite!</p>
                <br>
                <p>Lorem ipsum</p>
            </div>
        </div>
    </div>

@endsection

