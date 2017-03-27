<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="{{ asset('images/cosapi.ico') }}"  rel="shortcut icon">
    <title>Monitor Resumen | @yield('title')</title>
    <!-- para que la web sea responsive -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <!-- Bootstrap 3.3.5 -->
    {!!Html::style('vendor/bootstrap/css/bootstrap.min.css')!!}
    <!-- para los iconos Font Awesome -->
    {!!Html::style('plugins/adminLTE/css/font-awesome.css')!!}
    <!-- para el css de Adminlte -->
    {!!Html::style('plugins/adminLTE/css/AdminLTE.min.css')!!}
    {!!Html::style('cosapi/css/preloader.css')!!}
     <!--para incluir otros css-->
     @yield('css')

  </head>

  <body >

     @yield('content')

    <!--Todos los javascript del layout principal-->
    <!-- jQuery -->
    {!!Html::script('vendor/jquery/jquery.min.js')!!}
    {!!Html::script('vendor/bootstrap/js/bootstrap.min.js')!!}
    {!!Html::script('cosapi/js/cosapi_adminlte.js')!!}
    {!!Html::script('cosapi/js/socket.io.min.js')!!}
    {!!Html::script('cosapi/js/vue.js')!!}

    <!--para incluir todos los demas script que se necesite-->
    @yield('scripts')
  </body>
</html>
