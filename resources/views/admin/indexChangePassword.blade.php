@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">

    <script src="{{ asset('js/callback-modal.js') }}"></script>
    <script src="{{ asset('js/admin/change-password.js') }}"></script>


    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">Passwort ändern</h1>
        <div class="panel panel-default no-border  margin-top-less" id="table-content">
            <div class="modal-body">
                <div class="row">
                    <div class="panel-body margin-less">
                        <div class="row thekre-row">
                            <form action="updatePassword" method="post" id="password-change-form" autocomplete="off">
                                <div class="form-group">
                                    <label class="float-left" for="password-now">Aktuelles Passwort:</label>
                                    <input type="password" name="password-now" class="form-control" id="password-now" required/>
                                </div>
                                <div class="form-group">
                                    <label class="float-left" for="password">Neues Passwort:</label>
                                    <input type="password" name="password" class="form-control" id="password" required/>
                                </div>
                                <div class="form-group">
                                    <label class="float-left" for="confirm_password">Passwort erneut eingeben:</label>
                                    <input type="password" class="form-control" name="confirm_password" id="confirm_password" required/>
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-primary float-right" onclick="checkPassword()" value="Speichern"/>
                                    <!--<button class="btn btn-primary float-right" onclick="checkPassword()">Speichern</button>-->
                                </div>
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection