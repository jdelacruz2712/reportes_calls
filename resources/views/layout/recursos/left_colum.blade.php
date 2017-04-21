<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel" id="statusAgent">
      <div class="pull-left image">
        <img  :src="'storage/' + srcAvatar" class="img-circle" alt="User Image">
       </div>
      <div  class="pull-left info">
        <input type="hidden"  v-model="anexo" value="{{$anexo}}">
        <input type="hidden"  v-model="present_status_id" id="present_status_id">
        <p>{{ ucwords(Session::get('UserName'))}}</p>
        <a href="#"><i class="fa fa-circle text-success"></i> @{{ present_status_name }}</a>
      </div>
    </div>

    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu">
        <li class="header">MENU PRINCIPAL</li>

      @if($role != 'user')
        <li class="active treeview">
          <a href="#">
            <i class="fa fa-dashboard"></i> <span>DASHBOARD</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="http://reportes_raul.cosapidata.pe/dashboard_01" target="_blank"><i class="fa fa-circle-o text-red"></i> Dashboard 01</a></li>
          </ul>
        </li>
      @endif

        <li>
          <a href="#">
            <i class="fa fa-calendar-check-o"></i> <span>REPORTING EVENTS</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="#" id="events_detail" class="reportes"><i class="fa fa-circle-o text-purple"></i> Detail Events</a></li>
            @if($role != 'user')
              <li><a href="#" id="events_consolidated"  class="reportes"><i class="fa fa-circle-o text-yellow"></i> Consolidated Events</a></li>
              <li><a href="#" id="level_of_occupation"  class="reportes"><i class="fa fa-circle-o text-red"></i> Level Of Occupation</a></li>
            @endif
          </ul>
        </li>

        <li>
          <a href="#">
            <i class="fa fa-phone-square"></i> <span>REPORTING CALLS</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            @if($role != 'user')
              <li ><a tabindex="-1" href="#" id="agents_online" class="reportes"><i class="fa fa-circle-o text-red"></i> Agents Online</a></li>
            @endif
              <li><a href="#" id="incoming_calls"     class="reportes"><i class="fa fa-circle-o text-green"></i> Inbound Calls</a></li>
              <li><a href="#" id="outgoing_calls"     class="reportes"><i class="fa fa-circle-o text-yellow"></i> Outbound Calls</a></li>
              <li><a href="#" id="consolidated_calls" class="reportes"><i class="fa fa-circle-o text-blue"></i> Consolidated Calls</a></li>
          </ul>
        </li>

        <li>
          <a href="#">
            <i class="fa fa-book"></i> <span>REPORTING SURVEYS</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="#" id="surveys"              class="reportes"><i class="fa fa-circle-o text-purple"></i> Detail Surveys</a></li>
          </ul>
        </li>

        <li>
          <a href="#">
            <i class="fa fa-gears"></i> <span>ADMINISTRATOR</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="#" id="agents_annexed"     class="reportes"><i class="fa fa-circle-o text-purple"></i> Assign Annexed</a></li>
            @if($role != 'user')
              <li><a href="#" id="list_users"         class="reportes"><i class="fa fa-circle-o text-red"></i> List Users</a></li>
              <li><a href="#" id="agents_queue"       class="reportes"><i class="fa fa-circle-o text-green"></i> Assign Queue</a></li>
            @endif
            @if(Session::get('ChangeRole') == 1)
              <li><a href="#" id="activate_calls"     class="activate_calls"><i class="fa fa-circle-o text-orange"></i> Activate Calls</a></li>
            @endif
          </ul>
        </li>

    </ul>
  </section>
  <!-- /.sidebar -->
</aside>
