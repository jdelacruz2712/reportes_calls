<!-- Modal -->
<div id="myModalStatus" :class="showStatusModal" role="dialog" data-backdrop="static" data-keyboard="false" >
    <div class="modal-dialog" name="eder">
        <!-- Modal content-->
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h4 class="modal-title">Cosapi Data S.A.</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-3" data-toggle="tooltip" v-for="getListEvent in getListEvents" :title="getListEvent.name" style="margin-bottom: 10px;">

                        <a href="#" onclick="">
                            <span :class=" 'info-box-icon bg-' + getListEvent.color " style="width:100%; height: 100%">
                                <i :class="getListEvent.icon"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>