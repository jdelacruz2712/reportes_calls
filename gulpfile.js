var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
elixir.config.sourcemaps = false;

elixir(function(mix) {
    /**
    Generando el archivo cosapidata_login.min.css para el Layout Login
    */
    mix
    .styles([
        'vendor/fortawesome/css/font-awesome.min.css',
        'vendor/bootstrap/css/bootstrap.min.css',
        'cosapi/css/login.css'
    ],'public/css/cosapidata_login.min.css','resources/assets/')

    /**
    Generando el archivo cosapi_adminlte.min.css para el Layout AdminLTE
    */
    .styles([
        'vendor/fortawesome/css/font-awesome.min.css',
        'vendor/bootstrap/css/bootstrap.min.css',
        'extras/toastr/toastr.min.css',
        'extras/bootstrap3-dialog/css/bootstrap-dialog.min.css',
        'plugins/adminLTE/css/AdminLTE.min.css',
        'plugins/adminLTE/css/skins/_all-skins.min.css',
        'cosapi/css/preloader.css',
        'cosapi/css/adminlte.css'
    ],'public/css/cosapi_adminlte.min.css','resources/assets/')

    /**
    Generando el archivo cosapi_dashboard.min.css para el Layout AdminLTE
    */
    .styles([
        'vendor/fortawesome/css/font-awesome.min.css',
        'vendor/bootstrap/css/bootstrap.min.css',
        'extras/toastr/toastr.min.css',
        'plugins/adminLTE/css/AdminLTE.min.css',
        'cosapi/css/preloader.css'
    ],'public/css/cosapi_dashboard.min.css','resources/assets/');
});

elixir(function(mix) {
  /**
  Generando el archivo cosapidata_login.min.js para el Layout Login
  */
  mix
  .scripts([
      'vendor/jquery/jquery.min.js',
      'vendor/bootstrap/js/bootstrap.min.js',
      'extras/bootstrap-typeahead/js/bootstrap-typeahead.min.js',
      'extras/jquery-backstretch/jquery.backstretch.min.js'
  ],'public/js/cosapidata_login.min.js','resources/assets/')

  /**
  Generando el archivo cosapi_adminlte.min.js para el Layout adminLTE
  */
  .scripts([
      'cosapi/js/env.js',
      'vendor/jquery/jquery.min.js',
      'plugins/jQueryUI/jquery-ui.min.js',
      'vendor/bootstrap/js/bootstrap.min.js',
      'extras/bootstrap3-dialog/js/bootstrap-dialog.js',
      'extras/toastr/toastr.js',
      'plugins/adminLTE/js/app.min.js',
      'plugins/adminLTE/js/funcionalidades.js',
      'node_modules/vue/vue.js',
      'node_modules/vue-resource/vue-resource.min.js',
      'node_modules/vue-select/vue-select.js',
      'node_modules/socket.io-client/socket.io.min.js',
      'node_modules/sails.io/sails.io.js'
  ],'public/js/cosapi_adminlte.min.js','resources/assets/')

  /**
  Generando el archivo cosapi_realtime.min.js para mostrar data realtime en panel
  */
  .scripts([
      'cosapi/js/helper.js',
      'cosapi/js/frontVue.js'
  ],'public/js/cosapi.min.js','resources/assets/')

  .scripts([
      'cosapi/js/profileuserVue.js'
  ],'public/js/profileuserVue.min.js','resources/assets/')

  /**
  Generando el archivo cosapi_dashboard.min.js para mostrar data realtime en panel
  */
  .scripts([
    'cosapi/js/env.js',
    'vendor/jquery/jquery.min.js',
    'vendor/bootstrap/js/bootstrap.min.js',
    'extras/toastr/toastr.js',
    'cosapi/js/helper.js',
    'node_modules/vue/vue.js',
    'node_modules/vue-resource/vue-resource.min.js',
    'node_modules/vue-select/vue-select.js',
    'node_modules/socket.io-client/socket.io.min.js'
  ],'public/js/cosapi_dashboard.min.js','resources/assets/')
  .scripts([
    'cosapi/js/dashboard_vue.js'
  ],'public/js/dashboard_vue.min.js','resources/assets/');

  /** Versionando archivos css y js
  mix.version([
    'public/js/cosapidata_login.min.js',
    'public/css/cosapidata_login.min.css',
    'public/css/cosapi_adminlte.min.css'
  ]);
  */
});

/**
 Generando un solo archivo css y js para la funcionalidad de daterangepicker
*/
elixir(function(mix) {
  mix
  .styles([
      'plugins/daterangepicker/css/daterangepicker.css'
  ],'public/css/daterangepicker.min.css','resources/assets/')
  .scripts([
      'plugins/daterangepicker/js/moment.min.js',
      'plugins/daterangepicker/js/daterangepicker.js'
  ],'public/js/daterangepicker.min.js','resources/assets/');
});


/**
 Generando un solo archivo css y js para la funcionalidad de datatables
*/
elixir(function(mix) {
  mix
  .styles([
      'plugins/datatables/Buttons-1.2.1/css/buttons.bootstrap.min.css',
      'plugins/datatables/DataTables-1.10.12/css/dataTables.bootstrap.min.css',
      'plugins/datatables/Responsive-2.1.0/css/responsive.bootstrap.min.css',
      'plugins/datatables/Select-1.2.0/css/select.bootstrap.min.css',
      'plugins/datatables/FixedColumns-3.2.2/css/fixedColumns.bootstrap.min.css',
      'plugins/datatables/FixedHeader-3.1.2/css/fixedHeader.bootstrap.min.css',
      'cosapi/css/cosapi.css'
  ],'public/css/datatables.min.css','resources/assets/')
  .scripts([
      'plugins/datatables/DataTables-1.10.12/js/jquery.dataTables.min.js',
      'plugins/datatables/DataTables-1.10.12/js/dataTables.bootstrap.min.js',
      'plugins/datatables/Select-1.2.0/js/dataTables.select.min.js',
      'plugins/datatables/FixedColumns-3.2.2/js/dataTables.fixedColumns.min.js',
      'plugins/datatables/FixedHeader-3.1.2/js/dataTables.fixedHeader.min.js',
      'plugins/datatables/JSZip-2.5.0/jszip.min.js',
      'plugins/datatables/Responsive-2.1.0/js/dataTables.responsive.min.js',
      'plugins/datatables/Responsive-2.1.0/js/responsive.bootstrap.min.js',
      'plugins/datatables/Buttons-1.2.1/js/dataTables.buttons.min.js',
      'plugins/datatables/Buttons-1.2.1/js/buttons.bootstrap.min.js',
      'plugins/datatables/Buttons-1.2.1/js/buttons.html5.min.js'
  ],'public/js/datatables.min.js','resources/assets/');
});


/**
 Generando un solo archivo css y js para la funcionalidad de select
*/
elixir(function(mix) {
  mix
  .styles([
      'plugins/select2/select2.css'
  ],'public/css/select2.min.css','resources/assets/')
  .scripts([
      'plugins/select2/select2.js'
  ],'public/js/select2.min.js','resources/assets/');
});

/**
 Generando un solo archivo js para descarga de audios
*/
/*elixir(function(mix) {
  mix.scripts([
      'cosapi/js/jquery.media.js'
  ],'public/js/jquery.media.min.js','resources/assets/');
});*/












elixir(function(mix) {
  /**
  Copiar archivos para funcionamiento de adminLTE y Boostrap
  */
  mix
  .copy('vendor/twbs/bootstrap/dist/fonts'                           , 'public/fonts')
  .copy('vendor/fortawesome/font-awesome/fonts'                      , 'public/fonts')
  .copy('resources/assets/plugins/adminLTE/css/skins'                , 'public/css/skins')
  .copy('resources/assets/plugins/adminLTE/css/fonts-googleapis.css' , 'public/css/fonts-googleapis.css')
  .copy('resources/assets/plugins/adminLTE/css/fonts-google-apis'    , 'public/css/fonts-google-apis')

  /**
  Copy files individuales
  */
  .copy('resources/assets/index.php'                                 , 'public/index.php')
  .copy('resources/assets/favicon.ico'                               , 'public/favicon.ico')
  .copy('resources/assets/cosapi/descargar_audio.php'                , 'public/descargar_audio.php')

  /**
  Copiar imagenes en una sola carpeta
  */
  .copy('resources/assets/images'                                    , 'public/img')
  .copy('resources/assets/cosapi/img'                                , 'public/img')

  .copy('resources/assets/cosapi/favicon'                            , 'public/favicon')
  .copy('resources/assets/cosapi/background'                         , 'public/background')
  .copy('resources/assets/images/default_avatar.png'                 , 'public/storage/default_avatar.png');
    
});
