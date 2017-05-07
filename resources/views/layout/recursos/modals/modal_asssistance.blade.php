<!-- Modal -->
<div :class="showAssistanceModal" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="panel panel-primary">
            <div class="panel-heading">
                <button type="button" class="close" @click="showAssistanceModal = 'modal fade'">
                    <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Control de assistance</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12" >
                        <p>Por favor de seleccionar la hora correspondiente a su @{{ textCheckAssistance }} .</p>
                        <br><br>
                        <div class="row">
                            <div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour" value="' + rankHours[1] + '">@{{ HourAssistance }}</center></div>
                            <div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour_after" value="' + rankHours[2] + '">@{{ nextHourAssistance }}</center></div>
                        </div>'
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" type="submit">Aceptar</button> <button class="btn btn-danger" type="submit" @click="showAssistanceModal = 'modal fade'">Cancelar</button>
            </div>
        </div>
    </div>
</div>
