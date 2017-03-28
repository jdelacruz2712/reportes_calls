<header class="main-header">
    <!-- Token de sistemas -->
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <!-- Logo -->
    <a href="/" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>{{getenv('PROYECT_NAME_SHORT')}}</b></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>{{getenv('PROYECT_NAME_COMPLETE')}}</b></span>
    </a>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li>
                    <!-- Fecha Actual -->
                    <h5 class="navbar-text navbar-txt2" data-toggle="tooltip" data-placement="bottom" title="Anexo Actual" style="color: white">
                      <span class="fa fa-headphones"></span> Anexo: <font id="anexo">{{$anexo}}</font>
                    </h5>
                </li>
                <li>
                    <!-- Fecha Actual -->
                    <h5 id="fecha_actual" class="navbar-text navbar-txt2" data-toggle="tooltip" data-placement="bottom" title="Fecha Actual" style="color: white"></h5>
                </li>
                <li>
                    <!-- Hora Actual -->
                    <h5 id="hora_actual"  class="navbar-text navbar-txt2" data-toggle="tooltip" data-placement="bottom" title="Hora Actual" style="color: white"></h5>
                </li>
                <li>
                </li>
                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="img/logo_cosapi.jpg" class="user-image" alt="User Image">
                        <span class="hidden-xs">Cosapi Data</span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                            <img src="img/logo_cosapi.jpg" class="img-circle" alt="User Image">
                            <p>
                                {{ ucwords(Session::get('UserName')).' - '.ucwords(Session::get('UserRole'))}}
                                <small>{{date('j F Y')}}</small>
                            </p>
                        </li>
                        <!-- Menu Body -->
                        <!--<li class="user-body">
                            <div class="col-xs-4 text-center">
                                <a href="#">Queues</a>
                            </div>
                            <div class="col-xs-4 text-center">
                                <a href="#">Sales</a>
                            </div>
                            <div class="col-xs-4 text-center">
                                <a href="#">Friends</a>
                            </div>
                        </li>-->
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat reportes" id="working" >Profile</a>
                            </div>
                            <div class="pull-right">
                                <a href="#" onClick="javascript:disconnectAgent()" class="btn btn-default btn-flat">Sign out</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <!-- Control Sidebar Toggle Button -->
                <li>
                    <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                </li>
            </ul>
        </div>
    </nav>
</header>
