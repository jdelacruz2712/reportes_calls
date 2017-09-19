<div class="col-md-2 col-sm-4 col-xs-8" @click="loadMetricasKpi">
  <div class="info-box bg-yellow" v-if="outbound != '-'">
    <span class="info-box-icon metricas-info-box-icon"><i class="fa fa-sign-out"></i></span>
    <div class="info-box-content metricas-info-box-content" >
    	<span class="info-box-text metricas-info-box-text">Outbound</span>
    	<span class="info-box-number metricas-info-box-number">{{ $Salientes }</span>
    </div>
  </div>
  <div v-else>@include('layout.recursos.loading_bar')</div>
</div>
