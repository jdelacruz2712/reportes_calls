<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="{{ asset('img/cosapi.ico') }}"  rel="shortcut icon">
    <title>Reportes | @yield('title')</title>
    <!-- para que la web sea responsive -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    {!!Html::style('css/cosapi_adminlte.min.css')!!}
    @yield('css')
  </head>

  <body class="hold-transition {{getenv('REPORT_THEME')}} sidebar-mini ">
    <input type="hidden" value="{{ $password}}" id="type_password">
    <input type="hidden" value="{{ Session::get('UserId')}}" id="user_id">
    <input type="hidden" value="{{$_SERVER['REMOTE_ADDR']}}" id="ip">
    <font id="present_hour"><input type="hidden" value="" id="hour"></font>
    <font id="present_date"><input type="hidden" value="{{ date('Y-m-d')}}" id="date"></font>
    <div class="wrapper">
      <!--<clase header="para el header principal">-->
      @include('layout.recursos.header')
      <!-- para la columna de la izquierda -->
      @include('layout.recursos.left_colum')

      <!-- Content Wrapper -->
      <div class="content-wrapper">
        @include('layout.recursos.flash_message')
          <!-- mensaje de perdida de desconexion con servidor NodeJS -->
          @include('layout.recursos.disconnect_nodejs')
          <!-- Content Header (Page header) -->
          <section class="content-header">
            <h1>
              Dashboard
              <small>Panel de Control</small>
            </h1>
            <ol class="breadcrumb">
              <li><a href="/"><i class="fa fa-dashboard"></i>Inicio</a></li>
              <li class="active" id='urlsistema'></li>
            </ol>
          </section>

          <!-- inicio contenido dinamico-->
          <section class="content">
            <div class="alert alert-info alert-dismissible">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
              <h4>
                <h4>Recepción de LLamadas!!!</h4>
              </h4>
              <p>
                No te olvides que para poder recibir y realizar llamadas, debes dar click en el estado <b>ACD</b> luego de haberte logueado.
              </p>
            </div>


            @yield('content')
          </section><!-- fin contenido dinamico -->

      </div><!-- /.content-wrapper -->

      <!--<para el footer>-->
        @include('layout.recursos.footer')
      <!-- Control Sidebar -->
     <!-- <para la columna de la derecha">-->
        @include('layout.recursos.right_colum')

      <div class="control-sidebar-bg"></div>
    </div><!-- ./wrapper -->
    {!!Html::script('js/cosapi_adminlte.min.js')!!}
    {!!Html::script('js/cosapi_realtime.min.js')!!}
    @include('layout.recursos.fecha_hora')
    @yield('scripts')
  </body>
</html>
