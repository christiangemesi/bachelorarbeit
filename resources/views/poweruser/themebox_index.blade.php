@extends('layouts.master')
@section('title', 'ThekRe - poweruser')

@section('content')

    @include('layouts.nav_poweruser')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">

    <script src="{{ asset('/js/admin/themebox-form.js') }}"></script>
    <script src="{{ asset('js/admin/themebox-table.js') }}"></script>
    <script src="{{ asset('js/callback-modal.js') }}"></script>

    <link href="{{ asset('/summernote/summernote.css') }}" rel="stylesheet">
    <script src="{{ asset('/summernote/summernote.js') }}"></script>

    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">

                @include("layouts.callback_messages")

                <div id="modal-delete-themebox-warning">
                    <div class="panel-heading modal-header-warning"><span class="glyphicon glyphicon-flash"
                                                                          id="thekmodal-glyphicon-flash"
                                                                          aria-hidden="true"></span>
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
                        <button type="button" id="button-delete-themebox-confirm"
                                class="btn btn-lg btn-warning float-left">Eintrag löschen
                        </button>
                        <button type="button" class="btn btn-lg btn-default btn-modal float-right" data-dismiss="modal">
                            Schliessen
                        </button>
                        <input type="hidden" id="object-remove-id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="themebox-create-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading themebox-new-title">
                        Neue Themenkiste
                    </div>
                </div>
                <div class="model-body">
                    <form id="create-themebox-form" name="create-themebox-form" autocomplete="off">
                        <div class="panel-body">
                            <div class="row thekre-row themebox-create-form-background" id="themebox-data-box">
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-name">Themenkiste Name
                                        * </label>
                                    <input type="text" class="form-control" name="name" id="themebox-form-name"
                                           maxlength="100" placeholder="Bienen"
                                           onblur="notEmptyValidate('themebox-form-name','themebox-form-name-status','themebox-form-name-icon')"
                                           onkeyup="notEmptyValidate('themebox-form-name','themebox-form-name-status','themebox-form-name-icon')"
                                           autofocus autofocus="autofocus"/>
                                    <span id="themebox-form-name-icon"></span>
                                    <span id="themebox-form-name-status" class="errorHeader">Themenkistenname wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-signature">Signatur * </label>
                                    <input type="text" class="form-control" name="signature"
                                           id="themebox-form-signature" maxlength="100" placeholder="ZLS// 101"
                                           onblur="notEmptyValidate('themebox-form-signature','themebox-form-signature-status','themebox-form-signature-icon')"
                                           onkeyup="notEmptyValidate('themebox-form-signature','themebox-form-signature-status','themebox-form-signature-icon')"/>
                                    <span id="themebox-form-signature-icon"></span>
                                    <span id="themebox-form-signature-status" class="errorHeader">Signatur wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-schoollevel">Schulstufe
                                        * </label>
                                    <input type="text" class="form-control" name="schoollevel"
                                           id="themebox-form-schoollevel" maxlength="100" placeholder="Zyklus 1 - 2"
                                           onblur="notEmptyValidate('themebox-form-schoollevel','themebox-form-schoollevel-status','themebox-form-schoollevel-icon')"
                                           onkeyup="notEmptyValidate('themebox-form-schoollevel','themebox-form-schoollevel-status','themebox-form-schoollevel-icon')"/>
                                    <span id="themebox-form-schoollevel-icon"></span>
                                    <span id="themebox-form-schoollevel-status" class="errorHeader">Schulstufe wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-barcode">Strichcode * </label>
                                    <input type="text" class="form-control" name="barcode" id="themebox-form-barcode"
                                           maxlength="100" placeholder="EM000008012289"
                                           onblur="notEmptyValidate('themebox-form-barcode','themebox-form-barcode-status','themebox-form-barcode-icon')"
                                           onkeyup="notEmptyValidate('themebox-form-barcode','themebox-form-barcode-status','themebox-form-barcode-icon')"/>
                                    <span id="themebox-form-barcode-icon"></span>
                                    <span id="themebox-form-barcode-status" class="errorHeader">Strichcode wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-size">Grösse * </label>
                                    <input type="text" class="form-control" name="size" id="themebox-form-size"
                                           maxlength="100" placeholder="2 Boxen"
                                           onblur="notEmptyValidate('themebox-form-size','themebox-form-size-status','themebox-form-size-icon')"
                                           onkeyup="notEmptyValidate('themebox-form-size','themebox-form-size-status','themebox-form-size-icon')"/>
                                    <span id="themebox-form-size-icon"></span>
                                    <span id="themebox-form-size-status"
                                          class="errorHeader">Umfang wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-size">Gewicht (in Kg)
                                        * </label>
                                    <input type="text" class="form-control" name="weight" id="themebox-form-weight"
                                           maxlength="100" placeholder="12.2"
                                           onblur="notEmptyValidate('themebox-form-weight','themebox-form-weight-status','themebox-form-weight-icon')"
                                           onkeyup="notEmptyValidate('themebox-form-weight','themebox-form-weight-status','themebox-form-weight-icon')"/>
                                    <span id="themebox-form-weight-icon"></span>
                                    <span id="themebox-form-weight-status"
                                          class="errorHeader">Gewicht wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-category">Kategorie </label>
                                    <select class="form-control" name="category" id="themebox-form-category"
                                            onchange="notEmptyValidate('themebox-form-category', 'themebox-form-category-status', 'themebox-form-category-icon')">
                                        <option value="none" disabled selected>Bitte Kategorie auswählen</option>
                                        @foreach ($categories as $category)
                                            <option value="{{$category['pk_category']}}">{{$category['name']}}</option>
                                        @endforeach
                                    </select>
                                    <span id="themebox-form-category-icon"></span>
                                    <span id="themebox-form-category-status" class="errorHeader">Kategorie wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-content">Inhalt * </label>
                                    <textarea id="themebox-form-content" name="content"
                                              class="form-control themebox-edit-form-content" rows="5"
                                              onblur="notEmptyValidate('themebox-form-content','themebox-form-content-status','themebox-form-content-icon')"
                                              onkeyup="notEmptyValidate('themebox-form-content','themebox-form-content-status','themebox-form-content-icon')"></textarea>
                                    <span id="themebox-form-content-icon"></span>
                                    <span id="themebox-form-content-status"
                                          class="errorHeader">Inhalt wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-form-extra_text">Wichtige
                                        Info</label>
                                    <div id="summernote_create" name="extra_text"></div>
                                </div>
                                <div hidden>
                                    <input id="extra_text_create" name="extra_text_create">
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
                            <button type="button" id="create-themebox-button" class="btn btn-success float-right"
                                    data-dismiss="modal" disabled>Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="themebox-edit-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-primary">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading themebox-new-title">
                        Themenkiste Bearbeiten
                    </div>
                </div>
                <div class="model-body">
                    <form id="edit-themebox-form" autocomplete="off">
                        <input type="hidden" value="" name="themebox_id" id="themebox_id"/>
                        <div class="panel-body">
                            <div class="row thekre-row themebox-create-form-background" id="themebox-data-box">
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-name">Themenkiste Name
                                        * </label>
                                    <input type="text" class="form-control" name="name" id="themebox-edit-form-name"
                                           maxlength="100"
                                           onblur="notEmptyValidate('themebox-edit-form-name','themebox-edit-form-name-status','themebox-edit-form-name-icon')"
                                           onkeyup="notEmptyValidate('themebox-edit-form-name','themebox-edit-form-name-status','themebox-edit-form-name-icon')"
                                           autofocus="autofocus"/>
                                    <span id="themebox-edit-form-name-icon"></span>
                                    <span id="themebox-edit-form-name-status" class="errorHeader">Themenkistenname wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-signature">Signatur
                                        * </label>
                                    <input type="text" class="form-control" name="signature"
                                           id="themebox-edit-form-signature" maxlength="100"
                                           onblur="notEmptyValidate('themebox-edit-form-signature','themebox-edit-form-signature-status','themebox-edit-form-signature-icon')"
                                           onkeyup="notEmptyValidate('themebox-edit-form-signature','themebox-edit-form-signature-status','themebox-edit-form-signature-icon')"/>
                                    <span id="themebox-edit-form-signature-icon"></span>
                                    <span id="themebox-edit-form-signature-status" class="errorHeader">Signatur wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-schoollevel">Schulstufe
                                        * </label>
                                    <input type="text" class="form-control" name="schoollevel"
                                           id="themebox-edit-form-schoollevel" maxlength="100"
                                           onblur="notEmptyValidate('themebox-edit-form-schoollevel','themebox-edit-form-schoollevel-status','themebox-edit-form-schoollevel-icon')"
                                           onkeyup="notEmptyValidate('themebox-edit-form-schoollevel','themebox-edit-form-schoollevel-status','themebox-edit-form-schoollevel-icon')"/>
                                    <span id="themebox-edit-form-schoollevel-icon"></span>
                                    <span id="themebox-edit-form-schoollevel-status" class="errorHeader">Schulstufe wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-barcode">Strichcode
                                        * </label>
                                    <input type="text" class="form-control" name="barcode"
                                           id="themebox-edit-form-barcode" maxlength="100"
                                           onblur="notEmptyValidate('themebox-edit-form-barcode','themebox-edit-form-barcode-status','themebox-edit-form-barcode-icon')"
                                           onkeyup="notEmptyValidate('themebox-edit-form-barcode','themebox-edit-form-barcode-status','themebox-edit-form-barcode-icon')"/>
                                    <span id="themebox-edit-form-barcode-icon"></span>
                                    <span id="themebox-edit-form-barcode-status" class="errorHeader">Strichcode wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-size">Grösse * </label>
                                    <input type="text" class="form-control" name="size" id="themebox-edit-form-size"
                                           maxlength="100"
                                           onblur="notEmptyValidate('themebox-edit-form-size','themebox-edit-form-size-status','themebox-edit-form-size-icon')"
                                           onkeyup="notEmptyValidate('themebox-edit-form-size','themebox-edit-form-size-status','themebox-edit-form-size-icon')"/>
                                    <span id="themebox-edit-form-size-icon"></span>
                                    <span id="themebox-edit-form-size-status"
                                          class="errorHeader">Umfang wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-weight">Gewicht (in Kg)
                                        * </label>
                                    <input type="text" class="form-control" name="weight" id="themebox-edit-form-weight"
                                           maxlength="100"
                                           onblur="notEmptyValidate('themebox-edit-form-weight','themebox-edit-form-weight-status','themebox-edit-form-weight-icon')"
                                           onkeyup="notEmptyValidate('themebox-edit-form-weight','themebox-edit-form-weight-status','themebox-edit-form-weight-icon')"/>
                                    <span id="themebox-edit-form-weight-icon"></span>
                                    <span id="themebox-edit-form-weight-status" class="errorHeader">Gewicht wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label"
                                           for="themebox-edit-form-category">Kategorie </label>
                                    <select class="form-control" name="category" id="themebox-edit-form-category"
                                            onblur="notEmptyValidate('themebox-edit-form-category', 'themebox-edit-form-category-status', 'themebox-edit-form-category-icon')"
                                            onkeyup="notEmptyValidate('themebox-edit-form-category', 'themebox-edit-form-category-status', 'themebox-edit-form-category-icon')">
                                        <option value="none" disabled selected>Bitte Kategorie auswählen</option>
                                        @foreach ($categories as $category)
                                            <option value="{{$category['pk_category']}}">{{$category['name']}}</option>
                                        @endforeach
                                    </select>
                                    <span id="themebox-edit-form-category-icon"></span>
                                    <span id="themebox-edit-form-category-status" class="errorHeader">Kategorie wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-content">Inhalt
                                        * </label>
                                    <textarea class="form-control themebox-edit-form-content" name="content"
                                              id="themebox-edit-form-content" class="form-control" rows="5"
                                              onblur="notEmptyValidate('themebox-edit-form-content','themebox-edit-form-content-status','themebox-edit-form-content-icon')"
                                              onkeyup="notEmptyValidate('themebox-edit-form-content','themebox-edit-form-content-status','themebox-edit-form-content-icon')"></textarea>
                                    <span id="themebox-edit-form-content-icon"></span>
                                    <span id="themebox-edit-form-content-status" class="errorHeader">Inhalt wird benötigt!</span>
                                </div>
                                <div class="form-group has-feedback">
                                    <label class="themebox-form-label" for="themebox-edit-form-extra_text">Wichtige
                                        Info</label>
                                    <div id="summernote_edit" name="extra_text"></div>
                                </div>
                                <div hidden>
                                    <input id="extra_text_edit" name="extra_text_edit">
                                </div>
                                <div class="form-group">
                                    <div class="float-left">
                                        <label class="font-weight-bold">
                                            <input type="checkbox" value="0" name="complete"
                                                   id="themebox-edit-form-complete">
                                            Vollständig
                                        </label>
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
                            <button type="button" id="button-save-themebox-change" class="btn btn-primary float-right"
                                    data-dismiss="modal">Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Themenkisten</h1>
        <div class="row" style="display: none;">
            <button type="button" class="btn btn-success btn-create-themebox" id="button-create-themebox"><span class="glyphicon glyphicon-plus"></span> Themenkiste erstellen</button>
        </div>
        <div class="panel panel-default no-border" id="table-content">
            <table id="new-themebox-table" class="data-table table table-bordered" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th class="themebox-name-column-width">Themenkiste</th>
                    <th>Signatur</th>
                    <th>Schulstufe</th>
                    <th>Strichcode</th>
                    <th>Grösse</th>
                    <th>Gewicht</th>
                    <th>Kategorie</th>
                    <th>Vollständig</th>
                    <th class="edit-column-width" style="display: none;"></th>
                </tr>
                </thead>
                <tbody>
                @foreach ($themeboxes as $themebox)
                    <tr>
                        <td>
                            {{$themebox["title"]}}
                        </td>
                        <td>
                            {{$themebox["signatur"]}}
                        </td>
                        <td>
                            {{$themebox["schoollevel"]}}
                        </td>
                        <td>
                            {{$themebox["barcode"]}}
                        </td>
                        <td>
                            {{$themebox["size"]}}
                        </td>
                        <td>
                            {{$themebox["weight"]}} kg
                        </td>
                        <td>
                            @foreach ($categories as $category)
                                @if ($category["pk_category"] == $themebox["fk_category"])
                                    {{$category["name"]}}
                                @endif
                            @endforeach
                        </td>
                        <td>
                            @if ($themebox["complete"])
                                Ja
                            @else
                                Nein
                            @endif
                        </td>
                        <td style="display: none;">
                            <button type="button" class="button-update btn btn-primary button-edit-themebox" aria-label="edit"  value="{{$themebox["pk_themebox"]}}" data-toggle="tooltip" data-placement="top" title="Themenkiste bearbeiten">
                                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            </button>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
