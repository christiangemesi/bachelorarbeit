@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">

    <script src="{{ asset('js/callback-modal.js') }}"></script>
    <script src="{{ asset('js/admin/change-password.js') }}"></script>


    <meta name="csrf-token" content="{{ csrf_token() }}">


    @if(session()->has('alert-message'))
        <div class="alert alert-danger">
            {{ session()->get('alert-message') }}
        </div>
    @endif
    @if(session()->has('success-message'))
        <div class="alert alert-success">
            {{ session()->get('success-message') }}
        </div>
    @endif

    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Admin-E-Mail ändern</h1>
        <div class="panel panel-default no-border margin-top-less" id="table-content">
            <div class="modal-body">
                <div class="row">
                    <div class="panel-body margin-less">
                        <div class="row thekre-row">
                            <form action="updateAdminEmail" method="post" id="email-change-form" autocomplete="off">
                                <span class="email-now">
                                    <label class="float-left" for="email-now">Aktuelle E-Mail:</label>
                                    <input type="text" name="email-now" class="form-control" id="email-now"  value="<?php echo $currentAdminEmail; ?>" readonly  />
                                </span>
                                <div class="form-group">
                                    <label class="float-left" for="email">Neue E-Mail:</label>
                                    <input type="email" name="email" class="form-control" id="email" onchange="checkAdminEmail()" required />
                                </div>
                                <div class="form-group">
                                    <label class="float-left" for="confirm_email">E-Mail erneut eingeben:</label>
                                    <input type="email" name="confirm_email" class="form-control" id="confirm_email" onchange="checkAdminEmail()" required />
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-primary float-right" value="Speichern" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">Admin-Passwort ändern</h1>
        <div class="panel panel-default no-border  margin-top-less" id="table-content">
            <div class="modal-body">
                <div class="row">
                    <div class="panel-body margin-less">
                        <div class="row thekre-row">
                            <form action="updatePassword" method="post" id="password-change-form" autocomplete="off">
                                <div class="form-group">
                                    <label class="float-left" for="password-now">Aktuelles Passwort:</label>
                                    <input type="password" name="password-now" class="form-control" id="password-now" onchange="checkPassword()" required/>
                                </div>
                                <div class="form-group">
                                    <label class="float-left" for="password">Neues Passwort:</label>
                                    <input type="password" name="password" class="form-control" id="password" onchange="checkPassword()" required/>
                                </div>
                                <div class="form-group">
                                    <label class="float-left" for="confirm_password">Passwort erneut eingeben:</label>
                                    <input type="password" class="form-control" name="confirm_password" id="confirm_password" onchange="checkPassword()" required/>
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-primary float-right" value="Speichern"/>
                                </div>
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">Poweruser Passwort ändern</h1>
        <div class="panel panel-default no-border  margin-top-less" id="table-content">
            <div class="modal-body">
                <div class="row">
                    <div class="panel-body margin-less">
                        <div class="row thekre-row">
                            <form action="updatePoweruserPassword" method="post" id="password-change-form" autocomplete="off">
                                <div class="form-group">
                                    <label class="float-left" for="password-now">Aktuelles Passwort:</label>
                                    <input type="password" name="poweruser-password-now" class="form-control" id="poweruser-password-now" onchange="checkPoweruserPassword()" required/>
                                </div>
                                <div class="form-group">
                                    <label class="float-left" for="password">Neues Passwort:</label>
                                    <input type="password" name="poweruser-password" class="form-control" id="poweruser-password" onchange="checkPoweruserPassword()" required/>
                                </div>
                                <div class="form-group">
                                    <label class="float-left" for="confirm_password">Passwort erneut eingeben:</label>
                                    <input type="password" class="form-control" name="poweruser-confirm_password" id="poweruser-confirm_password" onchange="checkPoweruserPassword()" required/>
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-primary float-right" value="Speichern"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection