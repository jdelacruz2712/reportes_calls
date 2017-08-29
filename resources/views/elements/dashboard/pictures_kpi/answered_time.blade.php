<div class="col-md-2" @click="loadMetricasKpi">
    <div class="info-box bg-green" v-if="answeredTime != '-'">
		<span class="info-box-icon">
			<i class="fa fa-sign-out"></i>
		</span>
        <div class="info-box-content" >
            <span class="info-box-text" style="text-transform: capitalize">Answered @{{ answeredSymbol }} @{{ answeredSecond }} Seg</span>
            <span class="info-box-number" style="font-size: 36px">@{{ answeredTime }}</span>
        </div>
    </div>
    <div v-else>
        @include('layout.recursos.loading_bar')
    </div>
</div>
