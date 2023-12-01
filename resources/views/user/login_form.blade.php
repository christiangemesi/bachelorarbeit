@extends('layouts.master')
@section('title', 'ThekRe')

@section('content')

    @include('layouts.nav_user')

    <div class="alert alert-danger display-none" id="login-user-error-message-box">
    </div>

    <script src="{{ asset('js/calendar/moment.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/calendar/fullcalendar.css') }}">
    <script src="{{ asset('js/calendar/fullcalendar.js') }}"></script>
    <script src="{{ asset('js/calendar/de-ch.js') }}"></script>
    <script src="{{ asset('/js/user/login.js') }}"></script>
    <script src="{{ asset('/js/user/order-form.js') }}"></script>
    <script src="{{ asset('js/calendar/event-creator.js') }}"></script>
    <script src="{{ asset('js/calendar/add-first-block.js') }}"></script>
    <script src="{{ asset('js/callback-modal.js') }}"></script>

    <div id="page-content-wrapper">
        <div class="col-md-12 main-Panel">
            <div class="row">
                <div class="col-md-12">
                    <h1>Bestellverwaltung</h1>
                    <br>
                    <div class="form-group">
                        <label for="name">Nachname der Bestellperson:</label>
                        <input type="text" class="form-control" id="name" name="name" autocomplete="off"/>
                    </div>
                    <div class="form-group">
                        <label for="order-number">Bestellnummmer:</label>
                        <input type="text" class="form-control" id="ordernumber" name="ordernumber" autocomplete="off"/>
                    </div>
                    <button id="user-login-button" class="btn btn-success btn-lg" >Bestellung Suchen</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="order-edit-user-modal"  tabindex="-1">
        <div class="modal-dialog  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading themebox-new-title">
                        Meine Bestellung
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <form id="order-edit-user-form" autocomplete="off">
                        <div class="col-md-6 thekre-row overflow-order-user-box">
                            <input type="hidden" value="" name="order-id" id="order-id"/>
                            <div class="panel-body margin-less">
                                <div class="row thekre-row">
                                    <div class="form-group">
                                        <label class="float-left" for="ordernumber-edit">Bestellnummer</label>
                                        <input type="text" class="form-control" id="ordernumber-edit" disabled="disabled"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="float-left" for="themebox-title">Themenkiste</label>
                                        <input type="text" class="form-control" id="themebox-title" disabled="disabled"/>
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
                                        <input type="text" class="form-control" id="status" disabled="disabled"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="float-left" for="status">Bestelldatum</label>
                                        <input type="text" class="form-control" id="datecreated-login" name="datecreated-login" disabled>
                                    </div>
                                    <hr>

                                    <div id="personal-data-box">
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="lastname">Nachname</label>
                                            <input type="text" class="form-control lastname" id="lastNameInput" name="lastname" maxlength="40" onkeyup="lastNameValidate()" onblur="lastNameValidate()"/>
                                            <span id="lastNameIcon" aria-hidden="true"></span>
                                            <span id="lastNameInputStatus" class="errorHeader">Nachname wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="surname">Vorname</label>
                                            <input type="text" class="form-control surname" id="firstNameInput" name="surname" maxlength="40" onkeyup = "firstNameValidate()" onblur="firstNameValidate()"/>
                                            <span id="firstNameIcon"></span>
                                            <span id="firstNameInputStatus" class="errorHeader">Vorname wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="email">E-Mail</label>
                                            <input type="text" class="form-control email" id="emailInput" name="email" maxlength="60" onkeyup = "emailValidate()" onblur="emailValidate()"/>
                                            <span id="emailIcon" aria-hidden="true"></span>
                                            <span id="emailInputStatus" class="errorHeader">E-Mail wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="phonenumber">Tel</label>
                                            <input type="text" class="form-control phonenumber" id="phone" name="phonenumber" maxlength="40" onkeyup = "phoneValidate()" onblur="phoneValidate()"/>
                                            <span id="phoneIcon" aria-hidden="true"></span>
                                            <span id="phoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="nebisusernumber">Bibliotheksausweisnummer</label>
                                            <input type="text" class="form-control nebisusernumber" id="nebisusernumber" name="nebisusernumber" maxlength="40" onkeyup = "nebisValidate()" onblur="nebisValidate()"/>
                                            <span id="nebisIcon" aria-hidden="true"></span>
                                            <span id="nebisInputStatus" class="errorHeader">Bibliotheksausweisnummer wird benötigt!</span>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="float-left" for="nebisnr">Lieferart</label>
                                        <input type="text" class="form-control" id="delivery" disabled="disabled"/>
                                    </div>

                                    <div id="order-delivery-type-deliver" class="display-none">
                                        <hr>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="schoolname">Name der Schule</label>
                                            <input type="text" class="form-control" id="schoolNameInput" name="schoolname" maxlength="60" onkeyup = "schoolnameValidate()" onblur="schoolnameValidate()" disabled/>
                                            <span id="schoolNameIcon" aria-hidden="true"></span>
                                            <span id="schoolNameInputStatus" class="errorHeader">Name der Schule wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="schoolstreet">Strasse und Nr</label>
                                            <input type="text" class="form-control" id="schoolstreetInput" name="schoolstreet" maxlength="60" onkeyup = "schoolstreetValidate()" onblur="schoolstreetValidate()" disabled/>
                                            <span id="schoolstreetIcon" aria-hidden="true"></span>
                                            <span id="schoolstreetInputStatus" class="errorHeader">Strasse und Nr wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="schoolcity">PLZ und Ort</label>
                                            <input type="text" class="form-control" id="schoolcityInput" name="schoolcity" maxlength="60" onkeyup = "schoolcityValidate()" onblur="schoolcityValidate()" disabled/>
                                            <span id="schoolcityIcon" aria-hidden="true"></span>
                                            <span id="schoolcityInputStatus" class="errorHeader">PLZ und Ort wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="placeofhandover">Abgabeort an der Schule</label>
                                            <input type="text" class="form-control" id="placeofhandoverInput" name="placeofhandover" maxlength="60" onkeyup = "placeofhandoverValidate()" onblur="placeofhandoverValidate()" disabled/>
                                            <span id="placeofhandoverIcon" aria-hidden="true"></span>
                                            <span id="placeofhandoverInputStatus" class="errorHeader">Abgabeort wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="float-left" for="schoolphoneInput">Tel.-Nr. der Schule</label>
                                            <input type="text" class="form-control" id="schoolphoneInput" name="schoolphonenumber" maxlength="40" onkeyup = "schoolphoneValidate()" onblur="schoolphoneValidate()" disabled/>
                                            <span id="schoolphoneIcon" aria-hidden="true"></span>
                                            <span id="schoolphoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div id='calendar' class="margin-top-user-order-modal">

                            </div>
                            <hr>
                            <div id="order-calendar-legend">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div id="order-calendar-legend-free"> <div class="order-calendar-legend-text">Verfügbar</div></div>
                                    </div>
                                    <div class="col-md-4">
                                        <div id="order-calendar-legend-block"><div class="order-calendar-legend-text">Ausgeliehen</div></div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="order-calendar-legend-new"><div class="order-calendar-legend-text">Ihre Auswahl</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>

                </div>
                <div class="panel-footer" id="modal-view-order-footer">
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
            @include("layouts.callback_messages")
            </div>
        </div>
    </div>

@endsection