<div class="col-md-2 " >
    <div class="info-box bg-red">
		<span class="info-box-icon2">
			<i class="fa fa-sign-out"></i>
		</span>
		<div class="info-box-content2" @click="loadAbandonedTime">
			<span class="info-box-text2">Abandoned > 20 Seg</span>
			<span class="info-box-number2">@{{ abandonedTime }}</span>
		</div>
	</div>
</div>