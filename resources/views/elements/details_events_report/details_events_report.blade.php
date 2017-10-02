<div class="box box-primary">
    <div class="box-body">
        <div class="box-tools">
            <button type="button" class="btn btn-info pull-right" data-toggle="modal" data-target="#modalDetailsEvents"><i class="fa fa-eercast"></i> Leyenda</button><br>
        </div><br>
        <table id="table-details-events-report" class="table table-bordered display nowrap table-responsive" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Login</th>
                    <th>ACD</th>
                    <th>Break</th>
                    <th>SS.HH</th>
                    <th>Refrigerio</th>
                    <th>Feedback</th>
                    <th>Capacitación</th>
                    <th>Gestión BackOffice</th>
                    <th>Inbound</th>
                    <th>OutBound</th>
                    <th>Ring Inbound</th>
                    <th>Ring Outbound</th>
                    <th>Hold Inbound</th>
                    <th>Hold Outbound</th>
                    <th>Ring Inbound Interno</th>
                    <th>Inbound Interno</th>
                    <th>Outbound Interno</th>
                    <th>Ring Outbound Interno</th>
                    <th>Hold Inbound Interno</th>
                    <th>Hold Outbound Interno</th>
                    <th>Ring Inbound Transfer</th>
                    <th>Inbound Transfer</th>
                    <th>Hold Inbound Transfer</th>
                    <th>Ring Outbound Transfer</th>
                    <th>Hold Outbound Transfer</th>
                    <th>Outbound Transfer</th>
                    <th>Desconectado</th>
                    <th>Total ACD</th>
                    <th>Total Outbound</th>
                    <th>Auxiliares S/Backoffice</th>
                    <th>Auxiliares C/Backoffice</th>
                    <th>Nivel Ocupación S/Backoffice</th>
                    <th>Nivel Ocupación C/Backoffice</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
@include('layout.recursos.modals.modal_leyendas')
<script type="text/javascript">
    $(document).ready(function(){
        buscar()
    })

    function buscar(){
        let fecha = $("#texto").val()
        $("#table-details-events-report").dataTable().fnDestroy()
        $("#table-details-events-report").DataTable({
            "ajax"              : {
                url     : "detail_event_report",
                type    : "POST",
                dataSrc : "data",
                data :{
                    _token       : $('input[name=_token]').val(),
                    filter_rol   : $('select[name=rolUser]').val(),
                    group_filter : $('select[name=groupFilter]').val(),
                    fecha_evento : fecha
                }
            },
            "columns"    : [
                {"data" : "Name"},
                {"data" : "Login"},
                {"data" : "ACD"},
                {"data" : "Break"},
                {"data" : "SSHH"},
                {"data" : "Refrigerio"},
                {"data" : "Feedback"},
                {"data" : "Capacitacion"},
                {"data" : "Gestion BackOffice"},
                {"data" : "Inbound"},
                {"data" : "OutBound"},
                {"data" : "Ring Inbound"},
                {"data" : "Ring Outbound"},
                {"data" : "Hold Inbound"},
                {"data" : "Hold Outbound"},
                {"data" : "Ring Inbound Interno"},
                {"data" : "Inbound Interno"},
                {"data" : "Outbound Interno"},
                {"data" : "Ring Outbound Interno"},
                {"data" : "Hold Inbound Interno"},
                {"data" : "Hold Outbound Interno"},
                {"data" : "Ring Inbound Transfer"},
                {"data" : "Inbound Transfer"},
                {"data" : "Hold Inbound Transfer"},
                {"data" : "Ring Outbound Transfer"},
                {"data" : "Hold Outbound Transfer"},
                {"data" : "Outbound Transfer"},
                {"data" : "Desconectado"},
                {"data" : "Total ACD"},
                {"data" : "Total Outbound"},
                {"data" : "Auxiliares"},
                {"data" : "Auxiliares Backoffice"},
                {"data" : "Nivel Ocupacion"},
                {"data" : "Nivel Ocupacion Backoffice"}
            ],
            "paging"            : true,
            "pageLength"        : 100,
            "lengthMenu"        : [100, 200, 300, 400, 500],
            "scrollY"           : "300px",
            "scrollX"           : true,
            "scrollCollapse"    : true,
            "select"            : true,
            fixedColumns        : true
        })
    }

</script>