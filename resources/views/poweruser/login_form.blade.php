@extends('layouts.master')
@section('title', 'ThekRe - Poweruser')

@section('content')

    @include('layouts.nav_background')
    <div class="alert alert-danger" id="login-error-message-box">
        Login Fehlgeschlagen.
    </div>

    <script src="{{ asset('/js/poweruser/login.js') }}"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Poweruser Login</h1>
        <div class="form-group">
            <label for="password">Passwort:</label>
            <input type="password" class="form-control" id="poweruser-password" name="password"/>
        </div>
        <button type="submit" id="login-button" class="btn btn-success btn-lg">Login</button>
    </div>
@endsection