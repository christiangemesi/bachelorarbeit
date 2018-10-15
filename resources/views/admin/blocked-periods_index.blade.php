@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/admin/blocked-periods.js') }}"></script>
    <script src="{{ asset('js/calendar/moment.min.js') }}"></script>
    <script src="{{ asset('js/calendar/fullcalendar.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/calendar/fullcalendar.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">
    <script src="{{ asset('/js/admin/blocked-periods-form.js') }}"></script>
    <script src="{{ asset('js/admin/blocked-periods-table.js') }}"></script>
    <script src="{{ asset('js/callback-modal.js') }}"></script>
    <script src="{{ asset('js/calendar/event-creator.js') }}"></script>



    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">

                @include("layouts.callback_messages")

                <div id="modal-delete-blocked-period-warning">
                    <div class="panel-heading modal-header-warning"> <span class="glyphicon glyphicon-flash" id="thekmodal-glyphicon-flash" aria-hidden="true"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <h2 class="delete-warning-header-text">Wollen Sie die Sperrfrist wirklich löschen?</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="button-delete-blocked-period-confirm" class="btn btn-lg btn-warning float-left">Sperrfrist löschen</button>
                        <button type="button" class="btn btn-lg btn-default btn-modal float-right" data-dismiss="modal">Schliessen</button>
                        <input type="hidden" id="object-remove-id" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="blocked-period-create-modal"  tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading blocked-period-new-title">
                        Neue Sperrfrist
                    </div>
                </div>
                <div class="model-body">
                    <form id="create-blocked-period-form" name="create-blocked-period-form" autocomplete="off">
                        <div class="panel-body">
                            <div class="row thekre-row blocked-period-create-form-background" id="blocked-period-data-box">
                                <div class="form-group has-feedback">
                                    <label class="blocked-period-form-label" for="blocked-period-reason">Sperrfrist Grund *</label>
                                    <input type="text" class="form-control" name="reason" id="blocked-period-reason" maxlength="100" placeholder="Betriebsferien"
                                           onblur="notEmptyValidation('blocked-period-reason', 'reason-form-icon', 'reason-form-status')"/>
                                    <span id="reason-form-icon"></span>
                                    <span id="reason-form-status" class="errorHeader">Grund wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="start-date">Startdatum *</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control cursor-pointer modal-datepicker" id="start-date" name="start-date" placeholder="24.12.2018"
                                                   onblur="notEmptyValidation('start-date', 'order-from-glyphicon', 'start-date-form-status')"
                                                   onkeyup="notEmptyValidation('start-date', 'order-from-glyphicon', 'start-date-form-status')"/>
                                            <span class="input-group-addon cursor-pointer" id="order-from-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                            <span id="start-date-form-status" class="errorHeader">Grund wird benötigt!</span>
                                        </div>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="end-date">Endatum *</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control cursor-pointer modal-datepicker" id="end-date" name="end-date" placeholder="03.01.2019"
                                               onblur="notEmptyValidation('end-date', 'order-to-glyphicon', 'end-date-form-status')"
                                               onkeyup="notEmptyValidation('end-date', 'order-to-glyphicon', 'end-date-form-status')"/>
                                        <span class="input-group-addon cursor-pointer" id="order-to-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                        <span id="end-date-form-status" class="errorHeader">Grund wird benötigt!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-2">
                            <button type="button" class="btn btn-default callback-close" data-dismiss="modal">Schliessen</button>
                        </div>
                        <div class="col-md-10">
                            <button type="button" id="create-blocked-period-button" class="btn btn-success float-right" data-dismiss="modal" disabled>Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>





    <div class="modal fade" id="blocked-period-edit-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-primary">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading themebox-new-title">
                        Sperrfrist Bearbeiten
                    </div>
                </div>
                <div class="model-body">
                    <form id="edit-blocked-period-form" name="edit-blocked-period-form" autocomplete="off">
                        <div class="panel-body">
                            <div class="row thekre-row blocked-period-create-form-background" id="blocked-period-data-box">
                                <div class="form-group has-feedback">
                                    <label class="blocked-period-form-label" for="blocked-period-reason">Sperrfrist Grund *</label>
                                    <input type="text" class="form-control" name="reason" id="blocked-period-reason" maxlength="100" placeholder="Betriebsferien"
                                           onblur="notEmptyValidation('blocked-period-reason', 'reason-form-icon', 'reason-form-status')"/>
                                    <span id="reason-form-icon"></span>
                                    <span id="reason-form-status" class="errorHeader">Grund wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="start-date">Startdatum *</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control cursor-pointer modal-datepicker" id="blocked-period-start-date" name="start-date" placeholder="24.12.2018"
                                               onblur="notEmptyValidation('blocked-period-start-date', 'order-from-glyphicon', 'start-date-form-status')"
                                               onkeyup="notEmptyValidation('blocked-period-start-date', 'order-from-glyphicon', 'start-date-form-status')"/>
                                        <span class="input-group-addon cursor-pointer" id="order-from-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                        <span id="start-date-form-status" class="errorHeader">Grund wird benötigt!</span>
                                    </div>
                                </div>
                                <div class="form-group has-feedback">
                                    <label for="end-date">Endatum *</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control cursor-pointer modal-datepicker" id="blocked-period-end-date" name="end-date" placeholder="03.01.2019"
                                               onblur="notEmptyValidation('blocked-period-end-date', 'order-to-glyphicon', 'end-date-form-status')"
                                               onkeyup="notEmptyValidation('blocked-period-end-date', 'order-to-glyphicon', 'end-date-form-status')"/>
                                        <span class="input-group-addon cursor-pointer" id="order-to-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                        <span id="end-date-form-status" class="errorHeader">Grund wird benötigt!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-2">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Schliessen</button>
                        </div>
                        <div class="col-md-10">
                            <button type="button" id="button-save-blocked-period-change" class="btn btn-primary float-right" data-dismiss="modal">Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>







    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Sperrfristen</h1>
        <div class="row">
            <button type="button" class="btn btn-success btn-create-blocked-period" id="button-create-blocked-period"><span class="glyphicon glyphicon-plus"></span> Sperrfrist hinzufügen</button>
        </div>
        <div class="panel panel-default no-border" id="table-content">
            <table id="new-blocked-period-table" class="data-table table table-bordered" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th class="settings-name-column-width">Grund</th>
                    <th>Von</th>
                    <th>Bis</th>
                    <th class="edit-column-width"></th>
                </tr>
                </thead>
                <tbody>
                @foreach ($blocked_periods as $blocked_period)
                    <tr>
                        <td>
                            {{$blocked_period["reason"]}}
                        </td>
                        <td>
                            {{$blocked_period["startdate"]}}
                        </td>
                        <td>
                            {{$blocked_period["enddate"]}}
                        </td>
                        <td>
                            <button type="button" class="button-update btn btn-primary button-edit-blocked-period" aria-label="edit"  value="{{$blocked_period["pk_blocked-period"]}}}" data-toggle="tooltip" data-placement="top" title="Sperrfrist bearbeiten">
                                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="button-delete-blocked-period btn btn-danger" value="{{$blocked_period["pk_blocked-period"]}}" aria-label="delete" data-toggle="tooltip" data-placement="top" title="Sperrfrist löschen">
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
