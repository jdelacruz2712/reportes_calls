<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
  <!-- Create the tabs -->
  <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
    <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
    <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
  </ul>
  <!-- Tab panes -->
  <div class="tab-content">
    <!--Updated by Jasvir 01/09/2017-->
    <!-- Home tab content -->
    <div class="tab-pane" id="control-sidebar-home-tab">
      <h3 class="control-sidebar-heading">Descripción de Estados</h3>
      <ul class="control-sidebar-menu">
        <!--estado acd-->
        <li>
          <a href="javascript:void(0)">
            <i class="menu-icon fa fa-phone bg-green"></i>
            <div class="menu-info">
              <h4 class="control-sidebar-subheading">Estado <b>ACD</b></h4>
              <p align='justify'>Estado en el cual un agente está disponible para recibir una llamada.</p>
            </div>
          </a>
        </li>
        <!--fin estado acd-->
        <!--estado break-->
        <li>
          <a href="javascript:void(0)">
            <i class="menu-icon fa fa-star bg-aqua"></i>
            <div class="menu-info">
              <h4 class="control-sidebar-subheading">Estado <b>Break</b></h4>
              <p align='justify'>Tiempo que ha utilizado el operador, con autorización del Supervisor, para ir a los servicios o atender un tema personal.</p>
            </div>
          </a>
        </li>
        <!--fin estado break-->
        <!--estado sshh-->
        <li>
          <a href="javascript:void(0)">
            <i class="menu-icon fa fa-asterisk bg-purple"></i>
            <div class="menu-info">
              <h4 class="control-sidebar-subheading">Estado <b>SS.HH</b></h4>
              <p align='justify'>Mide el tiempo que tarda un agente en los servicios higiénicos.</p>
            </div>
          </a>
        </li>
        <!--fin estado sshh-->
        <!--estado refrigerio-->
        <li>
          <a href="javascript:void(0)">
            <i class="menu-icon fa fa-cutlery bg-orange"></i>
            <div class="menu-info">
              <h4 class="control-sidebar-subheading">Estado <b>Refrigerio</b></h4>
              <p align='justify'>Mide el tiempo que el operador toma para el refrigerio de 01 hora dentro de su jornada laboral o turno.</p>
            </div>
          </a>
        </li>
        <!--fin estado refrigerio-->
        <!--estado Feedback-->
        <li>
          <a href="javascript:void(0)">
            <i class="menu-icon fa fa-retweet bg-red"></i>
            <div class="menu-info">
              <h4 class="control-sidebar-subheading">Estado <b>Feedback</b></h4>
              <p align='justify'>Tiempo en el cual el agente recibe instrucciones y/o tareas por parte del supervisor.</p>
            </div>
          </a>
        </li>
        <!--fin estado Feedback-->
        <!--estado Capacitación-->
        <li>
          <a href="javascript:void(0)">
            <i class="menu-icon fa fa-book bg-yellow"></i>
            <div class="menu-info">
              <h4 class="control-sidebar-subheading">Estado <b>Capacitación</b></h4>
              <p align='justify'>
                  Se contabiliza el tiempo en que el operador está en una reunión (en el local o fuera)
                  producto de una convocatoria del Supervisor, dentro del turno que le corresponde.
               </p>
            </div>
          </a>
        </li>
        <!--fin estado Capacitación-->
        <!--estado Gestión Backoffice-->
        <li>
          <a href="javascript:void(0)">
            <i class="menu-icon fa fa-suitcase bg-blue"></i>
            <div class="menu-info">
              <h4 class="control-sidebar-subheading">Estado <b>Gestión Backoffice</b></h4>
              <p align='justify'>
                  Seguimiento de casos para verificar el estatus, hacer
                  escalamiento de problemas o coordinar solución técnica con otra área.
              </p>
            </div>
          </a>
        </li>
        <!--fin estado Gestión Backoffice-->
      </ul>
      <!-- /.control-sidebar-menu -->

    </div>
    <!-- /.tab-pane -->

    <!-- Settings tab content -->
    <div class="tab-pane" id="control-sidebar-settings-tab">
      <form method="post">
        <h3 class="control-sidebar-heading">General Settings</h3>

        <div class="form-group">
          <label class="control-sidebar-subheading">
            It´s on develop
            <!--<input type="checkbox" class="pull-right" checked>
          </label>

          <p>
            Some information about this general settings option
          </p>-->
        </div>
        <!-- /.form-group -->

        <!--<div class="form-group">
          <label class="control-sidebar-subheading">
            Allow mail redirect
            <input type="checkbox" class="pull-right" checked>
          </label>

          <p>
            Other sets of options are available
          </p>
        </div> -->

        <!-- /.form-group -->

        <!--<div class="form-group">
          <label class="control-sidebar-subheading">
            Expose author name in posts
            <input type="checkbox" class="pull-right" checked>
          </label>

          <p>
            Allow the user to show his name in blog posts
          </p>
        </div> -->
        <!-- /.form-group -->

        <!-- <h3 class="control-sidebar-heading">Chat Settings</h3> -->

        <!-- <div class="form-group">
          <label class="control-sidebar-subheading">
            Show me as online
            <input type="checkbox" class="pull-right" checked>
          </label>
        </div> -->
        <!-- /.form-group -->

        <!--<div class="form-group">
          <label class="control-sidebar-subheading">
            Turn off notifications
            <input type="checkbox" class="pull-right">
          </label>
        </div> -->
        <!-- /.form-group -->

        <!-- <div class="form-group">
          <label class="control-sidebar-subheading">
            Delete chat history
            <a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
          </label>
        </div> -->
        <!-- /.form-group -->
      </form>
    </div>
    <!-- /.tab-pane -->
  </div>
</aside>
<!-- /.control-sidebar -->
