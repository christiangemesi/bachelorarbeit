@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">

    <script src="{{ asset('/js/admin/category-form.js') }}"></script>
    <script src="{{ asset('js/admin/category-table.js') }}"></script>
    <script src="{{ asset('js/callback-modal.js') }}"></script>

    <link href="{{ asset('/summernote/summernote.css') }}" rel="stylesheet">
    <script src="{{ asset('/summernote/summernote.js') }}"></script>

    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">

                @include("layouts.callback_messages")

                <div id="modal-delete-category-warning">
                    <div class="panel-heading modal-header-warning"><span class="glyphicon glyphicon-flash"
                                                                          id="thekmodal-glyphicon-flash"
                                                                          aria-hidden="true"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <h2 class="delete-warning-header-text">Wollen Sie die Kategorie wirklich löschen?</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="button-delete-category-confirm"
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

    <div class="modal fade" id="category-create-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading category-new-title">
                        Neue Kategorie
                    </div>
                </div>
                <div class="model-body">
                    <form id="create-category-form" name="create-category-form" autocomplete="off" onsubmit="return false;">
                    <div class="panel-body">
                            <div class="row thekre-row category-create-form-background" id="category-data-box">
                                <div class="form-group has-feedback">
                                    <label class="category-form-label" for="category-form-name">Kategorie Name
                                        * </label>
                                    <input type="text" class="form-control" name="name" id="category-form-name"
                                           maxlength="100" placeholder="Bienen"
                                           onblur="nonEmptyCategoryValidate('category-form-name','category-form-name-status','category-form-name-icon')"
                                           onkeyup="nonEmptyCategoryValidate('category-form-name','category-form-name-status','category-form-name-icon')"
                                           autofocus autofocus="autofocus"/>
                                    <span id="category-form-name-icon"></span>
                                    <span id="category-form-name-status" class="errorHeader">Kategorienname wird benötigt!</span>
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
                            <button type="button" id="create-category-button" class="btn btn-success float-right"
                                    data-dismiss="modal" disabled>Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="category-edit-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-primary">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading category-new-title">
                        Kategorie bearbeiten
                    </div>
                </div>
                <div class="model-body">
                    <form id="edit-category-form" autocomplete="off" onsubmit="return false;">
                        <input type="hidden" value="" name="category_id" id="category_id"/>
                        <div class="panel-body">
                            <div class="row thekre-row category-create-form-background" id="category-data-box">
                                <div class="form-group has-feedback">
                                    <label class="category-form-label" for="category-edit-form-name">Kategorie Name
                                        * </label>
                                    <input type="text" class="form-control" name="name" id="category-edit-form-name"
                                           maxlength="100"
                                           onblur="checkCategoryForm('category-edit-form-name','category-edit-form-name-status','category-edit-form-name-icon')"
                                           onkeyup="checkCategoryForm('category-edit-form-name','category-edit-form-name-status','category-edit-form-name-icon')"
                                           autofocus="autofocus"/>
                                    <span id="category-edit-form-name-icon"></span>
                                    <span id="category-edit-form-name-status" class="errorHeader">Kategoriename wird benötigt!</span>
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
                            <button type="button" id="button-save-category-change" class="btn btn-primary float-right"
                                    data-dismiss="modal">Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Kategorien</h1>
        <div class="row">
            <button type="button" class="btn btn-success btn-create-cateogry" id="button-create-category"><span
                        class="glyphicon glyphicon-plus"></span> Kategorie erstellen
            </button>
        </div>

        <div class="thekre-row" id="new-order-table">
            <!-- Search for the Table -->
        </div>

        <div class="panel panel-default no-border" id="table-content">
            <table id="new-category-table" class="data-table table table-bordered" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th class="category-name-column-width">Kategorie</th>
                    <th>Themenboxen</th>
                    <th class="edit-column-width"></th>
                </tr>
                </thead>
                <tbody>
                @foreach ($categories as $category)
                    <tr>
                        <td>
                            {{$category["name"]}}
                        </td>
                        <td>
                            @foreach ($themeboxes as $themebox)
                                @if ($themebox["fk_category"] == $category["pk_category"])
                                    {{$themebox["title"]}},
                                @endif
                            @endforeach
                        </td>
                        <td>
                            <button type="button" class="button-update btn btn-primary button-edit-category"
                                    aria-label="edit" value="{{$category["pk_category"]}}" data-toggle="tooltip"
                                    data-placement="top" title="Kategorie bearbeiten">
                                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="button-delete-category btn btn-danger"
                                    value="{{$category["pk_category"]}}" aria-label="delete" data-toggle="tooltip"
                                    data-placement="top" title="Kategorie löschen">
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
