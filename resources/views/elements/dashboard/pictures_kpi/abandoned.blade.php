<div class="col-md-2 " >
	 	<div class="info-box bg-red " v-if="abandoned != '-'">
			<span class="info-box-icon2">
				<i class="fa fa-close"></i>
			</span>
			<div class="info-box-content2" @click="loadMetricasKpi" >
				<span class="info-box-text2">Abandoned</span>
				<span class="info-box-number2">@{{ abandoned }}</span>
			</div>
		</div>
		<div @click="loadAbandoned" v-else>
			@include('layout.recursos.loading_bar')
		</div>
</div>
