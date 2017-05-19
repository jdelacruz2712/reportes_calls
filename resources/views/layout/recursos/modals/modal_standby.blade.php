<!-- Modal -->
<div :class="ModalStandByAssistance" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h4 class="modal-title">Control de assistance</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12" >
                        <p>
                            @{{ messageStandBy }}
                            <br>
                            <h1><center>@{{ differenceHour }}</center></h1>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
