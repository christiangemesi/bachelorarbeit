@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_background')
    <div class="alert alert-success" id="passwort-reset-error-message-box">
        Wenn eine E-Mail-Adresse mit diesem Account verknüpft ist, wurde eine E-Mail mit einem Link zum Zurücksetzen des Passworts versendet.
    </div>

    {{-- <script src="{{ asset('js/admin/forget-password.js') }}"></script> --}}


    <input type ='text' name="token" hidden value = '{{$token}}'>
    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="email">E-Mail:</label>
            <input type="email" class="form-control" id="forget-password-email" name="email"/>
        </div>
        <div class="form-group">
            <label for="password">Enter new Password:</label>
            <input type="password" class="form-control" name="password"/>
        </div>
        <div class="form-group">
            <label for="password">Repeat new Password:</label>
            <input type="password" class="form-control" name="password_confirmation"/>
        </div>
        <button type="submit" id="forget-password-button" class="btn btn-success btn-lg">Send Reset Link</button>
    </div>
@endsection