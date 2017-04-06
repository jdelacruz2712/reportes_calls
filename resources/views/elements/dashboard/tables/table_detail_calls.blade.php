<div id='detail_agents' class="box-body">
  <div class="table-responsive" id =>
    <table align="center" class="table table-responsive table-bordered table-condensed table-hover">
      <thead>
        <tr>
          <th>Annexed</th>
          <th>Agent</th>
          <th>Status</th>
          <th>Queue</th>
          <th>Phone Number</th>
          <th>Total Duration</th>
          <th>Total Calls</th>
          <th>Exit</th>
        </tr>
      </thead>
      <tbody>

        <template v-for="(agent, list_index)   in agents ">
          <tr>
            <td>
              @{{ agent.number_annexed }}
              <span class="pull-right-container">
                <template v-if="agent.status_pause == 0  ">
                  <span class="img img-circle pull-right bg-green">
                    <i class="fa fa-thumbs-up" style="padding: 3.5px; " aria-hidden="true"></i>
                  </span>
                </template>
                <template v-else>
                  <span class="img img-circle pull-right bg-red">
                    <i class="fa fa-thumbs-down" style="padding: 3.5px; " aria-hidden="true"></i>
                  </span>
                </template>
              </span>
            </td>
            <td>@{{ agent.name_agent }}</td>
            <td align="center">
              <span class="label label-success">
                <i class="fa fa-phone" style="padding: 1px;" aria-hidden="true"></i>
                @{{ agent.name_event }}
              </span>
            </td>
            <td align="center">@{{ agent.name_queue_inbound }}</td>
            <td align="center">@{{ agent.phone_number_inbound }}</td>
            <td align="center">@{{ agent.star_call_inbound }}</td>
            <td align="center">@{{ agent.total_calls }}</td>
            <td align="center">
              <button onclick="desloguear_agente('224','acornejo');">
                <i class="fa fa-key" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <pre>@{{ $data }}</pre>
</div>

@section('scripts')
  {!!Html::script('js/dashboard_vue.min.js?version='.date('YmdHis'))!!}
@endsection
