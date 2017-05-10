<div class="row-fluid" v-show="callsInbound.length != 0">
  <div class="col-md-12">
    <div class="box box-primary box-solid">
      <div class="box-header with-border ">
        <h3 class="box-title"><b>Details Calls Inbound</b></h3>
        <div class="box-tools pull-right">
         <button type="button" class="btn btn-box-tool" data-widget="collapse" onclick="refreshDetailsCalls()" data-toggle="tooltip" title="Refresh"><i class="fa fa-refresh"></i>
         </button>
        </div>
      </div>

      <div class="box-body">
        <div class="table-responsive" id =>
          <table align="center" class="table table-responsive table-condensed table-hover text-center">
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
              </tr>
            </thead>
            <tbody>
              <template v-for="(inbound, index) in callsInbound ">
                <tr>
                  <td>@{{ index + 1 }}</td>
                  <td>
                    @{{ inbound.agent_annexed }}
                    <span class="pull-right-container">
                      <template v-if="inbound.agent_status == 0  ">
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
                  <td>@{{ inbound.agent_name }}</td>
                  <td>
                    <span class="label label-success">
                      <i class="fa fa-phone" style="padding: 1px;" aria-hidden="true"></i>
                      @{{ inbound.event_name }}
                    </span>
                  </td>
                  <td>@{{ inbound.inbound_queue }}</td>
                  <td>@{{ inbound.inbound_phone  }}</td>
                  <td>@{{ inbound.timeElapsed }}</td>
                  <td>@{{ inbound.total_calls }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
