{!! Form::open([ 'method' => '', 'name'=>'buscador']) !!}
@if($boxReport == true)
	<div class="box box-primary">
		<div class="box-header">
			<h3 class="box-title"><b>@yield('titleReport')</b></h3>
			<div class="box-tools pull-right">
				<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
			</div>
		</div>
		<input type="hidden" name="_token" value="{!! csrf_token() !!}">
		<input type="hidden" id="hidEvent" value="{{$exportReport}}">
		<input type="hidden" id="hidDefaultEvent" value="{{$nameRouteController}}">
        @if($dateHourFilter)
            <div class="box-body">
                <div class="row">
                    <div class="col-md-12">
                        @if($dateFilter)
                            <div class="@if($viewButtonSearch == true || $viewHourSearch == true || $viewRolSearch == true) col-md-8 @else col-md-12 @endif">
                                <!-- Date range -->
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    @if($viewDateSearch)
                                        <input type="text" id="texto" name="fecha_evento" class="form-control pull-right" >
                                    @endif
                                    @if($viewDateSingleSearch)
                                        <input type="text" id="texto" name="fecha_evento" class="form-control fecha_evento_single pull-right" >
                                    @endif
                                </div>
                            </div>
                        @endif
                        @if($viewHourSearch)
                            <div class="@if($viewButtonSearch) col-md-2 @else col-md-4 @endif">
                                <!-- Hour range -->
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-clock-o"></i>
                                    </div>
                                    <select class="form-control" name="rankHour" id="rankHour">
                                        <option value="1800">30 minutos</option>
                                        <option value="3600">1 hora</option>
                                    </select>
                                </div>
                            </div>
                        @endif
                        @if($viewRolSearch)
                            <div class="@if($viewButtonSearch) col-md-2 @else col-md-4 @endif">
                                <!-- Hour range -->
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-user"></i>
                                    </div>
                                    <select class="form-control" name="rolUser" id="rolUser">
                                        <option value="user">User</option>
                                        <option value="backoffice">Backoffice</option>
                                    </select>
                                </div>
                            </div>
                        @endif
                        @if($viewButtonSearch)
                            @if(!$viewHourSearch || $viewRolSearch)
                                <div class="col-md-2"></div>
                            @endif
                            <div class="col-md-2 pull-left visible-lg">
                                <div class="text-center">
                                    @include('layout.recursos.buttons_search', ['classButton' => 'visible-lg'])
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        @endif
        @if($viewButtonExport)
        <div class="box-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-12">
                        <div class="text-center">
                            <div class="btn-group">
                                @include('layout.recursos.buttons_export')
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        @endif
	</div>
@endif
{!! Form::close() !!}

@yield('routeReport')