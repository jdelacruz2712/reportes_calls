/*!
 * Cosapi v1.0 : JQuery Personalizado
 * Copyright 2015
 * Alan Cornejo
 */

/**
 * [dataTables_entrantes Funcion para cargar datos en la tablas de los reportes]
 * @param  {String} nombreDIV [Nombre del div donde esta la tabla para agregar los datos]
 * @param  {String} data      [Nombre del tipo de porte a cargar]
 * @param  {String} route     [Ruta a la cual va a consultar los datos a cargar]
 */


var AdminLTEOptions = {
    sidebarExpandOnHover: true,
    enableBSToppltip: true
};

$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

    var user_id =$('#user_id').val();
    var hour =$('#hour').val();
    var date =$('#date').val();

    MarkAssitance(user_id,date,hour,"Entrada");

    $('#statusAgent').click(function(){
        PanelStatus();
    });

} );

function dataTables_entrantes(nombreDIV, data, route){

    $('#'+nombreDIV).dataTable().fnDestroy();

    $('#'+nombreDIV).DataTable({
        "deferRender"       : true,
        "responsive"        : false,
        "processing"        : true,
        "serverSide"        : true,
        "ajax"              : {
            url     : route,
            type    : 'POST',
            data    : data
        },
        "order"             : [
            [1,"asc"]
        ],
        "paging"            : true,
        "pageLength"        : 100,
        "lengthMenu"        : [100, 200, 300, 400, 500],
        "scrollY"           : "300px",
        "scrollX"           : true,
        "scrollCollapse"    : true,
        "select"            : true,
        "language"          : dataTables_lang_spanish(),
        "columns"           : columns_datatable(route)
    });
}


/**
 * [dataTables_lang_spanish Función que permite colocar el Datable en español]
 */
function dataTables_lang_spanish(){
    var lang = {
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }

    return lang;
}




/**
 * [show_tab_incoming Función que carga Llamadas Entrantes en el reporte]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_incoming (evento){
    dataTables_entrantes('table-incoming', get_data_filters(evento), 'incoming_calls');
}

/**
 * [show_tab_surveys Función que carga los datos de las Encuenstas]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_surveys (evento){
    dataTables_entrantes('table-surveys', get_data_filters(evento), 'surveys');
}

/**
 * [show_tab_consolidated Función que carga los datos del Consolidado]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_consolidated (evento){
    dataTables_entrantes('table-consolidated', get_data_filters(evento), 'consolidated_calls');
}

/**
 * [show_tab_detail_events Función que carga los datos detallados de los Eventos del Agente]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_detail_events (evento){
    dataTables_entrantes('table-detail-events', get_data_filters(evento), 'events_detail');
}

/**
 * [show_tab_outgoing Función que carga los datos de las Llamadas Salientes]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_outgoing (evento){
    dataTables_entrantes('table-outgoing', get_data_filters(evento), 'outgoing_calls');
}

/**
 * [get_data_filters Función que configura datos a enviar en las consultas]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 * @return {Array}         [Devuelve parametros configurados]
 */
function get_data_filters(evento){
    rankHour = 1800;
    if($('select[name=rankHour]').length){
        rankHour = $('select[name=rankHour]').val();
    }

    var data = {
        _token       : $('input[name=_token]').val(),
        fecha_evento : $('input[name=fecha_evento]').val(),
        rank_hour    : rankHour,
        evento       : evento
    };

    return data;
}

/**
 * [exportar description]
 * @param  {[type]} format_export [description]
 * @return {[type]}               [description]
 */
function exportar(format_export) {
    var days = $('#texto').val();
    var event =$('#hidEvent').val()
    export_ajax('POST',event,format_export,days);
}

/**
 * [export_ajax description]
 * @param  {[type]} type          [Define si el envio de datos es por POST o GET]
 * @param  {String} url           [Ruta a la cual se van a solicitar los datos]
 * @param  {String} format_export [Formato en el cual se va a exportar el archivo]
 * @param  {String} days          [Fecha de consulta de datos]
 */
function export_ajax(type, url, format_export='', days=''){

    var dialog = cargar_dialog('primary','Cosapi Data','Cargando el Excel',false);

    var token =  $('input[name=_token]').val();

    $.ajax({
        type        : type,
        url         : url,
        cache       : false,
        data        : {
            _token : token,
            format_export : format_export,
            days : days,
        },

        beforeSend: function(data) {
            dialog.open();
        },
        success: function(data){
            var array_url = data.path;
            for (var i = 0; i <array_url.length; i++) {
                 downloadURL(array_url[i],i);
            }
        },
        complete: function(){
            dialog.close();
        }
    });
}

/**
 * [downloadURL Iframe creado dinamicamente para realizar la descarga de archivos a la hora de exportar]
 * @param  {String} url   [Dirección en donde se encuentra el archivo descargado]
 * @param  {String} index [Indentificador de los frame, para que no tengan el mismo nombre como ID]
 */
function downloadURL(url,index){
    var hiddenIFrameID = 'hiddenDownloader' + index;
    var iframe = document.createElement('iframe');
    iframe.id = hiddenIFrameID;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = url;
}

/**
 * [cargar_dialog Función que muestra ventana emergente indicando que se va a realizar una descargar de algun archivo]
 * @param  {String} new_string [Tipo de ventan emergente a mostrar]
 * @param  {String} title    [Titulo de la ventana emergente]
 * @param  {String} message  [Mensaje que se mostrara en la ventana emergente]
 * @param  {String} closable [Dato que nos indica que si podemos cerrar la ventana]
 * @return {[booleam]}          [description]
 */
function cargar_dialog(new_type,title,message,closable){

    var message = $('<div></div>');
        message.append('<center><b>Porfavor no cerrar la ventana</b></br><img src="../cosapi/img/loading_bar_cicle.gif" /></center>');

    var dialog = new BootstrapDialog({
        size        : BootstrapDialog.SIZE_SMALL,
        type        : 'type-' + new_type,
        title       : title,
        message     : message,
        closable    : closable,

    });

    return dialog;
}

/**
 * [cargar_ajaxDIV Función para cargar los datos en la vista]
 * @param  {String}  type     [Tipo de envío de datos: POST o GET]
 * @param  {String}  url      [Ruta a la cual se consultara los datos]
 * @param  {String}  nameDiv  [El nombre del Div en el cual se cargaran los datos]
 * @param  {String}  msjError [Texto qu se mostrar si ocurre algún tipo de error a la hora de cargar los datos]
 * @param  {Boolean} before   [Datos que nos dira si se ebe mostrar la imagen de cargando]
 */
function cargar_ajaxDIV(type,url,nameDiv,msjError, before = false){

    
    var image_loading = '<div class="loading" id="loading"><li></li><li></li><li></li><li></li><li></li></div>';

    $.ajax({
        type        : type,
        url         : url,
        cache       : false,
        dataType    : 'HTML',
        beforeSend: function() {
            if(before == true){
                $('#'+nameDiv).html(image_loading);
            }
        },
        success: function(data){
            $("#loading").hide();
            $('#'+nameDiv).html(data);
        },
        error: function(data){
            $('#'+nameDiv).html(msjError);
        }
    });
}

/**
 * [detalle_agentes_dashboard_01 Función que refresca la información del estado de los agentes del Dashboard1]
 */
function detalle_agentes_dashboard_01(){
    cargar_ajaxDIV('GET', 'dashboard_01/detail_agents', 'detail_agents', 'Problema para actualizar el detalle de agentes');
    setTimeout('detalle_agentes_dashboard_01()', 6000);
}

/**
 * [detalle_kpi_dashboard_01 Función que carga los KPI del Dashboard1]
 */
function detalle_kpi_dashboard_01(){
    cargar_ajaxDIV('GET', 'dashboard_01/detail_kpi', 'detail_kpi', 'Problema para actualizar el KPI de agentes');
    setTimeout('detalle_kpi_dashboard_01()', 6000);
}

/**
 * [detail_encoladas_dashboard_01 Función que carga datos de las llamadas en cola del Dashboard1]
 */
function detail_encoladas_dashboard_01(){
    cargar_ajaxDIV('GET', 'dashboard_01/detail_encoladas', 'detail_encoladas', 'Problema para actualizar el panel de encoladas');
    setTimeout('detail_encoladas_dashboard_01()', 1500);
}

function total_encoladas_dashboard_01(){
    cargar_ajaxDIV('GET', 'dashboard_01/total_encoladas', 'total_encoladas', 'Problema para actualizar el panel de encoladas');
    setTimeout('total_encoladas_dashboard_01()', 1500);
}

/**
 * [refresh_information Función que refresca la información del dahsboard 2]
 * @param  {String} evento [Tipo de reporte a visualizar: day, week, mounth]
 */
function refresh_information (evento){
    BootstrapDialog.confirm('¿Está seguro que quieres actualizar los datos del monitor?', function(result){
        if(result) {
            $('#hidReporttype').val(evento);
            detalle_kpi_dashboard_02(evento);
        }else{
            $( '#ulOptions li' ).removeClass( 'active' );
            var idevento = $('#hidReporttype').val();
            $( '#'+idevento ).addClass( 'active' );
        }
    });
}

/**
 * [detalle_kpi_dashboard_02 Función que carga los ddatos del KPI ubicados en el Dashboard2]
 * @param  {string} evento [Tipo de reporte que se quiere cargar: day, week, mounth]
 * @return {[view]}          [Vista con los datos dl reporte]
 */
function detalle_kpi_dashboard_02(evento){
    
    return cargar_ajaxDIV('GET', 'dashboard_02/detail_kpi/'+evento, 'detail_kpi', 'Problema para actualizar el KPI de agentes',true);
}

/**
 * [create_sound_bite Función que reproduce el audio para llamadas en cola]
 * @param  {String} sound [Ruta donde se encuentra ubicado nuestro audio]
 */
function create_sound_bite(sound){
    var html5_audiotypes={
        "mp3": "audio/mpeg",
        "mp4": "audio/mp4",
        "ogg": "audio/ogg",
        "wav": "audio/wav"
    }

    var html5audio=document.createElement('audio')
    if (html5audio.canPlayType){ //Comprobar soporte para audio HTML5
        for (var i=0; i<arguments.length; i++){
            var sourceel=document.createElement('source')
            sourceel.setAttribute('src', arguments[i])
            if (arguments[i].match(/.(w+)$/i))
                sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
            html5audio.appendChild(sourceel)
        }
        html5audio.load()
        html5audio.playclip=function(){
            html5audio.pause()
            html5audio.currentTime=0
            html5audio.play()
        }
        return html5audio
    }
    else{
        return {playclip:function(){throw new Error('Su navegador no soporta audio HTML5')}}
    }
}

/**
 * [validar_sonido Funcion que valida la cantidad de llamadas en cola par activar el sonido del monitor]
 */
function validar_sonido(){

    var click2      = create_sound_bite('/cosapi/sonidos/alerta_principal.mp3');
    var encoladas   = $('#count_encoladas').text();

    if (encoladas >= 2){
        click2.playclip();
    }

    setTimeout('validar_sonido()', 4000);
}

function ajaxNodeJs(parameters, ruta, notificacion){

    mySocket.get(ruta,parameters, (resData, jwRes) => {
        console.log(jwRes);
        console.log(resData);
        if(resData['Response'] == 'success'){
            //Cierra todos los modals abiertos
            //Actualmente se usa para el cambio de Estados del Agente
            if(notificacion == true){
                mostrar_notificacion('success', 'El evento se realizo exitosamente!!!','Success');
            }else{
                BootstrapDialog.show({
                    type      : 'type-danger',
                    title     : 'Cosapi Dara S.A.' ,
                    message   : 'El evento se realizo exitosamente!!!' ,
                    closable  : false,

                    buttons: [{
                        label     : 'Salir',
                        cssClass  : 'btn-danger',
                        action: function(dialogRef){
                            dialogRef.close();
                            location.href="logout";
                        }
                    }]
                });
            }
        }else{
            $.each(BootstrapDialog.dialogs, function(id, dialog){
                dialog.close();
            });
            mostrar_notificacion('error', resData['Message'],'Error');
        }
    });
}

function PanelStatus(){
    $.ajax({
        type: 'GET',
        url : 'list_event',
        cache       : false,
        dataType    : 'HTML',
        success: function(data){
            BootstrapDialog.show({
                type      : 'type-primary',
                title     : 'Estados del Agente' ,
                message   : data ,
                buttons: [
                    {
                        label     : 'Cancelar',
                        cssClass  : 'btn-danger',
                        action: function(dialogRef){
                            dialogRef.close();
                        }
                    }
                ]
            });
        }
    });
}

function MarkAssitance(user_id,day,hour_actually,action){
    var token =  $('input[name=_token]').val();

    $.ajax({
        type        : 'POST',
        url         : 'assistance',
        data        :{
            _token      : token,
        },
        success     : function(data){
            var result = data.split('&');
            if(result[0] == 'true'){
                modalAssintance(user_id,day,hour_actually,action);
            }else if(result[0] == 'stand_by'){
                ModalStandBy(result[1]);
            }
        }
    })
}

function modalAssintance(user_id,day,hour_actually,action){
    rank_hours = rango_de_horas(hour_actually);
    title     = 'Cosapi Data S.A.';
    message   = 'Por favor de seleccionar la hora correspondiente a su ' + action + '.'+
        '<br><br>'+
        '<div class="row">'+
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour" value="'+rank_hours[1]+'">'+rank_hours[1]+'</center></div>'+
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour_after" value="'+rank_hours[2]+'">'+rank_hours[2]+'</center></div>'+
        '</div>';

    BootstrapDialog.show({
        type      : 'type-primary',
        title     : title ,
        message   : message ,
        closable  : false,
        buttons: [
            {
                label     : 'Aceptar',
                cssClass  : 'btn-primary',
                action: function(dialogRef){
                    if(typeof  $('input:radio[name=rbtnHour]:checked').val() == 'undefined'){
                        alert('Porfavor de seleccionar una hora.');
                    }else{
                        dialogRef.close();
                        hour_new    = $('input:radio[name=rbtnHour]:checked').val().trim();
                        user_id     = user_id;
                        var parameters = {
                            new_date_event  : day+' '+hour_new,
                            user_id         : user_id
                        };
                        ajaxNodeJs(parameters,'/detalle_eventos/register_assistence',true);

                        if(hour_new >= rank_hours[1]){
                            console.log(hour_new);

                            ModalStandBy(hour_new);
                        }
                    }
                }
            }
        ]
    });
}


function ModalStandBy(hour_new){
    var present_hour    = $('#hour').val();
    console.log(present_hour);
    var text_hour       = restarHoras(present_hour,hour_new);
    var message = 'Bienvenido, para su entrada faltan :'+
        '<br>'+
        '<center><h1 id="prueba">'+text_hour+'</h1></center>';
    BootstrapDialog.show({
        type      : 'type-primary',
        title     : 'Cosapi Data S.A.' ,
        message   : message ,
        closable  : false
    });
    CloseStandBy(hour_new);
}

function CloseStandBy(hour_new){
    var present_hour    = $('#hour').val();
    if( present_hour >= hour_new){
        $.each(BootstrapDialog.dialogs, function(id, dialog){
            dialog.close();
        });
    }else {
        var text_hour       = restarHoras(present_hour,hour_new);
        $('#prueba').text(text_hour);
        setTimeout('CloseStandBy("'+hour_new+'")', 1000);
    }
}


//Funcion que genera el rango de horas para la marcacion de salida del agente
function rango_de_horas(hour_actually){
    array_complete = hour_actually.split(':');
    second_before  = '00';
    second_after   = '00';
    if(array_complete[1] >= 30){
        if(array_complete[0] != 23){
            minuto_before = '30';
            minuto_after  = '00';
            hour_after    = ceroIzquierda(parseInt(array_complete[0])+1);
        }else{
            minuto_before = '30';
            minuto_after  = '59';
            second_after  = '59';
            hour_after    = '23';
        }
    }else{
        minuto_before = '00';
        minuto_after  = '30';
        hour_after    = ceroIzquierda(parseInt(array_complete[0]));
    }

    before_hour = (array_complete[0]+':'+minuto_before+':'+second_before).trim();
    hour        = hour_actually.trim();
    after_hour  = (hour_after+':'+minuto_after+':'+second_after).trim();

    return [before_hour,hour,after_hour];
}

//Funcion que completa con cero a la izquierda una variable
function ceroIzquierda(numero){
    if (numero <= 9){
        numero = '0'+numero;
    }

    return numero;
}
function ModificarEstado(event_id,user_id,ip,name){
    var columns = {
        event_id        : event_id,
        user_id         : user_id,
        anexo           : 281,
        ip              : ip,
        type_action     : 'update'
    };

    $.each(BootstrapDialog.dialogs, function(id, dialog){
        dialog.close();
    });

    ajaxNodeJs(columns,'/detalle_eventos/change_status',true);
}

function mostrar_notificacion(type, mensaje, titulo) {

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "800",
        "timeOut": "2000",
        "extendedTimeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    Command: toastr[type](mensaje, titulo)
}

//Muestra la hora actual del sistema cada 1 segundo
function hora_actual(hora, minuto, segundo) {
    segundo = segundo + 1;
    if (segundo == 60) {
        minuto = minuto + 1;
        segundo = 0;
        if (minuto == 60) {
            minuto = 0;
            hora = hora + 1;
            if (hora == 24) {
                hora = 0;
            }
        }
    }

    str_hora        = new String(hora);
    str_minuto      = new String(minuto);
    str_segundo     = new String(segundo);

    if (str_hora.length == 1) {
        hora = '0' + hora ;
    }
    if (str_minuto.length == 1) {
        minuto = '0' + minuto;
    }
    if (str_segundo.length == 1) {
        segundo = '0' + segundo;
    }

    var hora_actual = '<span class="glyphicon glyphicon-time"></span> ' + hora + ':' + minuto + ':' + segundo;
    var present_hour = '<input type="hidden" value="' + hora + ':' + minuto + ':' + segundo+'" id="hour"/>';
    document.getElementById('hora_actual').innerHTML = hora_actual;
    document.getElementById('present_hour').innerHTML = present_hour;

    setTimeout("hora_actual(" + hora + ", " + minuto + ", " + segundo + ")", 1000);
}

//Muestra la fecha actual en la cabecera del sistema.
function fecha_actual(dia, mes, diaw) {

    var fecha_actual = '<span class="glyphicon glyphicon-calendar"></span> ' + nombre_dia(diaw) + ' ' + dia + ' de ' + nombre_mes(mes);
    document.getElementById('fecha_actual').innerHTML = fecha_actual;

}

//Funcion que retorna nombre del mes, en base al número enviado
function nombre_mes(mes) {
    var nombre_mes;
    switch (mes) {
        case 1  :
            nombre_mes = 'Ene';
            break;
        case 2  :
            nombre_mes = 'Feb';
            break;
        case 3  :
            nombre_mes = 'Mar';
            break;
        case 4  :
            nombre_mes = 'Abr';
            break;
        case 5  :
            nombre_mes = 'May';
            break;
        case 6  :
            nombre_mes = 'Jun';
            break;
        case 7  :
            nombre_mes = 'Jul';
            break;
        case 8  :
            nombre_mes = 'Ago';
            break;
        case 9  :
            nombre_mes = 'Sep';
            break;
        case 10  :
            nombre_mes = 'Oct';
            break;
        case 11 :
            nombre_mes = 'Nov';
            break;
        case 12 :
            nombre_mes = 'Dic';
            break;
    }
    return  nombre_mes;
}

//Funcion que retorna nombre del día, en base al número enviado
function nombre_dia(dia) {
    console.log(dia);
    var nombre_dia;
    switch (dia) {
        case 0  :
            nombre_dia = 'Dom';
            break;
        case 1  :
            nombre_dia = 'Lun';
            break;
        case 2  :
            nombre_dia = 'Mar';
            break;
        case 3  :
            nombre_dia = 'Mie';
            break;
        case 4  :
            nombre_dia = 'Jue';
            break;
        case 5  :
            nombre_dia = 'Vie';
            break;
        case 6  :
            nombre_dia = 'Sab';
            break;
    }
    return  nombre_dia;
}

function restarHoras(inicio,fin) {
    inicio                      = inicio.split(':');
    fin                         = fin.split(':');

    var inicioHoras             = parseInt(inicio[0])*3600;
    var inicioMinutos           = parseInt(inicio[1])*60
    var inicioSegundos          = parseInt(inicio[2]);
    var iniciototal             = inicioHoras+inicioMinutos+inicioSegundos;

    var finHoras                = parseInt(fin[0])*3600;
    var finMinutos              = parseInt(fin[1])*60;
    var finSegundos             = parseInt(fin[2]);
    var fintotal                = finHoras+finMinutos+finSegundos;

    var diferenciatotal         = fintotal - iniciototal;

    var diferenciaHoras         = parseInt(diferenciatotal/3600);
    var diferenciaMinutos       = parseInt((diferenciatotal-(diferenciaHoras*3600))/60);
    var diferenciaSegundos      = parseInt(diferenciatotal-((diferenciaHoras*3600)+(diferenciaMinutos*60)));

    return ceroIzquierda(diferenciaHoras)+':'+ceroIzquierda(diferenciaMinutos)+':'+ceroIzquierda(diferenciaSegundos);

}

//Funcion que permite la desconeccion del agente del sistema
function marcar_salida_agente(){
    rank_hours = [];
    var hour =$('#hour').val();
    rank_hours   = rango_de_horas(hour.trim());
    message_1     = 'Usted se retira de las oficinas ?';
    message_2     = 'Por favor de seleccionar la hora correspondiente a su Salida.' +
        '<br><br>'+
        '<div class="row">'+
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour" value="'+hour+'">'+hour+'</center></div>'+
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour_after" value="'+rank_hours[2]+'">'+rank_hours[2]+'</center></div>'+
        '</div>';

    BootstrapDialog.show({
        type      : 'type-primary',
        title     : 'Registrar Salida' ,
        message   : message_1 ,
        closable  : false,
        buttons: [
            {
                label     : 'Si',
                cssClass  : 'btn-primary',
                action: function(dialogRef){
                    dialogRef.close();
                    //Registro de Salida
                    BootstrapDialog.show({
                        type      : 'type-danger',
                        title     : 'Registrar Salida' ,
                        message   : message_2 ,
                        closable  : false,
                        buttons: [
                            {
                                label     : 'Aceptar',
                                cssClass  : 'btn-danger',
                                action: function(dialogRef){
                                    hour_exit = hour.trim();
                                    if(typeof  $('input:radio[name=rbtnHour]:checked').val() == 'undefined'){
                                        alert('Porfavor de seleccionar su hora de salida.');
                                    }else{
                                        dialogRef.close();
                                        hour_exit = $('input:radio[name=rbtnHour]:checked').val().trim();
                                        desconnect_agent(hour_exit);
                                    }
                                }
                            },
                            {
                                label     : 'Cancelar',
                                cssClass  : 'btn-danger',
                                action: function(dialogRef){
                                    dialogRef.close();
                                }
                            }
                        ]
                    });
                }
            },
            {
                label     : 'No',
                cssClass  : 'btn-primary',
                action: function(dialogRef){
                    dialogRef.close();
                    desconnect_agent(hour.trim());
                }
            },
            {
                label     : 'Cancelar',
                cssClass  : 'btn-danger',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }
        ]
    });

}


/**
 * [Funcion para la desconeccion del agente sin marcar su hora salida]
 * @param hour_exit
 */
function desconnect_agent(hour_exit){
    var user_id = $('#user_id').val();
    var ip      = $('#ip').val();
    var date    = $('#date').val();
    var parameters = {
        user_id     : user_id,
        hour_exit   : date+' '+hour_exit,
        anexo       : 281,
        event_id    : 15,
        ip          : ip,
        type_action : 'disconnect'
    };
    console.log(parameters);
    ajaxNodeJs(parameters,'/detalle_eventos/change_status',false);
}

function liberar_anexos(){
    var user_id = $('#user_id').val();
    var parameters = {
        user_id     : user_id,
        type_action : 'release'
    };
    ajaxNodeJs(parameters,'/anexos/set_anexo',true);
}

function assignAnexxed(anexo_name){
    var user_id = $('#user_id').val();
    var parameters = {
        user_id     : user_id,
        anexo       : anexo_name
    };
    ajaxNodeJs(parameters,'/anexos/set_anexo',true);
}