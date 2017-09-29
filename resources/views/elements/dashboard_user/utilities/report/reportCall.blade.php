<template v-if="showUser == 1 ||showUser == 2 || showUser == 3">
<div class="col-md-12">
    <div class="panel panel-default">
        <div class="panel-heading">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#inbound" data-toggle="tab">Reporte Llamadas Inbound</a></li>
                <li><a href="#outbound" data-toggle="tab">Reporte Llamadas Outbound</a></li>
            </ul>
        </div>
        <div class="panel-body">
            <div class="tab-content">
                <div class="tab-pane active" id="inbound">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#atendidas" data-toggle="tab"><icon class="glyphicon glyphicon-earphone"></icon> Atendidas</a></li>
                        <li><a href="#transferidas" data-toggle="tab"><icon class="glyphicon glyphicon-random"></icon> Transferidas</a></li>
                        <li><a href="#abandonadas" data-toggle="tab"><icon class="glyphicon glyphicon-alert"></icon> Abandonadas</a></li>
                    </ul>
                    <div class="panel-body">
                        <div class="tab-pane active" id="atendidas">
                            <table id="tablePrueba" class="table table-hover" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Hour</th>
                                    <th>Telephone</th>
                                    <th>Agent</th>
                                    <th>Skill</th>
                                    <th>Duration</th>
                                    <th>Action</th>
                                    <th>Wait Time</th>
                                    <th><i class="fa fa-play" aria-hidden="true"></i> Listen</th>
                                    <th><i class="fa fa-warning" aria-hidden="true"></i> Observación</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>26/09/2017</td>
                                    <td>00:22:22</td>
                                    <td>205</td>
                                    <td>114</td>
                                    <td>Corp_HD_Telefonia_Fija</td>
                                    <td>00:06:25</td>
                                    <td>Colgo Cliente</td>
                                    <td>00:01:07</td>
                                    <td>No Disponible</td>
                                    <td>
                                        <div class="btn-group">
                                            <a class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modalDetalleLlamada"><i class="fa fa-eye"></i> Ver</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>26/09/2017</td>
                                    <td>00:31:30</td>
                                    <td>995588669</td>
                                    <td>115</td>
                                    <td>Corp_HD_Operador</td>
                                    <td>00:02:35</td>
                                    <td>Transferido a 1159</td>
                                    <td>00:00:03</td>
                                    <td>No Disponible</td>
                                    <td>
                                        <div class="btn-group">
                                            <a class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modalDetalleLlamada"><i class="fa fa-eye"></i> Ver</a>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="outbound">
                    <table id="tablePrueba2" class="table table-hover" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Hour</th>
                                <th>Annexed Origin</th>
                                <th>Username</th>
                                <th>Number Destination</th>
                                <th>Call Time</th>
                                <th><i class="fa fa-play" aria-hidden="true"></i> Listen</th>
                                <th><i class="fa fa-warning" aria-hidden="true"></i> Observación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>26/09/2017</td>
                                <td>00:22:22</td>
                                <td>3104</td>
                                <td>114</td>
                                <td>995588669</td>
                                <td>00:01:07</td>
                                <td>No Disponible</td>
                                <td>
                                    <div class="btn-group">
                                        <a class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modalDetalleLlamada"><i class="fa fa-eye"></i> Ver</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>26/09/2017</td>
                                <td>00:31:30</td>
                                <td>3102</td>
                                <td>112</td>
                                <td>205</td>
                                <td>00:00:03</td>
                                <td>No Disponible</td>
                                <td>
                                    <div class="btn-group">
                                        <a class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modalDetalleLlamada"><i class="fa fa-eye"></i> Ver</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>