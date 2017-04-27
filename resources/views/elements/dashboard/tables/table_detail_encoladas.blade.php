<div class="row-fluid" id='detailEncoladas'v-show="callWaiting != 0">
  <div class="col-md-12">
    <div class="box box-primary box-solid collapsed-box">
      <div class="box-header with-border ">
        <h3 class="box-title"><b>Details Encoladas</b></h3>
        <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i>
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-responsive table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Number Inbound</th>
              <th>Name Inbound</th>
              <th>Name Queue </th>
              <th>Time Elapsed</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(encolada, index) in encoladas ">
              <tr>
                <td align="center">@{{ index + 1 }} @{{ loadTimeElapsedEncoladas(index) }}</td>
                <td align="center">@{{ encolada.number_phone }}</td>
                <td align="center">@{{ encolada.name_number }}</td>
                <td align="center">@{{ encolada.name_queue }}</td>
                <td align="center">@{{ encolada.timeElapsed }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>
