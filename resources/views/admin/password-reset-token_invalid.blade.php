@extends('layouts.master')
@section('title', 'ThekRe - Admin')

@section('content')
    <div class="col-md-12 admin-panel">
        <input type="text" name="token" hidden value="{{$token}}">
        <h1 class="admin-header">Token expired or Invalid</h1>
        <a href="{{ url('/')  }}"> Return to Homepge</a>
    </div>
@endsection