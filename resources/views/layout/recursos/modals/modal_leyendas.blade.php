<div id="modalDetailsEvents" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="panel panel-primary">
            <div class="panel panel-heading">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Calculos para el Nivel de Ocupación</h4>
            </div>
            <div class="modal-body">
                <div class="alert bg-gray">
                    <b>Total ACD : </b> Inbound + Hold Inbound + Ring Inbound Interno + Inbound Interno + Hold Inbound Interno
                </div>
                <div class="alert bg-gray">
                    <b>Total Outbound : </b> OutBound + Ring Outbound + Hold Outbound + Outbound Interno + Hold Outbound Interno
                </div>
                <div class="alert bg-gray">
                    <b>Auxxiliares S/BackOffice : </b> Break + SSHH + Refrigerio + Feedback + Capacitacion
                </div>
                <div class="alert bg-gray">
                    <b>Auxiliares C/BackOffice : </b> Break + SSHH + Refrigerio + Feedback + Capacitación + Gestión BackOffice
                </div>
                <div class="alert bg-gray">
                    <b>Nivel Ocupación S/BackOffice : </b>
                    <span>
                        (Total ACD + Total Outbound) / (Total Logeo - Auxiliares C/BackOffice)
                    </span>
                </div>
                <div class="alert bg-gray">
                    <b>Nivel Ocupación C/BackOffice : </b>
                    <span>
                        (Total ACD + Total Outbound + Gestión BackOffice ) / (Total Logeo - Auxiliares S/BackOffice)
                    </span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>