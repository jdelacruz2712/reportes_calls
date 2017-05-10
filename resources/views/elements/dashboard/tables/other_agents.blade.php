<div class="row-fluid">
  <div class="col-md-12">
    <div class="box box-primary box-solid">
      <div class="box-header with-border ">
        <h3 class="box-title"><b>Details Agents Connect</b></h3>
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
                <th>Total Duration</th>
                <th>Total Calls</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(other, index) in others ">
                <tr>
                  <td>@{{ index + 1 }}</td>
                  <td>@{{ other.agent_annexed }}</td>
                  <td>@{{ other.agent_name }}</td>
                  <td>
                    <span class="label label-success">
                      <i class="fa fa-phone" style="padding: 1px;" aria-hidden="true"></i>
                      @{{ other.event_name }}
                    </span>
                  </td>
                  <td>@{{ other.timeElapsed }}</td>
                  <td>@{{ other.agent_total_calls }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</div>
