@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_background')
    <div class="alert alert-danger" id="login-error-message-box">
        Login Fehlgeschlagen.
    </div>

    <script src="{{ asset('/js/admin/login.js') }}"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Administrator Login</h1>
        <div class="form-group">
            <label for="password">Passwort:</label>
            <input type="password" class="form-control" id="admin-password" name="password"/>
        </div>
        <button type="submit" id="login-button" class="btn btn-success btn-lg">Login</button>
    </div>
@endsection