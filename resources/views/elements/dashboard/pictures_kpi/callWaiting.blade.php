<div class="col-md-2 col-sm-4 col-xs-8" id="total_encoladas" v-if="totalCallsWaiting != 0">
    <div class="info-box bg-yellow">
		<span class="info-box-icon">
			<i class="fa fa-sign-out"></i>
		</span>
		<div class="info-box-content" @click="loadCallWaiting">
			<span class="info-box-text kpi-text">Encoladas</span>
			<span class="info-box-number kpi-text" id="count_encoladas" >@{{ totalCallsWaiting }}</span>
		</div>
	</div>
</div>
