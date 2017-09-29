@include('layout.plugins.css-datepicker')
@include('layout.plugins.css-dateTables')
@include('layout.plugins.js-dateTables')
@include('layout.plugins.js-datepicker')
<div class="box box-primary" id="dashboardUser">
    <input v-model="showUser" @input="getInformationCall">
    <div class="box-header">
        <h5 class="box-title">Jeancarlos De la Cruz Criollo</h5>
        <div class="box-tools">
            <div class="btn btn-group" style="padding: 0px 0px;">
                <button class="btn btn-default"><i class="fa fa-save"></i></button>
                <button class="btn btn-default" data-toggle="modal" data-target="#modalSearch"><i class="fa fa-search"></i></button>
            </div>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            @include('elements.dashboard_user.utilities.formUtilities.formCall')
            @include('elements.dashboard_user.utilities.formUtilities.formRegister')
        </div>
        <div class="col-md-12">
            @include('elements.dashboard_user.utilities.report.reportCall')
        </div>
        @section('scriptsUtilities')
            <script>
                $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
                    $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust()
                })

                $('#tablePrueba,#tablePrueba2').dataTable({
                    responsive: true
                })
            </script>
        @endsection
    </div>
    @include('layout.recursos.modals.modal_dashboarduser')
</div>