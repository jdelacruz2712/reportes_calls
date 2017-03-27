@include('layout.plugins.css-datepicker')
@include('layout.plugins.css-dateTables')
@include('layout.plugins.js-datepicker')
@include('layout.plugins.js-dateTables')

<div  class="col-md-12" id="container">
    {!! Form::open([ 'method' => '', 'name'=>'buscador']) !!}
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><b>Consolidado de Llamadas</b></h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <input type="hidden" id="url" value='listar_llamadas_contestadas'>
        <input type="hidden" name="_token" value="{!! csrf_token() !!}">
        <input type="hidden" id="hidEvent" value='export_consolidated'>
        <div class="box-body" style="display: block;">
            <div class="row">
                @include('filtros.filtro-fecha')
                @include('filtros.filtro-hour')                
            </div>
        </div>
    </div>
    {!! Form::close() !!}
</div>
@include('elements.consolidated_calls.tabs_consolidated_calls')