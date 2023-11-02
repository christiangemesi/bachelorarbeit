@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_background')
    <div class="alert alert-success" id="passwort-reset-error-message-box">
        Wenn eine E-Mail-Adresse mit diesem Account verknüpft ist, wurde eine E-Mail mit einem Link zum Zurücksetzen des Passworts versendet.
    </div>

    <script src="{{ asset('js/admin/forget-password.js') }}"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="email">E-Mail:</label>
            <input type="email" class="form-control" id="forgot-password-email" name="email"/>
        </div>
        <button type="submit" id="forgot-password-button" class="btn btn-success btn-lg">Send Reset Link</button>
    </div>
@endsection