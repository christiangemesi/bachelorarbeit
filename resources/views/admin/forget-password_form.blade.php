@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_background')
    <script src="{{ asset('js/admin/forget-password.js') }}"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="email">E-Mail:</label>
            <input type="email" class="form-control" id="forget-password-email" name="email"/>
        </div>
        <button type="submit" id="forget-password-button" class="btn btn-success btn-lg">Passwort zurücksetzen</button>
    </div>
@endsection