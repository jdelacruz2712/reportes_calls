<input type="hidden" name="_token" value="{!! csrf_token() !!}">

<div class="panel panel-default">
    <div class="panel-body" >
        <div class="box-body">
            <div class="form-group col-md-12">
                <div class="pull-left">
                    <a onclick="" class="btn btn-primary"><i class="fa fa-user-plus"></i> Crear Options (SIP)</a>
                    <a onclick="" class="btn btn-info"><i class="fa fa-adn"></i> Crear Type (SIP)</a>
                </div>
                <div class="pull-right">
                    <a onclick="" class="btn btn-warning"><i class="fa fa-newspaper-o"></i> Exportar Types (.txt)</a>
                    <a onclick="" class="btn btn-danger"><i class="fa fa-save"></i> Guardar Permisos</a>
                </div>
            </div>
        </div>
        <div class="tab-pane fade active in" id="panel-report">
            <div class="table-overflow-x">
                <table id="table-list-user" class="table table-bordered" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th colspan="1"></th>
                    <th class="th-centro th-primary" colspan="5">Anexos</th>
                    <th class="th-centro th-warning" colspan="4">Salidas</th>
                    <th class="th-centro th-info" colspan="4">Funciones</th>
                </tr>
                <tr>
                    <th>Type</th>
                    <th>Internos</th>
                    <th>Supervision</th>
                    <th>Corporativo</th>
                    <th>Calidad</th>
                    <th>Backoffice</th>
                    <th>Local</th>
                    <th>Nacional</th>
                    <th>Celulares</th>
                    <th>0800</th>
                    <th>Monitorear</th>
                    <th>Grabar Voz</th>
                    <th>Transferencias vdns</th>
                    <th>Encuesta</th>
                </tr>
                </thead>
                <tbody class="tr-fix-center">
                    <tr>
                        <td>cliente</td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                        <td><input type="checkbox" name="cliente"></td>
                    </tr>
                    <tr>
                        <td>agentes</td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                        <td><input type="checkbox" name="agentes"></td>
                    </tr>
                    <tr>
                        <td>calidad</td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                        <td><input type="checkbox" name="calidad"></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</div>