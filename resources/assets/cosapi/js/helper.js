'use strict';

/*!
 * Cosapi v1.0 : JQuery Personalizado
 * Copyright 2015
 * Alan Cornejo
 */
/**
 * [dataTables Funcion para cargar datos en la tablas de los reportes]
 * @param  {String} nombreDIV [Nombre del div donde esta la tabla para agregar los datos]
 * @param  {String} data      [Nombre del tipo de porte a cargar]
 * @param  {String} route     [Ruta a la cual va a consultar los datos a cargar]
 */
var AdminLTEOptions = {
  sidebarExpandOnHover: true,
  enableBSToppltip: true
}

$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
    }
  })

  var user_id = $('#user_id').val()
  var hour = $('#hour').val()
  var date = $('#date').val()
  var anexo = $('#anexo').text()
  if($('#assistence_user')){
    let assistence_user = $('#assistence_user').val().split('&')
    if(assistence_user[0] == 'true'){
      MarkAssitance(user_id, date, hour, 'Entrada', assistence_user)
    }else{
      checkPassword()
    }
  }


  if (anexo === 'Sin Anexo') loadModule('agents_annexed')
  $('#statusAgent').click(function () {
    PanelStatus()
  })

  $('.reportes').on('click', function (e) {
    loadModule($(this).attr('id'))
  })

  //Modificacion del Rol a User para los agentes de BackOffice
  $('#activate_calls').click(function(){
    let message = '<h4>¿Usted desea poder recibir llamadas?</h4>' +
                  '<br>' +
                  '<p><b>Nota : </b>Cuando active la entrada de llamadas pasara a un estado de "ACD", porfavor de leer las ' +
                  'notificaiones para saber que el cambio se realizo exitosamente. En caso de que no le entren llamadas por favor' +
                  'de verificar que se le han asignado a las colas correctamente.</p>'
    BootstrapDialog.show({
      type: 'type-primary',
      title: 'Activar Llamadas',
      message: message,
      closable: true,
      buttons: [
        {
          label: '<i class="fa fa-check" aria-hidden="true"></i> Si',
          cssClass: 'btn-success',
          action: function (dialogRef) {
            activeCalls('user')
          }
        },
        {
          label: '<i class="fa fa-times" aria-hidden="true"></i> No',
          cssClass: 'btn-danger',
          action: function (dialogRef) {
            activeCalls('backoffice')
          }
        },
          {
            label: '<i class="fa fa-sign-out" aria-hidden="true"></i> Cancelar',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
            dialogRef.close()
          }
        }
      ]
    })
  })
})
function activeCalls(nameRole, userId = ''){
  let queueAdd = $('#queueAdd').val()
  let anexo = $('#anexo').text()
  let username = $('#user_name').val()
  let ip = $('#ip').val()
  let user_role = $('#user_role').text()

  userId = (userId === '')? $('#user_id').val() : userId

  $.ajax({
    type: 'POST',
    url: 'modifyRole',
    data: {
      _token: $('input[name=_token]').val(),
      nameRole: nameRole,
      userId: userId
    },
    success: function (data) {
      if (data == 1) {
        if(userId === $('#user_id').val()){
          $('#UserNameRole').text(nameRole.charAt(0).toUpperCase() + nameRole.slice(1))
          $('#user_role').val(nameRole)
        }

        $.each(BootstrapDialog.dialogs, function (id, dialog) {
          dialog.close()
        })
        mostrar_notificacion('success', 'El cambio de rol se realizo exitosamente !!!', 'Success', 5000, false, true)

        //Tiene un anexo asignado
        if(queueAdd === 'true' && userId === $('#user_id').val()){
          userId = $('#user_id').val()
          mostrar_notificacion('info', 'Se procedera a realizar la conexion al asterisk', 'Info', 5000, false, true)
          //Se encuentra agregado a colas
          parameters = {
            user_id : userId,
            number_annexed: anexo,
            username: username,
            type_action: 'release',
            event_id : 11,
            event_name : 'Login',
            ip : ip
          }
          ajaxNodeJs(parameters, '/anexos/liberarAnexo', true, 2000)
          loadModule('agents_annexed')
        }else{
          //No se encuentra en ninguna cola
          if(anexo != 'Sin Anexo' && userId === $('#user_id').val()){
            parameters = {
              user_id : userId,
              type_action: 'release',
              event_id : 11,
              event_name : 'Login',
              ip : ip
            }
            ajaxNodeJs(parameters, '/anexos/liberarAnexo', true, 2000)
            loadModule('agents_annexed')
          }
        }
      } else {
        mostrar_notificacion('error', 'Problemas de inserción a la base de datos', 'Error', 10000, false, true)
      }
    }
  })
}
function loadModule (idOptionMenu) {
  var url = idOptionMenu

  $.ajax({
    type: 'POST',
    url: url,
    data: {
      _token: $('input[name=_token]').val(),
      url: url
    },
    beforeSend: function (data) {
      let divLoading = '<div class="loading" id="loading" style="display: inline;"><li></li><li></li><li></li><li></li><li></li></div>'
      $('#container').html(divLoading)
    },
    success: function (data) {
      $('#container').html(data)
      $('#urlsistema a').remove()
      $('#urlsistema').append('<a href="#" id="' + url + '" class="reportes">' + $('#' + url).text() + '</a>')
    },
    error: function (data) {
      $('#container').html('problemas para actualizar')
    },
    complete: function () {
      $('#loading').hide()
    }
  })
}

function dataTables (nombreDIV, data, route) {
  $('#' + nombreDIV).dataTable().fnDestroy()

  $('#' + nombreDIV).DataTable({
    'deferRender': true,
    'responsive': false,
    'processing': true,
    'serverSide': true,
    'ajax': {
      url: route,
      type: 'POST',
      data: data
    },
    'order': [
            [1, 'asc']
    ],
    'paging': true,
    'pageLength': 100,
    'lengthMenu': [100, 200, 300, 400, 500],
    'scrollY': '300px',
    'scrollX': true,
    'scrollCollapse': true,
    'select': true,
    'language': dataTables_lang_spanish(),
    'columns': columnsDatatable(route)
  })
}

/**
 * [dataTables_lang_spanish Función que permite colocar el Datable en español]
 */
function dataTables_lang_spanish () {
  var lang = {
    'sProcessing': 'Procesando...',
    'sLengthMenu': 'Mostrar _MENU_ registros',
    'sZeroRecords': 'No se encontraron resultados',
    'sEmptyTable': 'Ningún dato disponible en esta tabla',
    'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
    'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
    'sInfoPostFix': '',
    'sSearch': 'Buscar:',
    'sUrl': '',
    'sInfoThousands': ',',
    'sLoadingRecords': 'Cargando...',
    'oPaginate': {
      'sFirst': 'Primero',
      'sLast': 'Último',
      'sNext': 'Siguiente',
      'sPrevious': 'Anterior'
    },
    'oAria': {
      'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
      'sSortDescending': ': Activar para ordenar la columna de manera descendente'
    }
  }

  return lang
}

/**
 * [show_tab_incoming Función que carga Llamadas Entrantes en el reporte]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_incoming (evento) {
  dataTables('table-incoming', get_data_filters(evento), 'incoming_calls')
}

/**
 * [show_tab_surveys Función que carga los datos de las Encuenstas]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_surveys (evento) {
  dataTables('table-surveys', get_data_filters(evento), 'surveys')
}

/**
 * [show_tab_consolidated Función que carga los datos del Consolidado]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_consolidated (evento) {
  dataTables('table-consolidated', get_data_filters(evento), 'consolidated_calls')
}

/**
 * [show_tab_detail_events Función que carga los datos detallados de los Eventos del Agente]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_detail_events (evento) {
  dataTables('table-detail-events', get_data_filters(evento), 'events_detail')
}

/**
 * [show_tab_detail_events Función que carga los datos detallados de los Eventos del Agente]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_level_occupation (evento) {
  dataTables('table-level-occupation', get_data_filters(evento), 'level_of_occupation')
}

/**
 * [show_tab_angetOnline Función que carga los datos de los agentes online]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_agentOnline (evento) {
  dataTables('table-agentOnline', get_data_filters(evento), 'agents_online')
}

/**
 * [show_tab_outgoing Función que carga los datos de las Llamadas Salientes]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_outgoing (evento) {
  dataTables('table-outgoing', get_data_filters(evento), 'outgoing_calls')
}

let show_tab_annexed = (event) => {
  let token = $('input[name=_token]').val()
  let imageLoading = `<div class="loading" id="loading"><li></li><li></li><li></li><li></li><li></li></div>`
  $.ajax({
    type: 'POST',
    url: 'agents_annexed/list_annexed',
    cache: false,
    data: {
      _token : token,
      event : event
    },
    beforeSend : () => {
      $('#divListAnnexed').html(imageLoading)
    },
    success: (data) =>{
      $('#divListAnnexed').html(data)
    }
  })
}

/**
 * [show_tab_list_user Función que carga los datos detallados de los usuarios]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 */
function show_tab_list_user (evento) {
  dataTables('table-list-user', get_data_filters(evento), 'list_users')
}

/**
 * [get_data_filters Función que configura datos a enviar en las consultas]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 * @return {Array}         [Devuelve parametros configurados]
 */
function get_data_filters (evento) {
  let rankHour = 1800
  if ($('select[name=rankHour]').length) {
    rankHour = $('select[name=rankHour]').val()
  }

  var data = {
    _token: $('input[name=_token]').val(),
    fecha_evento: $('input[name=fecha_evento]').val(),
    rank_hour: rankHour,
    evento: evento
  }

  return data
}

/**
 * [exportar description]
 * @param  {[type]} format_export [description]
 * @return {[type]}               [description]
 */
function exportar (format_export) {
  var days      = $('#texto').val()
  var event     = $('#hidEvent').val()
  let rankHour  = 1800
  if($('#rankHour').length >0 ){
    rankHour = $('#rankHour').val()
  }
  export_ajax('POST', event, format_export, days,rankHour)
}

/**
 * [export_ajax description]
 * @param  {[type]} type          [Define si el envio de datos es por POST o GET]
 * @param  {String} url           [Ruta a la cual se van a solicitar los datos]
 * @param  {String} format_export [Formato en el cual se va a exportar el archivo]
 * @param  {String} days          [Fecha de consulta de datos]
 */
function export_ajax (type, url, format_export = '', days = '',rankHour = 1800) {
  var dialog = cargar_dialog('primary', 'Download', 'Cargando el Excel', false)

  var token = $('input[name=_token]').val()

  $.ajax({
    type: type,
    url: url,
    cache: false,
    data: {
      _token          : token,
      format_export   : format_export,
      days            : days,
      rank_hour       : rankHour
    },

    beforeSend: function (data) {
      dialog.open()
    },
    success: function (data) {
      var array_url = data.path
      for (var i = 0; i < array_url.length; i++) {
        downloadURL(array_url[i], i)
      }
    },
    complete: function () {
      dialog.close()
    }
  })
}

/**
 * [downloadURL Iframe creado dinamicamente para realizar la descarga de archivos a la hora de exportar]
 * @param  {String} url   [Dirección en donde se encuentra el archivo descargado]
 * @param  {String} index [Indentificador de los frame, para que no tengan el mismo nombre como ID]
 */
function downloadURL (url, index) {
  var hiddenIFrameID = 'hiddenDownloader' + index
  var iframe = document.createElement('iframe')
  iframe.id = hiddenIFrameID
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframe.src = url
}

/**
 * [cargar_dialog Función que muestra ventana emergente indicando que se va a realizar una descargar de algun archivo]
 * @param  {String} new_string [Tipo de ventan emergente a mostrar]
 * @param  {String} title    [Titulo de la ventana emergente]
 * @param  {String} message  [Mensaje que se mostrara en la ventana emergente]
 * @param  {String} closable [Dato que nos indica que si podemos cerrar la ventana]
 * @return {[booleam]}          [description]
 */
function cargar_dialog (new_type, title, message, closable) {
  var message = $('<div></div>')
  message.append('<center><b>Porfavor no cerrar la ventana</b></br><img src="../img/loading_bar_cicle.gif" /></center>')

  var dialog = new BootstrapDialog({
    size: BootstrapDialog.SIZE_SMALL,
    type: 'type-' + new_type,
    title: title,
    message: message,
    closable: closable

  })

  return dialog
}

/**
 * [cargar_ajaxDIV Función para cargar los datos en la vista]
 * @param  {String}  type     [Tipo de envío de datos: POST o GET]
 * @param  {String}  url      [Ruta a la cual se consultara los datos]
 * @param  {String}  nameDiv  [El nombre del Div en el cual se cargaran los datos]
 * @param  {String}  msjError [Texto qu se mostrar si ocurre algún tipo de error a la hora de cargar los datos]
 * @param  {Boolean} before   [Datos que nos dira si se ebe mostrar la imagen de cargando]
 */
function cargar_ajaxDIV (type, url, nameDiv, msjError, before = false) {
  var image_loading = '<div class="loading" id="loading"><li></li><li></li><li></li><li></li><li></li></div>'

  $.ajax({
    type: type,
    url: url,
    cache: false,
    dataType: 'HTML',
    beforeSend: function () {
      if (before == true) {
        $('#' + nameDiv).html(image_loading)
      }
    },
    success: function (data) {
      $('#loading').hide()
      $('#' + nameDiv).html(data)
    },
    error: function (data) {
      $('#' + nameDiv).html(msjError)
    }
  })
}

/**
 * [refresh_information Función que refresca la información del dahsboard 2]
 * @param  {String} evento [Tipo de reporte a visualizar: day, week, mounth]
 */
function refresh_information (evento) {
  BootstrapDialog.confirm('¿Está seguro que quieres actualizar los datos del monitor?', function (result) {
    if (result) {
      $('#hidReporttype').val(evento)
      detalle_kpi_dashboard_02(evento)
    } else {
      $('#ulOptions li').removeClass('active')
      var idevento = $('#hidReporttype').val()
      $('#' + idevento).addClass('active')
    }
  })
}

/**
 * [detalle_kpi_dashboard_02 Función que carga los ddatos del KPI ubicados en el Dashboard2]
 * @param  {string} evento [Tipo de reporte que se quiere cargar: day, week, mounth]
 * @return {[view]}          [Vista con los datos dl reporte]
 */
function detalle_kpi_dashboard_02 (evento) {
  return cargar_ajaxDIV('GET', 'dashboard_02/detail_kpi/' + evento, 'detail_kpi', 'Problema para actualizar el KPI de agentes', true)
}

/**
 * [create_sound_bite Función que reproduce el audio para llamadas en cola]
 * @param  {String} sound [Ruta donde se encuentra ubicado nuestro audio]
 */
function create_sound_bite (sound) {
  var html5_audiotypes = {
    'mp3': 'audio/mpeg',
    'mp4': 'audio/mp4',
    'ogg': 'audio/ogg',
    'wav': 'audio/wav'
  }

  var html5audio = document.createElement('audio')
  if (html5audio.canPlayType) { // Comprobar soporte para audio HTML5
    for (var i = 0; i < arguments.length; i++) {
      var sourceel = document.createElement('source')
      sourceel.setAttribute('src', arguments[i])
      if (arguments[i].match(/.(w+)$/i)) {
        sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
      }
      html5audio.appendChild(sourceel)
    }
    html5audio.load()
    html5audio.playclip = function () {
      html5audio.pause()
      html5audio.currentTime = 0
      html5audio.play()
    }
    return html5audio
  } else {
    return {playclip: function () { throw new Error('Su navegador no soporta audio HTML5') }}
  }
}

/**
 * [validar_sonido Funcion que valida la cantidad de llamadas en cola par activar el sonido del monitor]
 */
function validar_sonido () {
  var click2 = create_sound_bite('/cosapi/sonidos/alerta_principal.mp3')
  var encoladas = $('#count_encoladas').text()

  if (encoladas >= 2) {
    click2.playclip()
  }

  setTimeout('validar_sonido()', 4000)
}

function ajaxNodeJs (parameters, ruta, notificacion, time) {
  if(ruta != '/detalle_eventos/getstatus'){
    $('#myModalLoading').modal('show')
  }
  socketSails.get(ruta, parameters, function (resData, jwRes) {
    $('#myModalLoading').modal('hide')
    mostrar_notificacion(resData['Response'], resData['Message'], resData['Response'].charAt(0).toUpperCase() + resData['Response'].slice(1), time, false, true, 2000)
    if(resData['DataQueue'] != null){
      let arrayMessage = resData['DataQueue']
      let messageSuccess = ''
      let messageError = ''
      let messageWarning = ''
      for (let posicion = 0; posicion < arrayMessage.length; posicion++) {
        if (arrayMessage[posicion]['Response'] == 'Success') {
          messageSuccess = messageSuccess + arrayMessage[posicion]['Message']
          if (posicion != ((arrayMessage.length) - 1)) {
            messageSuccess = messageSuccess + '<br>'
          }
        }else if (arrayMessage[posicion]['Response'] == 'Warning') {
          messageWarning = messageWarning + arrayMessage[posicion]['Message']
          if (posicion != ((arrayMessage.length) - 1)) {
            messageWarning = messageWarning + '<br>'
          }
        } else {
          messageError = messageError + arrayMessage[posicion]['Message']
          if (posicion != ((arrayMessage.length) - 1)) {
            messageError = messageError + '<br>'
          }
        }
      }

      if (messageSuccess != '') {
        mostrar_notificacion('success', messageSuccess, 'Success', time, false, true, 2000)
        if (parameters['type_action'] == 'update') {
          setQueueAdd('true')
        }

        if (parameters['type_action'] == 'release') {
          $('#anexo').text('Sin Anexo')
          setQueueAdd('false')
        }
      }

      if (messageError != '') {
        mostrar_notificacion('error', messageError, 'Error', 0, false, true, 0)
      }

      if (messageWarning != '') {
        mostrar_notificacion('warning', messageWarning, 'Warning', 0, false, true, 0)
      }

      if (parameters['type_action'] == 'disconnect') {
        setTimeout('eventLogout()', 4000)
      }
    }

    if(resData['Response'] == 'success'){
      if (parameters['type_action'] == 'release') {
        $('#anexo').text('Sin Anexo')
        vueFront.anexo = ''
        setQueueAdd('false')
      }else{
        if (parameters['anexo']) {
          $('#anexo').text(parameters['anexo'])
        }

        if (parameters['number_annexed']) {
          vueFront.anexo = parameters['number_annexed']
          socketAsterisk.emit('updateAnexo',{anexo: vueFront.anexo, username: $('#user_name').val()})
          $('#anexo').text(parameters['number_annexed'])
        }
      }

      if (parameters['type_action'] == 'disconnect') {
        setTimeout('eventLogout()', 4000)
      }
    }
  })
}

function setQueueAdd(queueAdd){
  let token = $('input[name=_token]').val()
  $.ajax({
    type: 'POST',
    url: 'setQueueAdd',
    data: {
      _token: token,
      QueueAdd: queueAdd
    },
    success: function (data) {
      $('#queueAdd').val(data)
    }
  })
}

function eventLogout(){
    location.href = 'logout'
}

function PanelStatus () {
  $.ajax({
    type: 'GET',
    url: 'list_event',
    cache: false,
    dataType: 'HTML',
    success: function (data) {
      BootstrapDialog.show({
        type: 'type-primary',
        title: 'Estados del Agente',
        message: data,
        buttons: [
          {
            label: 'Cancelar',
            cssClass: 'btn-danger',
            action: function (dialogRef) {
              dialogRef.close()
            }
          }
        ]
      })
    }
  })
}

function MarkAssitance (user_id, day, hour_actually, action, result) {
  if (result[0] == 'true') {
    modalAssintance(user_id, day, hour_actually, action)
  } else if (result[0] == 'stand_by') {
    ModalStandBy(result[1])
  } else {
    checkPassword()
  }

}

function modalAssintance (user_id, day, hour_actually, action) {
  let rankHours = rangoHoras(hour_actually)
  let title = 'Marcación de Asistencia'
  let message = 'Por favor de seleccionar la hora correspondiente a su ' + action + '.' +
        '<br><br>' +
        '<div class="row">' +
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour" value="' + rankHours[1] + '">' + rankHours[1] + '</center></div>' +
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour_after" value="' + rankHours[2] + '">' + rankHours[2] + '</center></div>' +
        '</div>'

  BootstrapDialog.show({
    type: 'type-primary',
    title: title,
    message: message,
    closable: false,
    buttons: [
      {
        label: 'Aceptar',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          if (typeof $('input:radio[name=rbtnHour]:checked').val() === 'undefined') {
            alert('Por favor seleccionar una hora.')
          } else {
            dialogRef.close()
            let newHour = $('input:radio[name=rbtnHour]:checked').val().trim()
            let userID = user_id
            let parameters = {
              new_date_event: day + ' ' + newHour,
              user_id: userID
            }

            ajaxNodeJs(parameters, '/detalle_eventos/register_assistence', true, 2000)

            if (newHour > rankHours[1]) {
              ModalStandBy(newHour)
            } else {
              checkPassword()
            }
          }
        }
      }
    ]
  })
}

function ModalStandBy (hour_new) {
  var present_hour = $('#hour').val()
  var text_hour = restarHoras(present_hour, hour_new)
  var message = 'Bienvenido, para su entrada faltan :' +
        '<br>' +
        '<center><h1 id="prueba">' + text_hour + '</h1></center>'
  BootstrapDialog.show({
    type: 'type-primary',
    title: 'Panel de Espera',
    message: message,
    closable: false
  })
  CloseStandBy(hour_new)
}

function CloseStandBy (hour_new) {
  var present_hour = $('#hour').val()
  if (present_hour >= hour_new) {
    $.each(BootstrapDialog.dialogs, function (id, dialog) {
      dialog.close()
    })

    checkPassword()
  } else {
    var text_hour = restarHoras(present_hour, hour_new)
    $('#prueba').text(text_hour)
    setTimeout('CloseStandBy("' + hour_new + '")', 1000)
  }
}

// Funcion que genera el rango de horas para la marcacion de salida del agente
function rangoHoras (hour_actually) {
  let array = hour_actually.split(':')
  let secondBefore, secondAfter = '00'
  let hour, beforeHour, afterHour, minutoBefore, minutoAfter, hourAfter = ''

  if (array[1] >= 30) {
    if (array[0] != 23) {
      minutoBefore = '30'
      minutoAfter = '00'
      hourAfter = ceroIzquierda(parseInt(array[0]) + 1)
    } else {
      minutoBefore = '30'
      minutoAfter = '59'
      secondAfter = '59'
      hourAfter = '23'
    }
  } else {
    minutoBefore = '00'
    minutoAfter = '30'
    hourAfter = ceroIzquierda(parseInt(array[0]))
  }

  beforeHour = (array[0] + ':' + minutoBefore + ':' + secondBefore).trim()
  hour = hour_actually.trim()
  afterHour = (hourAfter + ':' + minutoAfter + ':' + secondAfter).trim()

  return [beforeHour, hour, afterHour]
}

// Funcion que completa con cero a la izquierda una variable
function ceroIzquierda (numero) {
  if (numero <= 9) {
    numero = '0' + numero
  }
  return numero
}
function ModificarEstado (event_id, user_id, ip, name, pause) {
  //Declaraciones de variables
  let parameters
  let userRole = $('#user_role').val()
  let queueAdd = $('#queueAdd').val()
  let eventPresentId = $('#present_status_id').val()
  let anexo = $('#anexo').text()
  let userName = $('#user_name').val()
  let route = ''

  if(anexo === 'Sin Anexo'){
    anexo = 0
  }

  //Estructura de parametros a enviar
  parameters = {
      number_annexed : anexo,
      event_id : event_id,
      user_id : user_id,
      username : userName,
      ip : ip,
      type_action : 'update' //parametro usado para producir el cambio de estado de la variable queueAdd en la funcion ajaxNodeJs
  }

  if(userRole === 'user'){
    if(queueAdd === 'true'){
      route = '/detalle_eventos/QueuePause'
    }else{
      if(event_id === '1'){
        if(anexo != 0){
          route ='/detalle_eventos/cambiarEstado'
        }else{
          mostrar_notificacion('warning', 'Primero seleccion un anexo', 'Warning', 10000, false, true)
          loadModule('agents_annexed')
        }
      }else{
        //Restricciones
        mostrar_notificacion('warning', 'Porfavor de colocarse en ACD antes de seleccionar cualquier de otro estado', 'Warning', 10000, false, true, 2000)
      }
    }
  }else{
    if(queueAdd === 'true'){
      mostrar_notificacion('error', 'Error en el sistema porfavor de comunicarte con los especialistas', 'Error', 10000, false, true, 2000)
    }else{
      route = '/detalle_eventos/registrarDetalle'
    }
  }

  //Envio de parametros
  if(route != ''){
    ajaxNodeJs(parameters, route, true, 2000)
  }

  $.each(BootstrapDialog.dialogs, function (id, dialog) {
    dialog.close()
  })
}

function mostrar_notificacion (type, mensaje, titulo, time, duplicate, close, extendtime) {
  let position = ''
  switch (type){
    case 'success' :
      position = 'toast-top-right'
      break
    case 'warning' :
      position = 'toast-top-left'
      break
    case 'error' :
      position = 'toast-top-center'
      break
    default :
      position = 'toast-bottom-right'
      break
  }
  toastr.options = {
    'closeButton': close,
    'debug': false,
    'newestOnTop': true,
    'progressBar': true,
    'positionClass': position,
    'preventDuplicates': duplicate,
    'onclick': null,
    'showDuration': '300',
    'hideDuration': '800',
    'timeOut': time,
    'extendedTimeOut': extendtime,
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'fadeIn',
    'hideMethod': 'fadeOut'
  }

  Command: toastr[type](mensaje, titulo)
}

// Muestra la hora actual del sistema cada 1 segundo
function horaActual (hora, minuto, segundo) {
  segundo = segundo + 1
  if (segundo == 60) {
    minuto = minuto + 1
    segundo = 0
    if (minuto == 60) {
      minuto = 0
      hora = hora + 1
      if (hora == 24) {
        hora = 0
      }
    }
  }

  let str_hora = ''
  let str_minuto = ''
  let str_segundo = ''

  str_hora = new String(hora)
  str_minuto = new String(minuto)
  str_segundo = new String(segundo)

  if (str_hora.length == 1) {
    hora = '0' + hora
  }
  if (str_minuto.length == 1) {
    minuto = '0' + minuto
  }
  if (str_segundo.length == 1) {
    segundo = '0' + segundo
  }

  let horaActual = '<span class="glyphicon glyphicon-time"></span> ' + hora + ':' + minuto + ':' + segundo
  let presentHour = '<input type="hidden" value="' + hora + ':' + minuto + ':' + segundo + '" id="hour"/>'
  document.getElementById('hora_actual').innerHTML = horaActual
  document.getElementById('present_hour').innerHTML = presentHour

  setTimeout('horaActual(' + hora + ', ' + minuto + ', ' + segundo + ')', 1000)
}

// Muestra la fecha actual en la cabecera del sistema.
function fechaActual (dia, mes, diaw) {
  let fechaActual = '<span class="glyphicon glyphicon-calendar"></span> ' + nombre_dia(diaw) + ' ' + dia + ' de ' + nombre_mes(mes)
  document.getElementById('fecha_actual').innerHTML = fechaActual
}

// Funcion que retorna nombre del mes, en base al número enviado
function nombre_mes (mes) {
  var nombre_mes
  switch (mes) {
    case 1 :
      nombre_mes = 'Ene'
      break
    case 2 :
      nombre_mes = 'Feb'
      break
    case 3 :
      nombre_mes = 'Mar'
      break
    case 4 :
      nombre_mes = 'Abr'
      break
    case 5 :
      nombre_mes = 'May'
      break
    case 6 :
      nombre_mes = 'Jun'
      break
    case 7 :
      nombre_mes = 'Jul'
      break
    case 8 :
      nombre_mes = 'Ago'
      break
    case 9 :
      nombre_mes = 'Sep'
      break
    case 10 :
      nombre_mes = 'Oct'
      break
    case 11 :
      nombre_mes = 'Nov'
      break
    case 12 :
      nombre_mes = 'Dic'
      break
  }
  return nombre_mes
}

// Funcion que retorna nombre del día, en base al número enviado
function nombre_dia (dia) {
  var nombre_dia
  switch (dia) {
    case 0 :
      nombre_dia = 'Dom'
      break
    case 1 :
      nombre_dia = 'Lun'
      break
    case 2 :
      nombre_dia = 'Mar'
      break
    case 3 :
      nombre_dia = 'Mie'
      break
    case 4 :
      nombre_dia = 'Jue'
      break
    case 5 :
      nombre_dia = 'Vie'
      break
    case 6 :
      nombre_dia = 'Sab'
      break
  }
  return nombre_dia
}

function restarHoras (inicio, fin) {
  inicio = inicio.split(':')
  fin = fin.split(':')

  var inicioHoras = parseInt(inicio[0]) * 3600
  var inicioMinutos = parseInt(inicio[1]) * 60
  var inicioSegundos = parseInt(inicio[2])
  var iniciototal = inicioHoras + inicioMinutos + inicioSegundos

  var finHoras = parseInt(fin[0]) * 3600
  var finMinutos = parseInt(fin[1]) * 60
  var finSegundos = parseInt(fin[2])
  var fintotal = finHoras + finMinutos + finSegundos

  var diferenciatotal = fintotal - iniciototal

  var diferenciaHoras = parseInt(diferenciatotal / 3600)
  var diferenciaMinutos = parseInt((diferenciatotal - (diferenciaHoras * 3600)) / 60)
  var diferenciaSegundos = parseInt(diferenciatotal - ((diferenciaHoras * 3600) + (diferenciaMinutos * 60)))

  return ceroIzquierda(diferenciaHoras) + ':' + ceroIzquierda(diferenciaMinutos) + ':' + ceroIzquierda(diferenciaSegundos)
}

function disconnectAgent () {
  var anexo = $('#anexo').text()
  let userRole = $('#user_role').val()
  let queueAdd = $('#queueAdd').val()
  if (anexo === 'Sin Anexo') {
    if(userRole === 'user'){
      if(queueAdd === 'false'){
        markExit()
      }else{
        mostrar_notificacion('warning', 'No tiene un anexo asignado', 'Oops!!', 10000, false, true)
        loadModule('agents_annexed')
      }
    }else{
      markExit()
    }
  } else {
    markExit()
  }
}

// Funcion que carga el modal se marcado de salida
function markExit () {
  let hour = $('#hour').val()
  let rank_hours = rangoHoras(hour.trim())
  let message_1 = 'Usted se retira de las oficinas ?'
  let message_2 = 'Por favor de seleccionar la hora correspondiente a su Salida.' +
        '<br><br>' +
        '<div class="row">' +
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour" value="' + hour + '">' + hour + '</center></div>' +
        '<div class="col-md-6"><center><input type="radio" name="rbtnHour" id="rbtnHour_after" value="' + rank_hours[2] + '">' + rank_hours[2] + '</center></div>' +
        '</div>'

  BootstrapDialog.show({
    type: 'type-primary',
    title: 'Registrar Salida',
    message: message_1,
    closable: false,
    buttons: [
      {
        label: 'Si',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          dialogRef.close()
                    // Registro de Salida
          BootstrapDialog.show({
            type: 'type-danger',
            title: 'Registrar Salida',
            message: message_2,
            closable: false,
            buttons: [
              {
                label: 'Aceptar',
                cssClass: 'btn-danger',
                action: function (dialogRef) {
                  let hour_exit = hour.trim()
                  if (typeof $('input:radio[name=rbtnHour]:checked').val() === 'undefined') {
                    alert('Porfavor de seleccionar su hora de salida.')
                  } else {
                    dialogRef.close()
                    hour_exit = $('input:radio[name=rbtnHour]:checked').val().trim()
                    desconnect_agent(hour_exit)
                  }
                }
              },
              {
                label: 'Cancelar',
                cssClass: 'btn-danger',
                action: function (dialogRef) {
                  dialogRef.close()
                }
              }
            ]
          })
        }
      },
      {
        label: 'No',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          dialogRef.close()
          desconnect_agent(hour.trim())
        }
      },
      {
        label: 'Cancelar',
        cssClass: 'btn-danger',
        action: function (dialogRef) {
          dialogRef.close()
        }
      }
    ]
  })
}

/**
 * [Funcion para la desconeccion del agente sin marcar su hora salida]
 * @param hour_exit
 */
function desconnect_agent (hour_exit) {
  var user_id = $('#user_id').val()
  var ip = $('#ip').val()
  var date = $('#date').val()
  var anexo = $('#anexo').text()
  let queueAdd = $('#queueAdd').val()
  let userName = $('#user_name').val()
  let userRole = $('#user_role').val()
  let parameters
  let route = ''
  if (anexo != 'Sin Anexo') {

    if(queueAdd == 'true'){
      //Se encuentra agregado a colas

      parameters = {
        user_id: user_id,
        hour_exit: date + ' ' + hour_exit,
        number_annexed: anexo,
        username : userName,
        event_id: 15,
        ip: ip,
        event_name : 'Desconectado',
        type_action: 'disconnect'
      }
      route = '/detalle_eventos/queueLogout'

    }else{
      parameters = {
        event_id : 15,
        user_id : user_id,
        ip : ip,
        event_name : 'Desconectado',
        hour_exit : date + ' ' + hour_exit,
        number_annexed : anexo,
        type_action: 'disconnect'
      }
      route = '/anexos/Logout'
    }
    ajaxNodeJs(parameters, route, true, 2000)

  } else {
    parameters = {
      event_id : 15,
      user_id : user_id,
      ip : ip,
      event_name : 'Desconectado',
      hour_exit : date + ' ' + hour_exit,
      number_annexed : 0,
      type_action: 'disconnect'
    }
    if(userRole === 'user'){
      if(queueAdd == 'false'){
        route = '/anexos/Logout'
        ajaxNodeJs(parameters, route, true, 2000)
      }else{
        mostrar_notificacion('error', 'No tiene un anexo asignado', 'Error', 10000, false, true)
      }
    }else{
      route = '/anexos/Logout'
      ajaxNodeJs(parameters, route, true, 2000)
    }
  }
}

function liberar_anexos () {
  BootstrapDialog.show({
    type: 'type-primary',
    title: 'Liberación de Anexo',
    message: '¿Desea liberar su anexo?',
    closable: true,
    buttons: [
      {
        label: 'Aceptar',
        cssClass: 'btn-success',
        action: function (dialogRef) {
          if (anexo != 'Sin Anexo') {
            freeAnnexedAjax()
          } else {
            mostrar_notificacion('warning', 'No tiene un anexo asignado', 'Warning', 10000, false, true)
          }
          dialogRef.close()
        }
      },
      {
        label: 'Cancelar',
        cssClass: 'btn-danger',
        action: function (dialogRef) {
          dialogRef.close()
        }
      }
    ]
  })
}

let freeAnnexedAjax = (anexo = '', user_id = '') =>{
  let queueAdd = $('#queueAdd').val()
  let ip = $('#ip').val()
  let parameters
  if(user_id == ''){
    anexo = $('#anexo').text()
    user_id = $('#user_id').val()
    //Tiene un anexo asignado
    if(queueAdd == 'true' ){

      //Se encuentra agregado a colas
      parameters = {
        user_id : user_id,
        number_annexed: anexo,
        username: $('#user_name').val(),
        type_action: 'release',
        event_id : 11,
        event_name : 'Login',
        ip : ip
      }
    }else{

      //No se encuentra en ninguna cola
      parameters = {
        user_id : user_id,
        type_action: 'release',
        event_id : 11,
        event_name : 'Login',
        ip : ip
      }
    }
  }else{
    //Liberar otro anexo que no se encuentre en una cola
    if(user_id != $('#user_id').val()){
      parameters = {
        user_id : user_id,
        event_id : 11,
        event_name : 'Login',
        ip : ip
      }
    }else{
      parameters = {
        user_id : user_id,
        type_action: 'release',
        event_id : 11,
        event_name : 'Login',
        ip : ip
      }
    }

  }

  ajaxNodeJs(parameters, '/anexos/liberarAnexo', true, 2000)
  loadModule('agents_annexed')
}

function assignAnexxed (anexo_name,user_id) {
  var token = $('input[name=_token]').val()
  var anexo = $('#anexo').text()
  let queueAdd = $('#queueAdd').val()
  let username = $('#user_name').val()
  let parameters
  let route = ''
  $.ajax({
    type: 'POST',
    url: 'agents_annexed/user',
    data: {
      _token: token,
      user_id: $('#user_id').val()
    },
    success: function (data) {
      if (data == 'Sin Anexo') {
        if(user_id == ''){
          user_id = $('#user_id').val()
          //No se encuentra en ninguna cola
          parameters = {
            number_annexed : anexo_name,
            user_id : user_id,
            username: username
          }
          route = '/anexos/updateAnexo'
          ajaxNodeJs(parameters, route, true, 2000)
          loadModule('agents_annexed')
        }else{
          freeAnnexedAjax(anexo_name,user_id)
        }
      } else {
        if(user_id == ''){
          mostrar_notificacion('warning', 'Ya se encuentra asignado al anexo ' + anexo + '.', 'Warning', 10000, false, true)
        }else{
          freeAnnexedAjax(anexo_name,user_id)
        }
      }
    }
  })
}

function checkPassword () {
  var type_password = $('#type_password').val()
  if (type_password == 0) {
    changePassword()
  }
}

function changePassword (userId = '',closable = false) {
  if(userId === '') userId = $('#user_id').val()
  var token = $('input[name=_token]').val()
  var message = '<br>' +
                    '<div class="row">' +
                        '<div class="col-md-7">' +
                            '<div class="col-md-6" >' +
                                'Nueva Contraseña:' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<input type="password" class="form-control" style="border-radius: 7px" id="newPassword">' +
                            '</div>' +
                            '<br>' + '<br>' + '<br>' +
                            '<div class="col-md-6">' +
                                'Confirma Contraseña:' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<input type="password" class="form-control" style="border-radius: 7px" id="confirmPassword">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-5">' +
                            '<div class="col-md-12">' +
                                'Una contraseña segura está compuesta de 8 a 12 caracteres.<br>' +
                                'Una diferencia entre mayuscula y minuscula.<br>' +
                                'Permite números , letras y símbolos del teclado.' +
                            '</div>' +
                        '</div>' +
                    '</div>'

  BootstrapDialog.show({
    type: 'type-default',
    title: '<font style="color:red; text-align: center">Cambiar Contraseña</font>',
    message: message,
    closable: closable,
    buttons: [
      {
        label: 'Aceptar',
        cssClass: 'btn-danger',
        action: function (dialogRef) {
          var newPassword = $('#newPassword').val()
          var confirmPassword = $('#confirmPassword').val()

          if (confirmPassword != '' && newPassword != '') {
            if (confirmPassword == newPassword) {
              $.ajax({
                type: 'POST',
                url: 'modifyPassword',
                data: {
                  _token: token,
                  newPassword: newPassword,
                  userId: userId
                },
                success: function (data) {
                  if (data == 1) {
                    dialogRef.close()
                    mostrar_notificacion('success', 'El evento se realizo exitosamente!!!', 'Success', 2000, false, true)
                  } else {
                    mostrar_notificacion('error', 'Problemas de inserción a la base de datos', 'Error', 10000, false, true)
                  }
                }
              })
            } else {
              alert('Las contraseñas ingresadas no coinciden')
            }
          } else {
            alert('Por favor de llenar todos los campos')
          }
        }
      }
    ]
  })
}

const changeRol = (userId)=>{
  let message = 'Seleccione el rol que quiere asignar al usuario :'+
                '<br><br>'+
                '<div class="row">'+
                '<div class="col-md-4"><center><input type="radio" name="nameRole" value="user" checked="checked">User</center></div>'+
                '<div class="col-md-4"><center><input type="radio" name="nameRole" value="supervisor">Supervisor</center></div>'+
                '<div class="col-md-4"><center><input type="radio" name="nameRole" value="backoffice">BackOffice</center></div>'+
                '</div>'+
                '<br>'+
                '<b>Nota :</b> Utilizar esta opcion siempre y cuando el usuario no se encuentre en una cola.'

  BootstrapDialog.show({
    type: 'type-primary',
    title: 'Cambiar Rol',
    message: message,
    closable: true,
    buttons: [
      {
        label: 'Aceptar',
        cssClass: 'btn-success',
        action:  (dialogRef) => {
          let nameRole = $('input:radio[name=nameRole]:checked').val()
          activeCalls(nameRole,userId)
          show_tab_list_user('list_users')
        }
      },
      {
        label: 'Cancelar',
        cssClass: 'btn-danger',
        action:  (dialogRef) => {
          dialogRef.close()
        }
      }
    ]
  })
}



/**
 * Created by dominguez on 10/03/2017.
 *
 * [columns_datatable description]
 * @param  {String} route [Nombre del tipo de reporte]
 * @return {Array}        [Array con nombre de cada parametro que ira en las columnas de la tabla dl reporte]
 */
function columnsDatatable (route) {
  let columns = ''
  if (route === 'incoming_calls') {
    columns = [
      {'data': 'date'},
      {'data': 'hour'},
      {'data': 'telephone'},
      {'data': 'agent'},
      {'data': 'skill'},
      {'data': 'duration'},
      {'data': 'action'},
      {'data': 'waittime'},
      {'data': 'download'},
      {'data': 'listen'}
    ]
  }

  if (route === 'surveys') {
    columns = [
      {'data': 'Type Survey'},
      {'data': 'Date'},
      {'data': 'Hour'},
      {'data': 'Username'},
      {'data': 'Anexo'},
      {'data': 'Telephone'},
      {'data': 'Skill'},
      {'data': 'Duration'},
      {'data': 'Question_01'},
      {'data': 'Answer_01'},
      {'data': 'Question_02'},
      {'data': 'Answer_02'},
      {'data': 'Action'}
    ]
  }

  if (route === 'consolidated_calls') {
    columns = [
      {'data': 'Name'},
      {'data': 'Received'},
      {'data': 'Answered'},
      {'data': 'Abandoned'},
      {'data': 'Transferred'},
      {'data': 'Attended'},
      {'data': 'Answ 10s'},
      {'data': 'Answ 15s'},
      {'data': 'Answ 20s'},
      {'data': 'Answ 30s'},
      {'data': 'Aband 10s'},
      {'data': 'Aband 15s'},
      {'data': 'Aband 20s'},
      {'data': 'Aband 30s'},
      {'data': 'Wait Time'},
      {'data': 'Talk Time'},
      {'data': 'Avg Wait'},
      {'data': 'Avg Talk'},
      {'data': 'Answ'},
      {'data': 'Unansw'},
      {'data': 'Ro10'},
      {'data': 'Ro15'},
      {'data': 'Ro20'},
      {'data': 'Ro30'},
      {'data': 'Ns10'},
      {'data': 'Ns15'},
      {'data': 'Ns20'},
      {'data': 'Ns30'},
      {'data': 'Avh2 10'},
      {'data': 'Avh2 15'},
      {'data': 'Avh2 20'},
      {'data': 'Avh2 30'}
    ]
  }

  if (route === 'events_detail') {
    columns = [
      {'data': 'nombre_agente'},
      {'data': 'fecha'},
      {'data': 'hora'},
      {'data': 'evento'},
      {'data': 'accion'}
    ]
  }

  if (route === 'outgoing_calls') {
    columns = [
      {'data': 'date'},
      {'data': 'hour'},
      {'data': 'annexedorigin'},
      {'data': 'username'},
      {'data': 'destination'},
      {'data': 'calltime'},
      {'data': 'download'},
      {'data': 'listen'}
    ]
  }

  if (route === 'agents_online') {
    columns = [
      {"data":"date"},
      {"data":"hour"},
      {"data":"agents"}
    ]
  }

  if (route === 'level_of_occupation') {
    columns = [
      {"data":"date"},
      {"data":"hour"},
      {"data":"indbound"},
      {"data":"acw"},
      {"data":"outbound"},
      {"data":"auxiliares"},
      {"data":"logueo"},
      {"data":"occupation_cosapi"}
    ]
  }

  if (route === 'list_users') {
    columns = [
      {"data":"Id"},
      {"data":"First Name"},
      {"data":"Second Name"},
      {"data":"Last Name"},
      {"data":"Second Last Name"},
      {"data":"Username"},
      {"data":"Role"},
      {"data":"Estado"},
      {"data":"Change Rol"},
      {"data":"Change Password"},
      {"data":"Change Status"}
    ]
  }

  return columns
}
/**
 * Created by jdelacruzc on 11/04/2017.
 *
 * [RoleTableHide description]
 * @return {Array} [Los roles con el cual me ocultaran las columnas]
 */
const RoleTableHide = () =>  ['user']

/**
 * Created by jdelacruzc on 11/04/2017.
 *
 * [DatableHide description]
 * @param  {String} nombreDiv [Nombre del id de la tabla]
 * @param {Array}  numeroColumnas[Se pasan los numeros de columnas que se desean ocultar]
 * @return Oculta las columnas en el datatable
 */
const DataTableHide = (nombreDIV, numeroColumnas, roleUser) => {
    let exist = RoleTableHide().indexOf(roleUser)
    if(exist >= 0) {
      let DataTableDiv = $('#' + nombreDIV).DataTable()
      DataTableDiv.columns( numeroColumnas ).visible( false, false );
      DataTableDiv.columns.adjust().draw( false );
    }
}

/**
 * Created by jdelacruzc on 11/04/2017.
 *
 * [createUser description]
 * @return Crea un usuario nuevo y refersca el datatable listuser
 */
function createUser () {
  var token = $('input[name=_token]').val()
  var message = '<br>' +
      '<div class="row">' +
        '<div class="col-md-12">' +
          '<div class="col-md-6" >' +
            'Primer Nombre:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<input type="text" class="form-control" style="border-radius: 7px" id="primerNombre" placeholder="Test">' +
          '</div>' +
          '<br>' + '<br>' + '<br>' +
          '<div class="col-md-6">' +
            'Segundo Nombre:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<input type="text" class="form-control" style="border-radius: 7px" id="segundoNombre" placeholder="Test 2">' +
          '</div>' +
          '<br>' + '<br>' + '<br>' +
          '<div class="col-md-6">' +
            'Apellido Paterno:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<input type="text" class="form-control" style="border-radius: 7px" id="apellidoPaterno" placeholder="Cosapi">' +
          '</div>' +
          '<br>' + '<br>' + '<br>' +
          '<div class="col-md-6">' +
            'Apellido Materno:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<input type="text" class="form-control" style="border-radius: 7px" id="apellidoMaterno" placeholder="Cosapi 2">' +
          '</div>' +
          '<br>' + '<br>' + '<br>' +
          '<div class="col-md-6">' +
            'Username:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<input type="text" class="form-control" style="border-radius: 7px" id="userName" placeholder="testCosapi">' +
          '</div>' +
          '<br>' + '<br>' + '<br>' +
          '<div class="col-md-6">' +
            'Contraseña:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<input type="password" class="form-control" style="border-radius: 7px" id="nuevaContraseña" placeholder="xxxxxx">' +
          '</div>' +
          '<br>' + '<br>' + '<br>' +
          '<div class="col-md-6">' +
            'Correo:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<input type="text" class="form-control" style="border-radius: 7px" id="email" placeholder="cosapi@cosapidata.com.pe">' +
          '</div>' +
          '<br>' + '<br>' + '<br>' +
          '<div class="col-md-6">' +
            'Rol de Usuario:' +
          '</div>' +
          '<div class="col-md-6">' +
            '<select class="form-control" style="border-radius: 7px" id="slRol">' +
              '<option selected>Seleccionar Aqui</option>' +
              '<option value="user">Usuario</option>' +
              '<option value="backoffice">BackOffice</option>' +
              '<option value="supervisor">Supervisor</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
      '</div>'

  BootstrapDialog.show({
    type: 'type-primary',
    title: 'Crear Nuevo Usuario',
    message: message,
    closable: true,
    buttons: [
      {
        label: 'Aceptar',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          var primerNombre    = $('#primerNombre').val()
          var segundoNombre   = $('#segundoNombre').val()
          var apellidoPaterno = $('#apellidoPaterno').val()
          var apellidoMaterno = $('#apellidoMaterno').val()
          var userName        = $('#userName').val()
          var nuevaContraseña = $('#nuevaContraseña').val()
          var email           = $('#email').val()
          var role            = $('#slRol').val()

          if (primerNombre != '' && segundoNombre != '' && apellidoPaterno != '' && apellidoMaterno != '' && userName != '' && nuevaContraseña != '' && email != '' && role != '') {
              $.ajax({
                type: 'POST',
                url: 'createUser',
                data: {
                  _token:           token,
                  primerNombre:     primerNombre,
                  segundoNombre:    segundoNombre,
                  apellidoPaterno:  apellidoPaterno,
                  apellidoMaterno:  apellidoMaterno,
                  userName:         userName,
                  nuevaContraseña:  nuevaContraseña,
                  email:            email,
                  role:             role
                },
                success: function (data) {
                  if (data == 1) {
                    show_tab_list_user('list_users')
                    dialogRef.close()
                    mostrar_notificacion('success', 'El usuario se registro correctamente!!!', 'Success', 2000, false, true)
                  } else {
                    mostrar_notificacion('error', 'Problemas de inserción a la base de datos', 'Error', 10000, false, true)
                  }
                }
              })
          } else {
            alert('Por favor de llenar todos los campos')
          }
        }
      },
      {
        label: 'Cancelar',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          dialogRef.close()
        }
      }
    ]
  })
}

/**
 * Created by jdelacruzc on 11/04/2017.
 *
 * [createUser description]
 * @return Crea un usuario nuevo y refersca el datatable listuser
 */
function changeStatus (userId, status) {
  var token = $('input[name=_token]').val()
  var estado = ''

  if(status === 0){
    estado = 1
  }else{
    estado = 0
  }

  let message = 'Deseas cambiar el estado del usuario ?' +
      '<br>' +
      '<b>Nota :</b> Esto afecta el estado (Activo o Inactivo).'

  BootstrapDialog.show({
      type: 'type-primary',
      title: 'Cambiar Estado',
      message: message,
      closable: true,
      buttons: [
        {
          label: 'Aceptar',
          cssClass: 'btn-success',
          action: function (dialogRef) {
            $.ajax({
              type: 'POST',
              url: 'changeStatus',
              data: {
                _token:     token,
                userID:     userId,
                estadoID:   estado
              },
              success: function (data) {
                if (data == 1) {
                  show_tab_list_user('list_users')
                  dialogRef.close()
                  mostrar_notificacion('success', 'Se cambio el estado del usuario!!!', 'Success', 2000, false, true)
                } else {
                  mostrar_notificacion('error', 'Problemas al cambiar en la base de datos', 'Error', 10000, false, true)
                }
              }
            })
          }
        },
        {
          label: 'Cancelar',
          cssClass: 'btn-danger',
          action: function (dialogRef) {
            dialogRef.close()
          }
        }
      ]
  })
}