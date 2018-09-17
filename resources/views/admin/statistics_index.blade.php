@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')

    @include('layouts.nav_admin')

    <script src="{{ asset('/js/admin/statistics-load.js') }}"></script>

    <div class="alert alert-danger" id="error-message-box"></div>

    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Statistiken</h1>

            <div class="panel panel-default">
                <div class="row">
                   <table class="tbl-statistics-year">
                       <tr>
                            <td>
                                <label class="lbl-statistics-year">Statistik für das Jahr: </label>
                            </td>
                            <td>
                               <select id="statistics-year-select" class="thekre-dropdown-statics-year">
                                   @foreach ($dates as $date)
                                        <option  value="{{$date}}"> {{$date}}</option>
                                   @endforeach
                               </select>
                            </td>
                       </tr>
                   </table>
                </div>
                <div class="spacer"></div>
                <div class="row">
                    <div class="col-md-12" id="statistics-background">
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
