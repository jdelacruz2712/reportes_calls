<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    @include('layout.recursos.icon_title')
    <title>@yield('title')</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    {!!Html::style('css/cosapi_dashboard.min.css')!!}
     @yield('css')
  </head>
  <body>
    <div id="dashboard">
      @yield('content')
      @include('layout.recursos.modals.modal_reconnect')
    </div>
    {!!Html::script('js/cosapi_dashboard.min.js?version='.date('YmdHis'))!!}
    @yield('scripts')
  </body>
</html>
