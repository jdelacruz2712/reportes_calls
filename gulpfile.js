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

elixir(function(mix) {

    mix.styles([
        'vendor/bootstrap/css/bootstrap.css',
        'extras/toastr/toastr.css',
        'extras/bootstrap3-dialog/css/bootstrap-dialog.css',
        'vendor/fortawesome/css/font-awesome.css',
        'plugins/adminLTE/css/AdminLTE.css',
        'plugins/adminLTE/css/skins/_all-skins.css',
        'cosapi/css/preloader.css'
    ],'public/styles/css/all.css','resources/assets/');

    mix.copy('resources/assets/plugins/adminLTE/css/fonts-googleapis.css' , 'public/styles/css/fonts-googleapis.css');
    mix.copy('resources/assets/plugins/adminLTE/css/fonts-google-apis'    , 'public/styles/css/fonts-google-apis');
    mix.copy('resources/assets/plugins/adminLTE/css/skins'                , 'public/styles/css/skins');
    mix.copy('resources/assets/images'                                    , 'public/images');
    mix.copy('vendor/twbs/bootstrap/dist/fonts'                           , 'public/styles/fonts');
    mix.copy('vendor/fortawesome/font-awesome/fonts'                      , 'public/styles/fonts');
    mix.copy('resources/assets/cosapi/descargar_audio.php'                , 'public/descargar_audio.php');
    mix.copy('resources/assets/favicon.ico'                               , 'public/favicon.ico');
    mix.copy('resources/assets/index.php'                                 , 'public/index.php');

    //mix.scripts([
        //'vendor/jquery/jquery.js',
        //'extras/toastr/toastr.js',
        //'plugins/jQueryUI/jquery-ui.js',
        //'vendor/bootstrap/js/bootstrap.js',
        //'extras/bootstrap3-dialog/js/bootstrap-dialog.js',
        //'plugins/adminLTE/js/app.js',
        //'plugins/adminLTE/js/funcionalidades.js',
        //'cosapi/js/vue.js',
        //'cosapi/js/socket.io.js',
        //'cosapi/js/sails.io.js'
        //'cosapi/js/cosapi_adminlte.js',
        //'cosapi/js/datatables.js',
        //'cosapi/js/adminlte_vue.js'
    //],'public/scripts/js/all.js','public/');


});

/*
elixir(function(mix) {

});
    */