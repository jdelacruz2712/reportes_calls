<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{ asset('cosapi/img/cosapi.ico') }}"  rel="shortcut icon">
    <title>@yield('title')</title>
    <!-- Latest compiled and minified CSS -->
    {!!Html::style('vendor/bootstrap/css/bootstrap.min.css')!!}
    {!!Html::style('cosapi/css/login.css')!!}
    {!!Html::style('cosapi/css/typeaheadjs.css')!!}

</head>
<body>

@yield('content')

<!-- Scripts -->
{!!Html::script('vendor/jquery/jquery.js')!!}
{!!Html::script('vendor/bootstrap/js/bootstrap.min.js')!!}
{!!Html::script('extras/bootstrap-typeahead/js/bootstrap-typeahead.js')!!}

</body>
</html>
