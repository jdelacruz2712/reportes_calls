<div class="col-md-2 " >
    <div class="info-box bg-green">
		<span class="info-box-icon2">
			<i class="fa fa-sign-out"></i>
		</span>
		<div class="info-box-content2" @click="loadAnsweredTime">
			<span class="info-box-text2">Answered > 20 Seg</span>
			<span class="info-box-number2">@{{ answeredTime }}</span>
		</div>
	</div>
</div>