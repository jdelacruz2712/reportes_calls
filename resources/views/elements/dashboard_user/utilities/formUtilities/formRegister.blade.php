<div class="col-md-7">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h5 class="panel-title titleForm">Registro de Llamada</h5>
        </div>
        <form id="formEnd">
            <div class="panel-body">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-warning"></i></span>
                        <select class="form-control">
                            <option selected disabled>Escoger Tipo de Llamada</option>
                            <option value="1">Prueba Tipo de Llamada</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-comment"></i></span>
                        <textarea class="form-control" placeholder="Detalle de la llamada"></textarea>
                    </div>
                </div>
            </div>
        </form>
    </div>
    @include('elements.dashboard_user.utilities.associatedCall')
</div>