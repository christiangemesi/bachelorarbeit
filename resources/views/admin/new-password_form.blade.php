@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_background')
    <div class="alert alert-success" id="passwort-reset-success-message-box">
        Passwort erfolgreich geändert.
    </div>

    <div class="alert alert-danger" id="email-reset-notExistent-message-box">
        Email stimmt nicht mit der Email überein, die mit diesem Account verknüpft ist.
    </div>

    <div class="alert alert-danger" id="reset-password-8character-message-box">
        Passwort muss mindestens 8 Zeichen lang sein.
    </div>

    <div class="alert alert-danger" id="reset-password-notMatch-message-box-2">
        Passwort und Passwortwiederholung stimmen nicht überein.
    </div>

    <div class="alert alert-danger" id="reset-password-Failed-message-box">
        Passwort zurücksetzen fehlgeschlagen.
    </div>

    <script src="{{ asset('js/admin/reset-password.js') }}"></script>

    <div class="col-md-12 admin-panel">
        <input type="text" name="token" id="reset-password-token" hidden value="{{$token}}">
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="email">Enter Email:</label>
            <input type="email" class="form-control" name="email" id="reset-password-email"/>
        </div>
        <div class="form-group">
            <label for="password">Enter new Password:</label>
            <input type="password" class="form-control" name="password" id="new-password-password"/>
        </div>
        <div class="form-group">
            <label for="password">Repeat new Password:</label>
            <input type="password" class="form-control" name="password_confirmation" id="new-password-confirmed"/>
        </div>
        <div>
            <span class="tooltiptext">Password must be at least 8 characters</span>
        </div>
        <button type="submit" id="reset-password-button" class="btn btn-success btn-lg">Change</button>
    </div>
@endsection
