<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel" @click="loadModalStatus">
      <div class="pull-left image">
        <img  :src="'storage/' + srcAvatar" class="img-circle" alt="User Image">
      </div>
      <div  class="pull-left info">
        <input type="hidden"  v-model="getEventId" id="getEventId">
        <p><template v-if="getNameComplete">@{{ getNameComplete }}</template><template v-else>...</template></p>
        <a href="#">
          <template v-if="getEventName">
            <template v-if="statusQueueAddAsterisk === true">
              <i :class ="((annexedStatusAsterisk == '0') ? 'fa fa-circle text-green' : 'fa fa-circle text-red')"></i>
            </template>
            <template v-else>
              <i class ="fa fa-circle text-red"></i>
            </template>
            @{{ getEventName }}
          </template>
        </a>
      </div>
    </div>

    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu" data-widget="tree" id="menuleft">
      <li class="header">Menu Principal</li>
      @if($role != 'user' and  $role != 'backoffice')
      <li class="treeview">
        <a href="javascript:void(0)">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span> <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li><a href="dashboard_01" target="_blank"><i class="fa fa-circle-o text-red"></i> Dashboard 01</a></li>
          <li><a href="#" id="dashboard_03" class="reportes"><i class="fa fa-circle-o text-blue"></i> Dashboard 03</a></li>
        </ul>
      </li>
      @endif
      <li class="treeview">
        <a href="javascript:void(0)">
          <i class="fa fa-calendar-check-o"></i> <span>Reporting Events</span> <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          @if($role != 'cliente')
            <li><a href="javascript:void(0)" id="events_detail" class="reportes"><i class="fa fa-circle-o text-purple"></i> Detail Events</a></li>
          @endif
          @if($role != 'user')
            <li><a href="javascript:void(0)" id="events_consolidated"  class="reportes"><i class="fa fa-circle-o text-yellow"></i> Consolidated Events</a></li>
            <li><a href="javascript:void(0)" id="level_of_occupation"  class="reportes"><i class="fa fa-circle-o text-red"></i> Level Of Occupation</a></li>
            <li><a href="javascript:void(0)" id="detail_event_report"  class="reportes"><i class="fa fa-circle-o text-fuchsia"></i> Details Events Report (Beta)</a></li>
          @endif
        </ul>
      </li>
      <li class="treeview">
        <a href="javascript:void(0)">
          <i class="fa fa-phone-square"></i> <span>Reporting Calls</span> <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          @if($role != 'user' and  $role != 'backoffice')
          <li ><a tabindex="-1" href="javascript:void(0)" id="agents_online" class="reportes"><i class="fa fa-circle-o text-red"></i> Agents Online</a></li>
          @endif
          <li><a href="javascript:void(0)" id="incoming_calls"     class="reportes"><i class="fa fa-circle-o text-green"></i> Inbound Calls</a></li>
          <li><a href="javascript:void(0)" id="outgoing_calls"     class="reportes"><i class="fa fa-circle-o text-yellow"></i> Outbound Calls</a></li>
          <li><a href="javascript:void(0)" id="consolidated_calls" class="reportes"><i class="fa fa-circle-o text-blue"></i> Consolidated Calls</a></li>
        </ul>
      </li>
      @if($role != 'cliente' )
      <li class="treeview">
        <a href="javascript:void(0)">
          <i class="fa fa-book"></i> <span>Reporting Surveys</span> <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li><a href="javascript:void(0)" id="surveys"              class="reportes"><i class="fa fa-circle-o text-purple"></i> Detail Surveys</a></li>
        </ul>
      </li>
      @endif
      @if($role != 'cliente')
      <li class="treeview active">
        <a href="javascript:void(0)">
          <i class="fa fa-gears"></i> <span>Administrator</span> <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li><a href="javascript:void(0)" id="agents_annexed"       class="reportes"><i class="fa fa-circle-o text-purple"></i> Assign Annexed</a></li>
          @if($role != 'calidad')
          @if($role != 'backoffice')
          @if($role != 'user')
            <li><a href="javascript:void(0)" id="manage_users"         class="reportes"><i class="fa fa-circle-o text-red"></i> Manage Users</a></li>
            <li><a href="javascript:void(0)" id="manage_queues"        class="reportes"><i class="fa fa-circle-o text-success"></i> Manage Queues</a></li>
          @endif
          @endif
            @if(Session::get('ChangeRole') == 1)
              <li><a href="javascript:void(0)" id="activate_calls"     class="activate_calls" onclick="activeCalls()"><i class="fa fa-circle-o text-orange"></i> Activate Calls</a></li>
            @endif
          @endif
        </ul>
      </li>
      @endif
    </ul>
  </section>
  <!-- /.sidebar -->
</aside>
