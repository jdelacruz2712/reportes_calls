  <div class="col-md-2 col-sm-4 col-xs-8" @click="loadMetricasKpi">
      <div class="info-box bg-yellow">
          <span class="info-box-icon"><i class="fa fa-close"></i></span>
          <div class="info-box-content">
            <span class="info-box-text kpi-text">Abandoned</span>
            <span class="info-box-number kpi-number">@{{ abandoned }}</span>
          </div>
          <div v-else>
              @include('layout.recursos.loading_bar')
          </div>
      </div>
  </div>
