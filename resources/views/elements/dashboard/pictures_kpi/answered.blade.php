<div class="col-md-2 col-sm-4 col-xs-8" @click="loadMetricasKpi">
  <div class="info-box bg-green" v-if="answered != '-'">
    <span class="info-box-icon">
    	<i class="fa fa-check"></i>
    </span>
    <div class="info-box-content" >
    	<span class="info-box-text kpi-text">Answered</span>
    	<span class="info-box-number kpi-number">@{{ answered }}</span>
    </div>
  </div>
  <div v-else>
    @include('layout.recursos.loading_bar')
  </div>
</div>
