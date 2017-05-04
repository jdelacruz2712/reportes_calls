<div class="row-fluid" id='detailAgents'  v-show="agents.length != 0">
  <div class="col-md-12">
    <div class="box box-primary box-solid">
      <div class="box-header with-border ">
        <h3 class="box-title"><b>Details Calls</b></h3>
        <div class="box-tools pull-right">
         <button type="button" class="btn btn-box-tool" data-widget="collapse" onclick="refreshDetailsCalls()" data-toggle="tooltip" title="Refresh"><i class="fa fa-refresh"></i>
         </button>
        </div>
      </div>

      <div class="box-body">
        <div class="table-responsive" id =>
          <table align="center" class="table table-responsive table-condensed table-hover">
            <thead>
              <tr>
                <th>#</th>
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
              <template v-for="(agent, index) in agents ">
                <tr>
                  <td align="center">@{{ index + 1 }}</td>
                  <td align="center">
                    @{{ agent.agent_annexed }}
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
                  <td>@{{ agent.agent_name }}</td>
                  <td align="center">
                    <span class="label label-success">
                      <i class="fa fa-phone" style="padding: 1px;" aria-hidden="true"></i>
                      @{{ agent.event_name }}
                    </span>
                  </td>
                  <td align="center">@{{ agent.name_queue_inbound }}</td>
                  <td align="center">@{{ agent.phone_number_inbound }}</td>
                  <td align="center">@{{ agent.timeElapsed }}</td>
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
      </div>
    </div>
  </div>
</div>
