<div class="col-md-2 " >
    <div class="info-box bg-red" v-if="abandonedTime != '-'">
		<span class="info-box-icon2">
			<i class="fa fa-sign-out"></i>
		</span>
		<div class="info-box-content2" @click="loadAbandonedTime">
			<span class="info-box-text2">Abandoned @{{ abandonedSymbol }} @{{ abandonedSecond }} Seg</span>
			<span class="info-box-number2">@{{ abandonedTime }}</span>
		</div>
	</div>
	<div @click="loadAbandonedTime" v-else>
		@include('layout.recursos.loading_bar')
	</div>
</div>