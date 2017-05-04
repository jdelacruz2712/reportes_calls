@include('layout.plugins.css-valores-cuadros')
@extends('layout.dashboard')
@section('title', 'Dashboard')
@section('content')
	<input id="tokenId" type="hidden" name="_token" value="{{ csrf_token() }}">
	<p>
	<div id="dashboard">
		@include('elements.dashboard.pictures_kpi.index')
		@include('elements.dashboard.tables.table_detail_calls')
		<div class="row">
			<div class="col-md-8">
				@include('elements.dashboard.tables.table_detail_encoladas')
				@include('elements.dashboard.tables.table_detail_agents')
			</div>
			<div class="col-md-4">
				@include('elements.dashboard.panels_kpi.agentactivitysummary')
			</div>
		</div>
		<!-- <pre>@{{ $data }}</pre> -->
	</div>
@endsection

@section('scripts')
  {!!Html::script('js/dashboard_vue.min.js?version='.date('YmdHis'))!!}
@endsection
