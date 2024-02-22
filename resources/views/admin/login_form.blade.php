@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_background')
    <div class="alert alert-danger" id="login-error-message-box">
        Login Fehlgeschlagen.
    </div>

    <div class="alert alert-success" id="passwort-reset-error-message-box">
        Wenn eine E-Mail-Adresse mit diesem Account verknüpft ist, wurde eine E-Mail mit einem Link zum Zurücksetzen des Passworts versendet.
    </div>

    <div class="alert alert-success" id="passwort-reset-success-message-box">
        Passwort erfolgreich geändert.
    </div>

    <script src="{{ asset('/js/admin/login.js') }}"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Administrator Login</h1>
        <div class="form-group">
            <label for="email">E-Mail:</label>
            <input type="email" class="form-control" id="admin-email" name="email"/>
        </div>
        <div class="form-group">
            <label for="password">Passwort:</label>
            <input type="password" class="form-control" id="admin-password" name="password"/>
        </div>
        <div>
            <a href="{{ url('/admin/forgetPasswordForm') }}">Passwort vergessen?</a>
        </div>
        <button type="submit" id="login-button" class="btn btn-success btn-lg">Login</button>
    </div>
@endsection