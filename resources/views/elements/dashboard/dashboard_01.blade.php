@include('layout.plugins.css-valores-cuadros')
@extends('layout.dashboard')
@section('title', 'Dashboard')
@section('content')
	<input id="tokenId" type="hidden" name="_token" value="{{ csrf_token() }}">
	<p>
	<div class="row-fluid" id="kpi">
		<div id='detail_kpi'>
			@include('elements.dashboard.pictures_kpi.index')
		</div>
	    <div id='total_encoladas'>
			@include('elements.dashboard.pictures_kpi.queue')
		</div>
	</div>
	<!-- Panel de Llamadas en Cola -->
	<div class="row-fluid">
		<div class="col-md-12">
			<div class="box box-primary box-solid collapsed-box">
		    	<div class="box-header with-border ">
		    		<h3 class="box-title"><b>Details Encoladas</b></h3>
		      		<div class="box-tools pull-right">
		        		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i>
		        		</button>
		      		</div>
		    	</div>
    			<div id='detail_encoladas' class="box-body"></div>
		  	</div>
		</div>
	</div>

	<!-- Panel de Estado de los Agentes -->
	<div class="row-fluid">
		<div class="col-md-12">
			<div class="box box-primary box-solid ">
		    	<div class="box-header with-border ">
		    		<h3 class="box-title"><b>Details Calls</b></h3>
		      		<div class="box-tools pull-right">
		        		<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		        		</button>
		      		</div>
		    	</div>
				@include('elements.dashboard.tables.table_detail_calls')
		  	</div>
		</div>
	</div>

@endsection
