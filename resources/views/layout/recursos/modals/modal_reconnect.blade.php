<!-- Modal -->
<div :class="ModalConnectionNodeJs" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog ">
    <!-- Modal content-->
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h4 class="modal-title">@{{ nodejsServerName }}</h4>
      </div>
      <div class="modal-body">
        <div class="img-responsive ">
          <center>
            @{{ nodejsServerMessage }}
          </center>
        </div>
        <br>
      </div>
    </div>
  </div>
</div>
