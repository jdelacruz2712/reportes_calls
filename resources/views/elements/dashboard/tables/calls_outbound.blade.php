<div class="row-fluid" v-show="callsOutbound.length != 0">
  <div class="col-md-12">
    <div class="box box-primary box-solid">
      <div class="box-header with-border ">
        <h3 class="box-title"><b>Detail Calls Outbound</b></h3>
        <div class="box-tools pull-right">
         <button type="button" class="btn btn-box-tool" data-widget="collapse" onclick="refreshDetailsCalls()" data-toggle="tooltip" title="Refresh"><i class="fa fa-refresh"></i>
         </button>
        </div>
      </div>
      <div class="box-body">
        <div class="table-responsive" id =>
          <table align="center" class="table table-responsive table-condensed text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Annexed</th>
                <th>Agent</th>
                <th>Evento</th>
                <th>Number Outbound</th>
                <th>Talk Time</th>
                <th>Status Time</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(outbound, index) in callsOutbound ">
                <tr>
                  <td> @{{ index + 1 }}</td>
                  <td> @{{ outbound.agent_annexed }}</td>
                  <td>@{{ outbound.agent_name }}</td>
                  <td>
                    <span class="label label-success">
                      <i class="fa fa-phone" style="padding: 1px;" aria-hidden="true"></i>
                      @{{ outbound.event_name }}
                    </span>
                  </td>
                  <td>@{{ outbound.outbound_phone }}</td>
                  <td>@{{ outbound.timeElapsed }}</td>
                  <td>@{{ outbound.timeElapsed }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="overlay" v-if="callsOutbound.length === 0">
        <i class="fa fa-refresh fa-spin"></i>
      </div>
    </div>
  </div>
</div>
