@extends('layouts.masterNoBootstrap')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">

    <script src="{{ asset('js/callback-modal.js') }}"></script>
    <script src="{{ asset('js/admin/mail.js') }}"></script>
    <script src="{{ asset('js/jquery-1.12.4.js') }}"></script>

    <!-- include js, jquery and css for summernote-->
    <link href="{{ asset('js/bootstrap/css/bootstrap.css') }}" rel="stylesheet">
    <script src="{{ asset('js/bootstrap/js/bootstrap.js') }}"></script>
    <link href="{{ asset('/summernote/summernote.css') }}" rel="stylesheet">
    <script src="{{ asset('/summernote/summernote.js') }}"></script>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">





    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">

                @include("layouts.callback_messages")

                <div id="modal-edit-mail-modal">
                    <div class="panel-heading modal-header-warning"> <span class="glyphicon glyphicon-flash" id="thekmodal-glyphicon-flash" aria-hidden="true"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <h2 class="delete-warning-header-text">Wollen Sie die Mailvorlage wirklich ändern?</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="button-edit-mail-confirmed" class="btn btn-lg btn-warning float-left">Mailvorlage ändern</button>
                        <button type="button" class="btn btn-lg btn-default btn-modal float-right" data-dismiss="modal">Schliessen</button>
                        <input type="hidden" id="object-edit-id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">E-Mails</h1>
        <div class="panel panel-default no-border margin-top-less" id="table-content">

                <div class="row thekre-row">
                    <div class="panel-body margin-less">
                    <table class="tbl-mail">
                        <tr>
                            <td>
                                <label class="lbl-mail">Vorlage: </label>
                            </td>
                            <td>
                                <select id="mail-select" class="thekre-dropdown-mail">
                                    @foreach ($mails as $mail)
                                        <option  value="{{$mail->pk_mail}}"> {{$mail->mail_description}}</option>
                                    @endforeach
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>

                <div autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    <div id="summernote"></div>
                </div>

                <div class="form-group">
                    <button id="confirm-button-mail" class="btn btn-primary float-right">Speichern</button>
                </div>

                    <div id="edit_legend"></div>

                    <div hidden>
                        <form id="change_email_form">
                            <input id="change_email_id" name="change_email_id">
                            <input id="change_email_text" name="change_email_text">
                        </form>
                    </div>

             </div>
        </div>
    </div>



@endsection