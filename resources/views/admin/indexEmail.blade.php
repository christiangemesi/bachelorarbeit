@extends('layouts.master')
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
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script>
    <script src="{{ asset('js/bootstrap/js/bootstrap.js') }}"></script>
    <link href="{{ asset('/summernote/summernote.css') }}" rel="stylesheet">
    <script src="{{ asset('/summernote/summernote.js') }}"></script>



    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">E-Mails</h1>
        <div class="panel panel-default no-border  margin-top-less" id="table-content">

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

                <div id="summernote"></div>

                <div class="form-group">
                    <button id="confirm-button-mail" class="btn btn-primary float-right">Speichern</button>
                </div>

             </div>
        </div>
    </div>



@endsection