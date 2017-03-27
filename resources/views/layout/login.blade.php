<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{ asset('img/cosapi.ico') }}"  rel="shortcut icon">
    <title>@yield('title')</title>
    {!!Html::style('css/cosapidata_login.min.css')!!}
</head>
<body>
  @yield('content')
  {!!Html::script('js/cosapidata_login.min.js')!!}
</body>
</html>
