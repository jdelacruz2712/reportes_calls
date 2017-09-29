<template v-if="TypeDocument == 'DNI' || TypeDocument == 'RUC'">
<div class="col-md-6">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h5 class="panel-title pull-left">Telefonos Asociados</h5>
            <div class="btn btn-group pull-right" style="padding: 0px 0px;">
                <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#modalTelefono"><i class="fa fa-plus"></i> Agregar Telefono</button>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="panel-body">
            <ul class="timeline">
                <template v-if="arrayPhoneCall.length == 0">
                    <li>
                        <i class="fa fa-phone bg-blue"></i>
                        <div class="timeline-item">
                            <h5 class="timeline-header" style="font-size: 14px !important;">
                                -
                            </h5>
                        </div>
                    </li>
                </template>
                <template v-else>
                    <template v-for="(phone, index) in arrayPhoneCall">
                        <li>
                            <i class="fa fa-phone bg-blue"></i>
                            <div class="timeline-item">
                                <h5 class="timeline-header" style="font-size: 14px !important;">
                                    @{{ phone }}
                                </h5>
                            </div>
                        </li>
                    </template>
                </template>
                <li>
                    <i class="fa fa-phone bg-gray"></i>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<template v-if="TypeDocument == 'RUC'">
<div class="col-md-6">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h5 class="panel-title pull-left">Personal de Contacto</h5>
            <div class="btn btn-group pull-right" style="padding: 0px 0px;">
                <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#modalPersonal"><i class="fa fa-plus"></i> Agregar Personal</button>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="panel-body">
            <ul class="timeline">
                <template v-if="arrayPersonalContact.length == 0">
                    <li>
                        <i class="fa fa-phone bg-aqua"></i>
                        <div class="timeline-item">
                            <h5 class="timeline-header" style="font-size: 14px !important;">
                                -
                            </h5>
                        </div>
                    </li>
                </template>
                <template v-else>
                    <template v-for="(personal, index) in arrayPersonalContact">
                        <li>
                            <i class="fa fa-phone bg-aqua"></i>
                            <div class="timeline-item">
                                <h5 class="timeline-header" style="font-size: 14px !important;">
                                    @{{ personal }}
                                </h5>
                            </div>
                        </li>
                    </template>
                </template>
            </ul>
        </div>
    </div>
</div>
</template>