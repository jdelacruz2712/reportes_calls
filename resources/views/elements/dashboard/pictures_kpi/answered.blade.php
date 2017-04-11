<div class="col-md-2" >
    <div class="info-box bg-green" v-if="answered != '-'">
		<span class="info-box-icon2">
			<i class="fa fa-check"></i>
		</span>
		<div class="info-box-content2" @click="loadAnswered" >
			<span class="info-box-text2">Answered</span>
			<span class="info-box-number2">@{{ answered }}</span>
		</div>
	</div>
    <div @click="loadAnswered" v-else>
		@include('layout.recursos.loading_bar')
	</div>
</div>