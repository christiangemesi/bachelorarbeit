@extends('layouts.master')
@section('title', 'ThekRe')

@section('content')


    <script src="{{ asset('js/user/themebox-data.js') }}"></script>
    <script src="{{ asset('js/calendar/moment.min.js') }}"></script>
    <script src="{{ asset('js/user/order-form.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/calendar/fullcalendar.css') }}">
    <script src="{{ asset('js/calendar/fullcalendar.js') }}"></script>
    <script src="{{ asset('js/calendar/de-ch.js') }}"></script>
    <script src="{{ asset('js/calendar/add-first-block.js') }}"></script>


    @include('layouts.nav_user')

    <div class="alert alert-danger display-none" id="error-message-box"></div>

    <div id="page-content-wrapper">
        <div class="col-md-12 main-Panel">
            <div class="row">
                <div class="col-md-12">
                    <h1>Bestellformular</h1>

                    <div class="progress">
                        <div id="order-progress-bar" class="progress-bar thekre-progress" role="progressbar" aria-valuenow="40"
                             aria-valuemin="0" aria-valuemax="100" style="width:33%">
                            <span id="order-progress-bar-value">Schritt 1 von 3</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div id="themebox-order-carousel" class="carousel slide col-md-12" data-interval="false" data-ride="carousel">
                    <form id="orderform" name="orderform" action="{{url('user/createOrder')}}" method="post" autocomplete="off">

                        <!-- Wrapper for slides -->
                        <div class="carousel-inner">
                            <div class="item active">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="input-group col-md-12">
                                            <input type="text" class="form-control" id="themebox-list-search" placeholder="Suche nach Themenkiste..">
                                        </div>
                                        <div class="list-group thekre-list">
                                            <ul id="themebox-list-ul">
                                                @foreach ($themeboxes as $themebox)
                                                    <li>
                                                    <a href="#" class="list-group-item list-group-item-action themebox-list" id={{ $themebox->pk_themebox }}>{{ $themebox->title }}</a>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </div>

                                    </div>

                                    <div class="col-md-8">
                                        <div class="panel panel-default thekre-panel">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h2 id="themebox-order-info-title"></h2>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label class="label-chose-order-period">Beschreibung</label>
                                                    <div class="detail-container">
                                                        <input type="hidden" id="themebox-id"/>
                                                        <table id="themebox-infobox">

                                                        </table>
                                                    </div>

                                                    <div class="form-group" id="themebox-infobox-select-date-container">
                                                        <label class="label-chose-order-period">gewünschte Ausleihperiode</label>
                                                        <table id="themebox-infobox-select-date">
                                                            <tr>
                                                                <td>Von:</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control cursor-pointer" id="start-date" name="startdate">
                                                                        <span class="input-group-addon cursor-pointer" id="order-from-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Bis: </td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control cursor-pointer" id="end-date" name="enddate" disabled="disabled">
                                                                        <span class="input-group-addon cursor-pointer" id="order-to-glyphicon"><i class="glyphicon glyphicon-calendar"></i></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>

                                                        <p class="text-max-order-date-info">
                                                            <i>Ausleihdauer max. 6 Wochen</i>
                                                        </p>

                                                        <div class="alert alert-danger display-none" id="error-calendar-message-box"></div>
                                                        <div class="alert alert-info display-none" id="info-calendar-message-box"></div>
                                                    </div>

                                                </div>

                                                <div class="col-md-8">
                                                    <div id='calendar'>
                                                        <!-- calendar with the orders data -->
                                                    </div>

                                                    <hr>
                                                    <div id="order-calendar-legend">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div id="order-calendar-legend-free"> <div class="order-calendar-legend-text">Verfügbar</div></div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div id="order-calendar-legend-block"><div class="order-calendar-legend-text">Blockiert</div></div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <div id="order-calendar-legend-new"><div class="order-calendar-legend-text">Ihre Auswahl</div></div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="item overflow-order-box">
                                <div class="row thekre-row">
                                    <div class="col-md-12" id="personal-data-box">
                                        <h2 class="order-form-title">Persönliche Angaben</h2>
                                        <div class="form-group has-feedback">
                                            <label for="firstNameInput">Vorname * </label>
                                            <input type="text" class="form-control" name="surname" id="firstNameInput" maxlength="40" placeholder="Max" onblur="firstNameValidate()" />
                                            <span id="firstNameIcon"></span>
                                            <span id="firstNameInputStatus" class="errorHeader">Vorname wird benötigt!</span>
                                        </div>

                                        <div class="form-group has-feedback">
                                            <label for="lastNameInput">Nachname * </label>
                                            <input type="text" class="form-control" name="name" id="lastNameInput" maxlength="40" placeholder="Muster" onblur="lastNameValidate()"/>
                                            <span id="lastNameIcon" aria-hidden="true"></span>
                                            <span id="lastNameInputStatus" class="errorHeader">Nachname wird benötigt!</span>
                                        </div>

                                        <div class="form-group has-feedback">
                                            <label for="emailInput">Email Adresse *</label>
                                            <input type="email" class="form-control" name="email" id="emailInput" maxlength="60" placeholder="max.muster@fhnw.ch" onblur="emailValidate()"/>
                                            <span id="emailIcon" aria-hidden="true"></span>
                                            <span id="emailInputStatus" class="errorHeader">email wird benötigt!</span>
                                        </div>

                                        <div class="form-group has-feedback">
                                            <label class="form-control-label" for="phone">Tel.-Nr. *</label>
                                            <input name="phone" type="text" class="form-control" id="phone" maxlength="40" placeholder="0629231323" onblur="phoneValidate()"/>
                                            <span id="phoneIcon" aria-hidden="true"></span>
                                            <span id="phoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                        </div>
                                        <div class="form-group has-feedback">
                                            <label class="form-control-label" for="nebisusernumber">Nebisnummer *</label>
                                            <input name="nebisusernumber" type="text" class="form-control" id="nebisusernumber" maxlength="40" placeholder="S98134827348" onblur="nebisValidate()" />
                                            <span id="nebisIcon" aria-hidden="true"></span>
                                            <span id="nebisInputStatus" class="errorHeader">Nebisnummer wird benötigt!</span>
                                        </div>
                                        <label class="required">* Pflichtfeld</label>
                                    </div>
                                </div>
                            </div>

                            <div class="item overflow-order-box">
                                <div class="row thekre-row">
                                    <div class="col-md-12">
                                        <h2 class="order-form-title">Angaben zur Themenkiste</h2>

                                        <label class="form-control-label" for="thekre-dropdown">Lieferart</label>
                                        <select name="delivery" id="thekre-dropdown" class="selectpicker form-dropdown">

                                            @foreach ($deliveries as $delivery)
                                                <option  value={{ $delivery->pk_delivery }}>{{ $delivery->type }}</option>
                                            @endforeach

                                        </select>
                                        <div id="delivery-data-box">
                                            <p id="user-delivery-info"><span class="glyphicon glyphicon-info-sign"></span>  Die Themenkiste kann an der Infotheke der FHNW Bibliothek Brugg-Windisch abgeholt werden.</p>
                                            <div id="school-Address">
                                                <p id="user-delivery-info"><span class="glyphicon glyphicon-info-sign"></span>  Die Lieferung an Aargauer Schulen ist kostenpflichtig und es muss zusätzlich telefonisch mit der <a href=https://www.fhnw.ch/de/die-fhnw/bibliotheken/bibliothek-brugg-windisch> Infotheke der FHNW Bibliothek Brugg-Windisch </a> Kontakt aufgenommen werden.</p>
                                                <div class="form-group has-feedback">
                                                    <label class="form-control-label" for="schoolNameInput">Name der Schule *</label>
                                                    <input type="text" class="form-control" name="schoolname" id="schoolNameInput" maxlength="60" placeholder="Sekundarschule Lenzburg" onblur="schoolnameValidate()"/>
                                                    <span id="schoolNameIcon" aria-hidden="true"></span>
                                                    <span id="schoolNameInputStatus" class="errorHeader">Name der Schule wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="form-control-label" for="schoolstreetInput">Strasse und Nr *</label>
                                                    <input type="text" class="form-control" name="schoolstreet" id="schoolstreetInput"  maxlength="60" placeholder="Mühlegasse 2" onblur="schoolstreetValidate()"/>
                                                    <span id="schoolstreetIcon" aria-hidden="true"></span>
                                                    <span id="schoolstreetInputStatus" class="errorHeader">Strasse und Nr wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="form-control-label" for="schoolcityInput">PLZ und Ort *</label>
                                                    <input type="text" class="form-control" name="schoolcity" id="schoolcityInput"  maxlength="60" placeholder="2438 Lenzburg" onblur="schoolcityValidate()"/>
                                                    <span id="schoolcityIcon" aria-hidden="true"></span>
                                                    <span id="schoolcityInputStatus" class="errorHeader">PLZ und Ort wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="form-control-label" for="placeofhandoverInput">Abgabeort an der Schule *</label>
                                                    <input type="text" class="form-control" name="placeofhandover" id="placeofhandoverInput" maxlength="60" placeholder="Sekretariat" onblur="placeofhandoverValidate()"/>
                                                    <span id="placeofhandoverIcon" aria-hidden="true"></span>
                                                    <span id="placeofhandoverInputStatus" class="errorHeader">Abgabeort wird benötigt!</span>
                                                </div>
                                                <div class="form-group has-feedback">
                                                    <label class="form-control-label" for="schoolphoneInput">Tel.-Nr. der Schule *</label>
                                                    <input type="text" class="form-control" name="schoolphonenumber" id="schoolphoneInput" maxlength="40" placeholder="0629231323" onblur="schoolphoneValidate()"/>
                                                    <span id="schoolphoneIcon" aria-hidden="true"></span>
                                                    <span id="schoolphoneInputStatus" class="errorHeader">Telefonnummer wird benötigt!</span>
                                                </div>
                                                <label class="required">* Pflichtfeld</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--[ footer ] -->
                        <div id="footer">
                            <div class="footer-block">
                                <div class="row">
                                    <div class="col-md-6">
                                        <!-- Left and right controls -->
                                        <a class="align-left" href="#themebox-order-carousel" data-slide="prev">
                                            <button type="button" class="btn btn-default btn-lg thekre-button-left" id="carousel-left">
                                                Zurück
                                            </button>
                                        </a>
                                    </div>
                                    <div class="col-md-6">
                                        <a class="align-right" href="#themebox-order-carousel" data-slide="next">
                                            <button type="button" class="btn btn-success btn-lg thekre-button-right" id="carousel-right">
                                                Weiter
                                            </button>
                                        </a>
                                        <a class="align-right">
                                            <button type="submit" class="btn btn-success btn-lg thekre-button-right" id="carousel-reserve-button" onclick="confirm('Die Lieferung an Aargauer Schulen ist kostenpflichtig und es muss zusätzlich telefonisch mit der Infotheke der FHNW Bibliothek Brugg-Windisch Kontakt aufgenommen werden.')">
                                                Bestellen
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="themebox-content-modal">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div id="modal-content-info">
                        <div class="panel-heading modal-header-info">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h1 id="modal-content-info-header">Inhalt</h1>
                        </div>
                        <div class="modal-body">
                            <div class="panel-body">
                                <div class="form-group">
                                    <textarea id="themebox-content-modal-box" class="form-control" rows="20" disabled="true"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-lg btn-default btn-modal float-right" data-dismiss="modal">Schliessen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade"id="modal-create-order-progress" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%;">
            <div class="modal-dialog modal-m">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Ihre Bestellung wird bearbeitet.</h3>
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
    </div>
@endsection
