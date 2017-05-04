<div class="row-fluid" id='detailEncoladas'  v-show="callWaiting != 0">
  <div class="col-md-12">
    <div class="box box-warning box-solid">
      <div class="box-header with-border ">
        <h3 class="box-title"><b>Details Encoladas</b></h3>
      </div>

      <div class="table-responsive">
        <table class="table table-responsive table-bordered">
          <thead>
            <tr>
              <th>Number</th>
              <th>Queue </th>
              <th>Elapsed</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(encolada, index) in encoladas ">
              <tr>
                <td align="center">@{{ encolada.number_phone }} - @{{ encolada.name_number }}</td>
                <td align="center">@{{ encolada.name_queue }}</td>
                <td align="center">@{{ encolada.timeElapsed }}</td>
                @{{ loadTimeElapsedEncoladas(index) }}
              </tr>
            </template>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>
