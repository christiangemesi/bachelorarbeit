<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <!-- Jquery -->
    <link rel="stylesheet" href="{{ asset('css/jquery-ui.css') }}">
    <script src="{{ asset('js/jquery-1.12.4.js') }}"></script>
    <script src="{{ asset('js/jquery-ui.js') }}"></script>

    <!-- Bootstrap  -->
    <link href={{ asset("css/bootstrap.css") }} rel="stylesheet"/>
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <script src="{{ asset('/js/bootstrap.js') }}"></script>

    <!-- own css -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    <!-- external css -->
    <link rel="stylesheet" href="{{ asset('css/simple-sidebar.css') }}">

    <title>@yield('title')</title>
</head>

<body>
<div id="wrapper" class="toggled">
    <div class="container-fluid">
        @yield('content')
    </div>
</div>
</body>
</html>