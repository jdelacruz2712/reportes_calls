<div class="col-md-2 col-sm-4 col-xs-8" @click="loadMetricasKpi">
    <div class="info-box bg-red" v-if="abandonedTime != '-'">
        <span class="info-box-icon"><i class="fa fa-sign-out"></i></span>
        <div class="info-box-content" >
            <span class="info-box-text kpi-text">Abandoned @{{ abandonedSymbol }} @{{ abandonedSecond }} Seg</span>
            <span class="info-box-number kpi-number">@{{ abandonedTime }}</span>
        </div>
    </div>

    <div v-else>
        @include('layout.recursos.loading_bar')
    </div>
</div>
