@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_background')
    <div class="alert alert-success" id="passwort-reset-error-message-box">
        Wdsd
    </div>

     <script src="{{ asset('js/admin/reset-password.js') }}"></script>


    <div class="col-md-12 admin-panel">
        <input type ='text' name="token" value = '{{$token}}'>
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="password">Enter new Password:</label>
            <input type="password" class="form-control" name="password" id = "new-password-password"/>
        </div>
        <div class="form-group">
            <label for="password">Repeat new Password:</label>
            <input type="password" class="form-control" name="password_confirmation" id = "new-password-confirmed"/>
        </div>
        <button type="submit" id="reset-password-button" class="btn btn-success btn-lg">Change</button>
    </div>
@endsection