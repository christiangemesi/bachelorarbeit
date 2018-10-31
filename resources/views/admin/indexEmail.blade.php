@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/dataTables.bootstrap.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">

    <script src="{{ asset('js/callback-modal.js') }}"></script>





    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">E-Mails</h1>
        <div class="panel panel-default no-border  margin-top-less" id="table-content">

        </div>
    </div>


@endsection