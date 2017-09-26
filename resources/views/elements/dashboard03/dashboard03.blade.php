<section class="content">
  <div class="row">
    <!-- inicio de kpis -->
    @include('elements.dashboard03.kpis.kpi_01')
    @include('elements.dashboard03.kpis.kpi_02')
    @include('elements.dashboard03.kpis.kpi_03')
    @include('elements.dashboard03.kpis.kpi_04')
    <!-- fin de kpis -->
  </div>

  <div class="row">
      <!--graficos del lado derecho-->
    <section class="col-lg-9 connectedSortable ui-sortable">
      @include('elements.dashboard03.graphics.linegraph', ['nameGrafico' => 'llamadas_abandonadas'])
      @include('elements.dashboard03.graphics.linegraph',['nameGrafico' => 'promedio_atencion'])
    </section>
      <!--graficos del lado izquierdo-->
    <section class="col-lg-3 connectedSortable ui-sortable">
      @include('elements.dashboard03.graphics.graphics')
    </section>
  </div>
<script src="{{ asset('js/drop-drag.min.js')}}"></script>
<script src="{{ asset('js/highchart.min.js')}}"></script>
{!! Html::script('js/graficos.js?version='.date('YmdHis')) !!}
