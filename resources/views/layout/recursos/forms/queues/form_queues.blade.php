<!-- Modal content-->
<div class="panel panel-primary">
    <div class="panel-heading">
        <button type="button" class="close" onclick="clearModal('modalQueues', 'div.dialogQueues')" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">{{ $updateForm === true ? "Edit" : "Add" }} Queue</h4>
    </div>
    <div class="modal-body">
        <form id="formQueues">
            <div class="form-group">
                <label for="exampleInputEmail1">Name Queue</label>
                <input type="text" name="nameQueue" class="form-control" placeholder="Enter Name Queue" value="{{ $nameQueue }}">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">VDN</label>
                <input type="text" name="numVdn" class="form-control" placeholder="Enter number VDN" value="{{ $numVdn }}" onkeypress="return filterNumber(event)" onkeydown="return BlockCopyPaste(event)" {!! $updateForm === true ? 'readonly="readonly"' : '' !!}>
            </div>
            <div class="form-group">
                <label>Strategy</label>
                <select name="selectedStrategy" class="form-control">
                    @foreach ($optionsStrategy as $strategy)
                        <option value="{{ $strategy['id'] }}" {{ $strategy['id'] === $selectedStrategy ? "selected" : "" }}>{{ $strategy['name'] }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label>Priority</label>
                <select name="selectedPriority" class="form-control">
                    @foreach ($optionsPriority as $priority)
                        <option value="{{ $priority['id'] }}" {{ $priority['id'] === $selectedPriority ? "selected" : "" }}>{{ $priority['description'] }}</option>
                    @endforeach
                </select>
            </div>
            <div class="alert alert-danger formError" style="display: none"></div>
            <input type="hidden" name="queueID" value="{{ $idQueue }}">
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary btnForm">{!! $updateForm === true ? "<i class='fa fa-edit'></i> Editar" : "<i class='fa fa-plus'></i> Agregar" !!}</button>
                <button type="submit" class="btn btn-info btnLoad" style="display: none"><i class="fa fa-spin fa-spinner"></i> Cargando</button>
                <button type="button" class="btn btn-default" onclick="clearModal('modalQueues', 'div.dialogQueues')" data-dismiss="modal"><i class="fa fa-close"></i> Cerrar</button>
            </div>
        </form>
    </div>
</div>
{!!Html::script('js/form/formQueues.min.js')!!}
<script>
    hideErrorForm('.formError')
    clearModalClose('modalQueues', 'div.dialogQueues')
</script>