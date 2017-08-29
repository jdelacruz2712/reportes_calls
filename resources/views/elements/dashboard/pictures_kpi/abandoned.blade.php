<div class="col-md-2" @click="loadMetricasKpi">
  <div class="info-box bg-yellow">
    <span class="info-box-icon"><i class="fa fa-close"></i></span>
    <div class="info-box-content">
      <span class="info-box-text" style="text-transform: capitalize">Abandoned</span>
      <span class="info-box-number" style="font-size: 36px">@{{ abandoned }}</span>
    </div>
    <div v-else>
        @include('layout.recursos.loading_bar')
    </div>
</div>
