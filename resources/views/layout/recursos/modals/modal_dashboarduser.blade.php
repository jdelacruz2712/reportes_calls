<div id="modalDetalleLlamada" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Detalle de Llamada</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-warning"></i></span>
                        <input type="text" class="form-control" placeholder="Tipo de LLamada" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-comment"></i></span>
                        <textarea rows="4" style="resize: none" class="form-control" readonly>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-close"></i> Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div id="modalSearch" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Buscar Usuario</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="col-md-12">
                        <div class="col-md-6 form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" placeholder="Número de Telefono">
                            </div>
                        </div>
                        <div class=" col-md-6 form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-dot-circle-o"></i></span>
                                <input type="text" class="form-control" placeholder="Numero de Documento">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default pull-right"><i class="fa fa-search"></i> Buscar</button>
                    </div>
                </form>
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h5 class="panel-title">Usuarios Encontrados</h5>
                    </div>
                    <div class="panel-body">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombres Completos</th>
                                <th>Acción</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1.</td>
                                <td>Jeancarlos De la Cruz</td>
                                <td><button class="btn btn-primary btn-xs"><i class="fa fa-search"></i> Asignar</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="panel-footer clearfix">
                        <button type="button" class="btn btn-default pull-right"><i class="fa fa-server"></i> 1 Usuario Encontrado</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modalUser" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h5 class="panel-title" v-if="showUser == 1">Crear Nuevo Usuario</h5>
                <h5 class="panel-title" v-if="showUser == 2 || showUser == 3">Editar Usuario</h5>
            </div>
            <div class="modal-body">
                <form id="formInformationCall">
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                <input type="text" class="form-control" v-model="nameComplete" name="nameComplete" placeholder="Nombre Completo">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-vcard"></i></span>
                                <select class="form-control" name="TypeDocument">
                                    <option :selected="TypeDocument === '' ? 'selected' : ''" disabled>Escoger Tipo de Documento</option>
                                    <option value="DNI" :selected="TypeDocument === 'DNI' ? 'selected' : ''">DNI</option>
                                    <option value="RUC" :selected="TypeDocument === 'RUC' ? 'selected' : ''">RUC</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-dot-circle-o"></i></span>
                                <input type="text" class="form-control" v-model="numberDocument" name="numberDocument" placeholder="Numero de Documento">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-building"></i></span>
                                <input type="text" class="form-control" v-model="nameSede" name="nameSede" placeholder="Nombre de Sede">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-group"></i></span>
                                <input type="text" class="form-control" v-model="nameArea" name="nameArea" placeholder="Nombre de Área">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default pull-right btnForm">
                            <template v-if="showUser == 1"><i class="fa fa-plus"></i> Agregar Nuevo Usuario</template>
                            <template v-if="showUser == 2 || showUser == 3"><i class="fa fa-plus"></i> Editar Usuario</template>
                        </button>
                        <button type="submit" class="btn btn-info btnLoad" style="display: none"><i class="fa fa-spin fa-spinner"></i> Cargando</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div id="modalTelefono" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h5 class="panel-title titleForm">Agregar Telefono Asociado</h5>
            </div>
            <div class="modal-body">
                <form id="formPhone">
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input type="text" class="form-control" name="phoneNumber" placeholder="Número de Telefono">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default btnForm"><i class="fa fa-plus"></i> Agregar</button>
                        <button type="submit" class="btn btn-info btnLoad" style="display: none"><i class="fa fa-spin fa-spinner"></i> Cargando</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div id="modalPersonal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h5 class="panel-title titleForm">Agregar Personal de Contacto</h5>
            </div>
            <div class="modal-body">
                <form id="formPersonal">
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                <input type="text" class="form-control" name="personalContact" placeholder="Nombre Completo del Personal">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default btnForm"><i class="fa fa-plus"></i> Agregar</button>
                        <button type="submit" class="btn btn-info btnLoad" style="display: none"><i class="fa fa-spin fa-spinner"></i> Cargando</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
