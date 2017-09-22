
<div class="col-md-2 col-sm-4 col-xs-8" @click="loadMetricasKpi">
    <div class="info-box bg-blue" v-if="slaDay != '-'">
    <span class="info-box-icon">
    	<i class="fa fa-check"></i>
    </span>
        <div class="info-box-content" >
            <span class="info-box-text kpi-text">Sla Day</span>
            <span class="info-box-number kpi-number">@{{ slaDay }}</span>
        </div>
    </div>
    <div @click="loadSlaDay" v-else>
        @include('layout.recursos.loading_bar')
    </div>
</div>
