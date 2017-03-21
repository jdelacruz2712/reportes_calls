<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="{{ asset('images/cosapi.ico') }}"  rel="shortcut icon">
    <title>Reportes | @yield('title')</title>
    <!-- para que la web sea responsive -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <!--llamar a la hoja de estilo (css)-->
    {!!Html::style('extras/toastr/toastr.min.css')!!}

    <!-- Bootstrap 3.3.5 -->
    {!!Html::style('bootstrap/css/bootstrap.min.css')!!}
    {!!Html::style('extras/bootstrap3-dialog/css/bootstrap-dialog.min.css')!!}
    <!-- para los iconos Font Awesome -->
    {!!Html::style('plugins/adminLTE/css/font-awesome.css')!!}
    <!-- para el css de Adminlte -->
    {!!Html::style('plugins/adminLTE/css/AdminLTE.min.css')!!}
    <!-- para cambiar el color del panel de adminlte -->
    {!!Html::style('plugins/adminLTE/css/skins/_all-skins.min.css')!!}
    <!-- estilos para la imagen de cargando -->
    {!!Html::style('cosapi/css/preloader.css')!!}
     <!--para incluir otros css-->
     @yield('css')
  </head>

  <body class="hold-transition {{getenv('REPORT_THEME')}} sidebar-mini ">
    <input type="hidden" value="{{ $password}}" id="type_password">
    <input type="hidden" value="{{ Session::get('UserId')}}" id="user_id">
    <input type="hidden" value="{{$_SERVER['REMOTE_ADDR']}}" id="ip">
    <font id="present_hour"><input type="hidden" value="" id="hour"></font>
    <font id="present_date"><input type="hidden" value="{{ date('Y-m-d')}}" id="date"></font>

    <!--para que se muestre la pagina en donde estas -->
    <?php
      /*$crumbs = explode("/",$_SERVER["REQUEST_URI"]);
      foreach($crumbs as $crumb){
          echo $d=ucfirst(str_replace(array(".html","_"),array(""," "),$crumb) . ' ');
      }*/
    ?>
    <div class="wrapper">
      <!--<clase header="para el header principal">-->
      @include('layout.recursos.header')
      <!-- para la columna de la izquierda -->
      @include('layout.recursos.left_colum')

      <!-- Content Wrapper -->
      <div class="content-wrapper">
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

    <!--Todos los javascript del layout principal-->
    <!-- jQuery -->
    {!!Html::script('plugins/jQuery/jQuery-2.1.4.min.js')!!}
    {!!Html::script('extras/toastr/toastr.min.js')!!}
    {!!Html::script('plugins/jQueryUI/jquery-ui.js')!!}
    {!!Html::script('bootstrap/js/bootstrap.min.js')!!}
    {!!Html::script('extras/bootstrap3-dialog/js/bootstrap-dialog.min.js')!!}
    {!!Html::script('plugins/adminLTE/js/app.min.js')!!}
    {!!Html::script('plugins/adminLTE/js/funcionalidades.js')!!}
    {!!Html::script('cosapi/js/cosapi_adminlte.js?version='.date('YmdHms'))!!}
    {!!Html::script('cosapi/js/datatables.js')!!}
    {!!Html::script('cosapi/js/vue.js')!!}
    {!!Html::script('cosapi/js/sails.io.js', array('autoConnect' => 'false'))!!}
    {!!Html::script('cosapi/js/adminlte_vue.js?version='.date('YmdHms'))!!}
    {!!Html::script('cosapi/js/socket.io.js')!!}

    @include('layout.recursos.fecha_hora')

    @yield('scripts')
  </body>
</html>
