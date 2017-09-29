<div class="col-md-5">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h5 class="panel-title pull-left">Información de Contacto</h5>
            <div class="btn btn-group pull-right" style="padding: 0px 0px;">
                <template v-if="showUser == 2 || showUser == 3">
                    <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#modalUser"><i class="fa fa-edit"></i> Editar Usuario</button>
                </template>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="panel-body">
            <template><center><span class="text-primary" v-if="showLoading"><i class="fa fa-spin fa-spinner"></i> Cargando..</span></center></template>
            <template v-if="!showLoading">
                <div class="text-center" v-if="showUser == 1">
                    <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#modalUser"><i class="fa fa-plus"></i> Crear Nuevo Usuario</button>
                </div>
                <template v-if="showUser == 2 || showUser == 3">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="text" class="form-control" placeholder="Nombre Completo" v-model="nameComplete" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-vcard"></i></span>
                            <input type="text" class="form-control" placeholder="Tipo de Documento" v-model="TypeDocument" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-dot-circle-o"></i></span>
                            <input type="text" class="form-control" placeholder="Numero de Documento" v-model="numberDocument" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-building"></i></span>
                            <input type="text" class="form-control" placeholder="Nombre de Sede" v-model="nameSede" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-group"></i></span>
                            <input type="text" class="form-control" placeholder="Nombre de Área" v-model="nameArea" readonly>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</div>