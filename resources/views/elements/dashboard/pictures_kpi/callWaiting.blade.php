<div class="col-md-2 " id="total_encoladas" v-show="callWaiting != 0">
    <div class="info-box bg-blue">
		<span class="info-box-icon2">
			<i class="fa fa-sign-out"></i>
		</span>
		<div class="info-box-content2" @click="loadCallWaiting">
			<span class="info-box-text2">Encoladas</span>
			<span class="info-box-number2" id="count_encoladas">@{{ callWaiting }}</span>
		</div>
	</div>
</div>
