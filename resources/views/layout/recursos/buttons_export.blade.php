@if($viewButtonSearch)
    @include('layout.recursos.buttons_search', ['classButton' => 'hidden-lg'])
@endif
<a onclick="exportar('csv')" class="btn btn-instagram"><span class="fa fa-file-code-o" aria-hidden="true"></span> Export Csv</a>
<a onclick="exportar('excel')" class="btn btn-success"><span class="fa fa-file-excel-o" aria-hidden="true"></span> Export Excel</a>
