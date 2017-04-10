<div class="col-md-2 " >
    <div class="info-box bg-yellow" v-if="slaDay != '-'">
		<span class="info-box-icon2">
			<i class="fa fa-sign-out"></i>
		</span>
		<div class="info-box-content2" @click="loadSlaDay">
			<span class="info-box-text2">Sla Day</span>
			<span class="info-box-number2">@{{ slaDay }}</span>
		</div>
	</div>
	<div @click="loadSlaDay" v-else>
		@include('layout.recursos.loading_bar')
	</div>
</div>