@extends('layouts.master')
@section('title', 'ThekRe - Poweruser')

@section('content')

    @include('layouts.nav_poweruser')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/order-buttons.css') }}">
    <link href="{{ asset('/summernote/summernote.css') }}" rel="stylesheet">
    <script src="{{ asset('/summernote/summernote.js') }}"></script>
    <script src="{{ asset('js/calendar/moment.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/calendar/fullcalendar.css') }}">
    <script src="{{ asset('js/calendar/fullcalendar.js') }}"></script>
    <script src="{{ asset('js/calendar/de-ch.js') }}"></script>
    <script src="{{ asset('js/poweruser/order-form.js') }}"></script>
    <script src="{{ asset('js/poweruser/order-table.js') }}"></script>
    <script src="{{ asset('js/calendar/event-creator.js') }}"></script>
    <script src="{{ asset('js/calendar/add-first-block.js') }}"></script>
    <script src="{{ asset('js/callback-modal.js') }}"></script>


    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">

                @include("layouts.callback_messages")

                <div id="modal-delete-order-warning">
                    <div class="panel-heading modal-header-warning"> <span class="glyphicon glyphicon-flash" id="thekmodal-glyphicon-flash" aria-hidden="true"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <h2 class="delete-warning-header-text">Wollen Sie die Themenkiste wirklich löschen?</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="button-delete-order-confirm" class="btn btn-lg btn-warning float-left">Eintrag löschen</button>
                        <button type="button" class="btn btn-lg btn-default btn-modal float-right" data-dismiss="modal">Schliessen</button>
                        <input type="hidden" id="object-remove-id" />
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">Bestellungen</h1>
        <button type="button" class="btn btn-success btn-create-themebox" id="button-create-order"><span class="glyphicon glyphicon-plus"></span> Bestellung hinzufügen</button>
        <div class="row">
            <div class="col-sm-10">
            </div>
            <div class="col-sm-2">
                <label class="float-left" for="status-select">Suchen nach Status: </label>
                <select class="float-right form-dropdown thekre-dropdown-Admin" id="status-select">
                    <option value="0">All</option>
                    @foreach($statuses as $status)
                        <option value="{{$status["pk_status"]}}">{{$status["name"]}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="thekre-row"><div class="col-sm-12"></div></div>
        <div class="panel panel-default no-border  margin-top-less" id="table-content">

            <table id="new-order-table" class="data-table table table-bordered" cellspacing="0" width="100%">

                <thead>
                <tr>
                    <th>Bestellnummer</th>
                    <th>Besteller</th>
                    <th>Themenkiste</th>
                    <th>von</th>
                    <th>bis</th>
                    <th>Signatur</th>
                    <th>Lieferung</th>
                    <th>Status</th>
                    <th class="edit-column-width"></th>
                </tr>
                </thead>
                <tbody>
                @foreach ($orders as $order)
                    <tr>
                        <td>
                            {{$order["ordernumber"]}}
                        </td>
                        <td>
                            {{$order["name"]}}
                        </td>
                        <td>
                            {{$order["themebox"]}}
                        </td>
                        <td>
                            {{$order["startdate"]}}
                        </td>
                        <td>
                            {{$order["enddate"]}}
                        </td>
                        <td>
                            {{$order["themeboxsig"]}}
                        </td>
                        <td>
                            {{$order["deliverytype"]}}
                        </td>
                        <td>
                            <select id="status-list-{{$order["order_id"]}}" name="status"
                                    class="form-dropdown thekre-dropdown-Admin status-update">
                                <option value={{$order["fk_status"] . "-" . $order["order_id"]}}>{{$order["status"]}}</option>
                                @if(isset($statuses[$order["fk_status"]]))
                                    <option value={{$statuses[$order["fk_status"]]["pk_status"] . "-" . $order["order_id"]}}>{{$statuses[$order["fk_status"]]["name"]}}</option>
                                @endif
                            </select>
                        </td>
                        <td>
                            <div id="outer">
                                <button type="button" class="button-edit-order btn btn-primary inner" value="{{$order["order_id"]}}" aria-label="edit" data-toggle="tooltip" data-placement="top" title="Bestellung bearbeiten">
                                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                </button>

                                <button type="button" class="button-print-order btn btn-warning inner" value="{{$order["order_id"]}}" aria-label="print" data-toggle="tooltip" data-placement="top" title="Bestellung ausdrucken">
                                    <span class="glyphicon glyphicon-print" aria-hidden="true"></span>
                                </button>
                            </div>

                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal fade" id="order-add-modal" tabindex="-1">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading themebox-new-title">
                        Bestellung hinzufügen
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <form id="order-add-form" autocomplete="off">
                            <div class="col-md-5 thekre-row overflow-order-user-box">
                                <div class="panel-body margin-less">
                                    <div class="row thekre-row">
                                        <div class="form-group">
                                            <label class="float-left" for="orderAdd-thembox">Themenkiste</label>
                                            <select class="form-control" id="orderAdd-thembox">
                                                @foreach($themeboxes as $thembox)
                                                    <option value={{$thembox["pk_themebox"]}}>{{$thembox["title"]}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="form-group text-align-left">
                                            <label for="orderAdd-start-date">Von</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control cursor-pointer modal-datepicker" id="orderAdd-start-date" name="orderAdd-start-date">
                                                <span class="input-group-addon cursor-pointer" id="orderAdd-from-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                            </div>
                                        </div>
                                        <div class="form-group text-align-left">
                                            <label for="orderAdd-end-date">Bis</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control cursor-pointer modal-datepicker" id="orderAdd-end-date" name="orderAdd-end-date">
                                                <span class="input-group-addon cursor-pointer" id="orderAdd-to-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                            </div>
                                            <div class="alert alert-danger display-none" id="error-calendar-message-box"></div>
                                            <div class="alert alert-info display-none" id="info-calendar-message-box"></div>
                                        </div>
                                        <div id="orderAdd-personal-data-box-admin">
                                            <div class="form-group has-feedback">
                                                <label class="float-left" for="orderAdd-nachname">Nachname</label>
                                                <input type="text" class="form-control" id="orderAdd-nachname" name="orderAdd-nachname" maxlength="40" onkeyup="lastNameValidate('orderAdd-nachname','orderAdd-lastNameInputStatus','orderAdd-lastNameIcon')" onblur="lastNameValidate('orderAdd-nachname','orderAdd-lastNameInputStatus','orderAdd-lastNameIcon')"/>
                                                <span id="orderAdd-lastNameIcon" aria-hidden="true"></span>
                                                <span id="orderAdd-lastNameInputStatus" class="errorHeader">Nachname wird benötigt!</span>
                                            </div>

                                            <div class="form-group">
                                                <label class="float-left" for="orderAdd-name">Vorname</label>
                                                <input type="text" class="form-control" id="orderAdd-name" name="orderAdd-name" onkeyup="firstNameValidate('orderAdd-name','orderAdd-firstNameInputStatus','orderAdd-firstNameIcon')" onblur="firstNameValidate('orderAdd-name','orderAdd-firstNameInputStatus','orderAdd-firstNameIcon')"/>
                                                <span id="orderAdd-firstNameIcon"></span>
                                                <span id="orderAdd-firstNameInputStatus" class="errorHeader">Vorname wird benötigt!</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="float-left" for="orderAdd-email">Email</label>
                                                <input  type="email" class="form-control" id="orderAdd-email" name="orderAdd-email" onkeyup="emailValidate('orderAdd-email','orderAdd-emailInputStatus','orderAdd-emailIcon')" onblur="emailValidate('orderAdd-email','orderAdd-emailInputStatus','orderAdd-emailIcon')"/>
                                                <span id="orderAdd-emailIcon" aria-hidden="true"></span>
                                                <span id="orderAdd-emailInputStatus" class="errorHeader">Email wird benötigt!</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="float-left" for="orderAdd-phone">Telefonnummer</label>
                                                <input type="tel" class="form-control" id="orderAdd-phone" name="orderAdd-phone" onkeyup="phoneValidate('orderAdd-phone','orderAdd-phoneInputStatus','orderAdd-phoneIcon')" onblur="phoneValidate('orderAdd-phone','orderAdd-phoneInputStatus','orderAdd-phoneIcon')"/>
                                                <span id="orderAdd-phoneIcon" aria-hidden="true"></span>
                                                <span id="orderAdd-phoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="float-left" for="orderAdd-Nebisnumber" >Bibliotheksausweisnumber</label>
                                                <input type="text" class="form-control" id="orderAdd-Nebisnumber" name="orderAdd-Nebisnumber" onkeyup="nebisValidate('orderAdd-Nebisnumber','orderAdd-nebisInputStatus','orderAdd-nebisIcon')" onblur="nebisValidate('orderAdd-Nebisnumber','orderAdd-nebisInputStatus','orderAdd-nebisIcon')">
                                                <span id="orderAdd-nebisIcon" aria-hidden="true"></span>
                                                <span id="orderAdd-nebisInputStatus" class="errorHeader">Nummer wird benötigt!</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="form-group">
                                                <label class="float-left" for="orderAdd-delivery">Lieferart</label>
                                                <select name="orderAdd-delivery" id="orderAdd-delivery" class="form-dropdown">

                                                </select>
                                            </div>
                                        </div>
                                        <div id="orderAdd-delivery-data-box-admin">
                                            <div id="orderAdd-delivery-type" class="display-none">
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="orderAdd-schoolname">Name der Schule</label>
                                                    <input type="text" class="form-control" id="orderAdd-schoolname" name="orderAdd-schoolname" maxlength="60" onkeyup = "schoolnameValidate('orderAdd-schoolname','orderAdd-schoolNameInputStatus','orderAdd-schoolNameIcon')" onblur="schoolnameValidate('orderAdd-schoolname','orderAdd-schoolNameInputStatus','orderAdd-schoolNameIcon')"/>
                                                    <span id="orderAdd-schoolNameIcon" aria-hidden="true"></span>
                                                    <span id="orderAdd-schoolNameInputStatus" class="errorHeader">Name der Schule wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="orderAdd-schoolstreet">Strasse und Nr</label>
                                                    <input type="text" class="form-control" id="orderAdd-schoolstreet" name="orderAdd-schoolstreet" maxlength="60" onkeyup = "schoolstreetValidate('orderAdd-schoolstreet','orderAdd-schoolstreetInputStatus','orderAdd-schoolstreetIcon')" onblur="schoolstreetValidate('orderAdd-schoolstreet','orderAdd-schoolstreetInputStatus','orderAdd-schoolstreetIcon')"/>
                                                    <span id="orderAdd-schoolstreetIcon" aria-hidden="true"></span>
                                                    <span id="orderAdd-schoolstreetInputStatus" class="errorHeader">Strasse und Nr wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="orderAdd-schoolcity">PLZ und Ort</label>
                                                    <input type="text" class="form-control" id="orderAdd-schoolcity" name="orderAdd-schoolcity" maxlength="60" onkeyup = "schoolcityValidate('orderAdd-schoolcity','orderAdd-schoolcityInputStatus','orderAdd-schoolcityIcon')" onblur="schoolcityValidate('orderAdd-schoolcity','orderAdd-schoolcityInputStatus','orderAdd-schoolcityIcon')"/>
                                                    <span id="orderAdd-schoolcityIcon" aria-hidden="true"></span>
                                                    <span id="orderAdd-schoolcityInputStatus" class="errorHeader">PLZ und Ort wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="orderAdd-placeofhandover">Abgabeort an der Schule</label>
                                                    <input type="text" class="form-control" id="orderAdd-placeofhandover" name="orderAdd-placeofhandover" maxlength="60" onkeyup = "placeofhandoverValidate('orderAdd-placeofhandover','orderAdd-placeofhandoverInputStatus','orderAdd-placeofhandoverIcon')" onblur="placeofhandoverValidate('orderAdd-placeofhandover','orderAdd-placeofhandoverInputStatus','orderAdd-placeofhandoverIcon')"/>
                                                    <span id="orderAdd-placeofhandoverIcon" aria-hidden="true"></span>
                                                    <span id="orderAdd-placeofhandoverInputStatus" class="errorHeader">Abgabeort wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="orderAdd-schoolphoneInput">Tel.-Nr. der Schule</label>
                                                    <input type="text" class="form-control" name="orderAdd-schoolphonenumber" id="orderAdd-schoolphonenumber" maxlength="40" onkeyup = "schoolphoneValidate('orderAdd-schoolphonenumber','orderAdd-schoolphoneInputStatus','orderAdd-schoolphoneIcon')" onblur="schoolphoneValidate('orderAdd-schoolphonenumber','orderAdd-schoolphoneInputStatus','orderAdd-schoolphoneIcon')"/>
                                                    <span id="orderAdd-schoolphoneIcon" aria-hidden="true"></span>
                                                    <span id="orderAdd-schoolphoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="col-md-7">
                            <div class="margin-top-40" id='orderAdd-calendar'>
                            </div>
                            <hr>
                            <div id="order-calendar-legend">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-free">
                                            <div class="order-calendar-legend-text">Verfügbar</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-block">
                                            <div class="order-calendar-legend-text">Ausgeliehen</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-new">
                                            <div class="order-calendar-legend-text">Ihre Auswahl</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-blocked-period">
                                            <div class="order-calendar-legend-text">Geschlossen</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer" id="order-add-modal-footer">
                        <div class="row">
                            <div class="col-md-6">
                                <button type="button" class="btn btn-default float-left" data-dismiss="modal">Schliessen
                                </button>
                            </div>
                            <div class="col-md-6">
                                <button type="button" id="button-save-orderAdd" class="btn btn-primary float-right"
                                        data-dismiss="modal">Speichern
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="order-edit-modal" tabindex="-1">
        <div class="modal-dialog  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading themebox-new-title">
                        Bestellung bearbeiten
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <form id="order-edit-form" autocomplete="off">
                            <div class="col-md-5 thekre-row overflow-order-user-box">
                                <input type="hidden" value="" name="order-id" id="order-id"/>
                                <div class="panel-body margin-less">
                                    <div class="row thekre-row">
                                        <div class="form-group">
                                            <label class="float-left" for="ordernumber-edit">Bestellnummer</label>
                                            <input type="text" class="form-control" id="ordernumber-edit" name="ordernumber-edit" disabled/>
                                        </div>
                                        <div class="form-group">
                                            <label class="float-left" for="themebox-title">Themenkiste</label>
                                            <input type="text" class="form-control" id="themebox-title" name="themebox-title" disabled/>
                                        </div>
                                        <div class="form-group">
                                            <label class="float-left" for="themebox-signature">Signatur</label>
                                            <input type="text" class="form-control" id="themebox-signatur" name="themebox-signatur" disabled/>
                                        </div>
                                        <div class="form-group text-align-left">
                                            <label for="start-date">Von</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control cursor-pointer modal-datepicker" id="start-date" name="start-date">
                                                <span class="input-group-addon cursor-pointer" id="order-from-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                            </div>
                                        </div>
                                        <div class="form-group text-align-left">
                                            <label for="end-date">Bis</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control cursor-pointer modal-datepicker" id="end-date" name="end-date">
                                                <span class="input-group-addon cursor-pointer" id="order-to-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                            </div>
                                            <div class="alert alert-danger display-none" id="error-calendar-message-box"></div>
                                            <div class="alert alert-info display-none" id="info-calendar-message-box"></div>
                                        </div>

                                        <div class="form-group">
                                            <label class="float-left" for="status">Status</label>
                                            <select name="status" id="status" class="form-dropdown">
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="float-left" for="status">Bestelldatum</label>
                                            <input type="text" class="form-control" id="datecreated" name="datecreated" disabled>
                                        </div>

                                        <hr>
                                        <div id="personal-data-box-admin">
                                            <div class="form-group has-feedback">
                                                <label class="float-left" for="lastname">Nachname</label>
                                                <input type="text" class="form-control lastname" id="lastname" name="lastname" maxlength="40" onkeyup="lastNameValidate('lastname','lastNameInputStatus','lastNameIcon')" onblur="lastNameValidate('lastname','lastNameInputStatus','lastNameIcon')"/>
                                                <span id="lastNameIcon" aria-hidden="true"></span>
                                                <span id="lastNameInputStatus" class="errorHeader">Nachname wird benötigt!</span>
                                            </div>
                                            <div class="form-group has-feedback">
                                                <label class="float-left" for="surname">Vorname</label>
                                                <input type="text" class="form-control surname" id="surname" name="surname" maxlength="40" onkeyup="firstNameValidate('surname','firstNameInputStatus','firstNameIcon')" onblur="firstNameValidate('surname','firstNameInputStatus','firstNameIcon')"/>
                                                <span id="firstNameIcon"></span>
                                                <span id="firstNameInputStatus" class="errorHeader">Vorname wird benötigt!</span>
                                            </div>
                                            <div class="form-group has-feedback">
                                                <label class="float-left" for="email">Email</label>
                                                <input type="text" class="form-control email" id="email" name="email" maxlength="60" onkeyup = "emailValidate('email','emailInputStatus','emailIcon')" onblur="emailValidate('email','emailInputStatus','emailIcon')"/>
                                                <span id="emailIcon" aria-hidden="true"></span>
                                                <span id="emailInputStatus" class="errorHeader">Email wird benötigt!</span>
                                            </div>
                                            <div class="form-group has-feedback">
                                                <label class="float-left" for="phonenumber">Telefonnummer</label>
                                                <input type="text" class="form-control phonenumber" id="phonenumber" name="phonenumber" maxlength="40" onkeyup = "phoneValidate('phonenumber','phoneInputStatus','phoneIcon')" onblur="phoneValidate('phonenumber','phoneInputStatus','phoneIcon')"/>
                                                <span id="phoneIcon" aria-hidden="true"></span>
                                                <span id="phoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                            </div>
                                            <div class="form-group has-feedback">
                                                <label class="float-left" for="nebisusernumber">Bibliotheksnummer</label>
                                                <input type="text" class="form-control nebisusernumber" id="nebisusernumber" name="nebisusernumber" maxlength="40" onkeyup = "nebisValidate('nebisnumber','nebisInputStatus','nebisIcon')" onblur="nebisValidate('nebisnumber','nebisInputStatus','nebisIcon')"/>
                                                <span id="nebisIcon" aria-hidden="true"></span>
                                                <span id="nebisInputStatus" class="errorHeader">Nummer wird benötigt!</span>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="float-left" for="delivery">Lieferart</label>
                                            <select name="delivery" id="delivery" class="form-dropdown">
                                            </select>
                                        </div>

                                        <div id="delivery-data-box-admin">
                                            <div id="order-delivery-type" class="display-none">
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="schoolname">Name der Schule</label>
                                                    <input type="text" class="form-control" id="schoolname" name="schoolname" maxlength="60" onkeyup = "schoolnameValidate('schoolname','schoolNameInputStatus','schoolNameIcon')" onblur="schoolnameValidate('schoolname','schoolNameInputStatus','schoolNameIcon')"/>
                                                    <span id="schoolNameIcon" aria-hidden="true"></span>
                                                    <span id="schoolNameInputStatus" class="errorHeader">Name der Schule wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="schoolstreet">Strasse und Nr</label>
                                                    <input type="text" class="form-control" id="schoolstreet" name="schoolstreet" maxlength="60" onkeyup = "schoolstreetValidate('schoolstreet','schoolstreetInputStatus','schoolstreetIcon')" onblur="schoolstreetValidate('schoolstreet','schoolstreetInputStatus','schoolstreetIcon')"/>
                                                    <span id="schoolstreetIcon" aria-hidden="true"></span>
                                                    <span id="schoolstreetInputStatus" class="errorHeader">Strasse und Nr wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="schoolcity">PLZ und Ort</label>
                                                    <input type="text" class="form-control" id="schoolcity" name="schoolcity" maxlength="60" onkeyup = "schoolcityValidate('schoolcity','schoolcityInputStatus','schoolcityIcon')" onblur="schoolcityValidate('schoolcity','schoolcityInputStatus','schoolcityIcon')"/>
                                                    <span id="schoolcityIcon" aria-hidden="true"></span>
                                                    <span id="schoolcityInputStatus" class="errorHeader">PLZ und Ort wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="placeofhandover">Abgabeort an der Schule</label>
                                                    <input type="text" class="form-control" id="placeofhandover" name="placeofhandover" maxlength="60" onkeyup = "placeofhandoverValidate('placeofhandover','placeofhandoverInputStatus','placeofhandoverIcon')" onblur="placeofhandoverValidate('placeofhandover','placeofhandoverInputStatus','placeofhandoverIcon')"/>
                                                    <span id="placeofhandoverIcon" aria-hidden="true"></span>
                                                    <span id="placeofhandoverInputStatus" class="errorHeader">Abgabeort wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="float-left" for="schoolphoneInput">Tel.-Nr. der Schule</label>
                                                    <input type="text" class="form-control" name="schoolphonenumber" id="schoolphonenumber" maxlength="40" onkeyup = "schoolphoneValidate('schoolphonenumber','schoolphoneInputStatus','schoolphoneIcon')" onblur="schoolphoneValidate('schoolphonenumber','schoolphoneInputStatus','schoolphoneIcon')"/>
                                                    <span id="schoolphoneIcon" aria-hidden="true"></span>
                                                    <span id="schoolphoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="col-md-7">
                            <div class="margin-top-40" id='calendar'>
                            </div>
                            <hr>
                            <div id="order-calendar-legend">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-free">
                                            <div class="order-calendar-legend-text">Verfügbar</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-block">
                                            <div class="order-calendar-legend-text">Ausgeliehen</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-new">
                                            <div class="order-calendar-legend-text">Ihre Auswahl</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-blocked-period">
                                            <div class="order-calendar-legend-text">Geschlossen</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="panel-footer" id="modal-view-order-footer">
                    <div class="row">
                        <div class="col-md-6">
                            <button type="button" class="btn btn-default float-left" data-dismiss="modal">Schliessen
                            </button>
                        </div>
                        <div class="col-md-6">
                            <button type="button" id="button-save-order-change" class="btn btn-primary float-right"
                                    data-dismiss="modal">Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-order-edit-progress" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%;">
        <div class="modal-dialog modal-m">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Die Daten werden verarbeitet</h3>
                </div>
                <div class="modal-body">
                    <div class="progress progress-striped active">
                        <div class="progress-bar" style="width: 100%">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="printTable" class="hidden">
        @include('admin.print')
    </div>

@endsection