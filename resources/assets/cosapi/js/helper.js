'use strict';

/*!
 * Cosapi v1.0 : JQuery Personalizado
 * Copyright 2015
 * Alan Cornejo
 */

const loadModule = (idOptionMenu) => {
  let url = idOptionMenu

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


/**
 * [get_data_filters Función que configura datos a enviar en las consultas]
 * @param  {String} evento [Tipo de reporte a cargar en la vista]
 * @return {Array}         [Devuelve parametros configurados]
 */
const get_data_filters = (evento) => {
  let rankHour = 1800
  if ($('select[name=rankHour]').length) rankHour = $('select[name=rankHour]').val()

  let data = {
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
const exportar = (format_export) => {
  let days      = $('#texto').val()
  let event     = $('#hidEvent').val()
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
const export_ajax = (type, url, format_export = '', days = '',rankHour = 1800) => {
  const dialog = cargar_dialog('primary', 'Download', 'Cargando el Excel', false)
  const token = $('input[name=_token]').val()

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
const downloadURL = (url, index) => {
  const hiddenIFrameID = `hiddenDownloader${index}`
  let iframe = document.createElement('iframe')
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
const cargar_dialog = (new_type, title, messagedialog, closable) => {
  let message = $('<div></div>')
  message.append('<center><b>Porfavor no cerrar la ventana</b></br><img src="../img/loading_bar_cicle.gif" /></center>')

  const dialog = new BootstrapDialog({
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
const cargar_ajaxDIV = (type, url, nameDiv, msjError, before = false) => {
  const image_loading = '<div class="loading" id="loading"><li></li><li></li><li></li><li></li><li></li></div>'

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
const refresh_information = (evento) => {
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
const detalle_kpi_dashboard_02 = (evento) => {
  return cargar_ajaxDIV('GET', 'dashboard_02/detail_kpi/' + evento, 'detail_kpi', 'Problema para actualizar el KPI de agentes', true)
}

/**
 * [create_sound_bite Función que reproduce el audio para llamadas en cola]
 * @param  {String} sound [Ruta donde se encuentra ubicado nuestro audio]
 */
const create_sound_bite = (sound) => {
  const html5_audiotypes = {
    'mp3': 'audio/mpeg',
    'mp4': 'audio/mp4',
    'ogg': 'audio/ogg',
    'wav': 'audio/wav'
  }

  let html5audio = document.createElement('audio')
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
const validar_sonido = () => {
  let click2 = create_sound_bite('/cosapi/sonidos/alerta_principal.mp3')
  let encoladas = $('#count_encoladas').text()
  if (encoladas >= 2) click2.playclip()
  setTimeout('validar_sonido()', 4000)
}

const ajaxNodeJs = (parameters, ruta, notificacion, time) => {
  $('#myModalLoading').modal('show')
  socketSails.get(ruta, parameters, function (resData, jwRes) {
    $('#myModalLoading').modal('hide')
    mostrar_notificacion(resData['Response'], resData['Message'], resData['Response'].charAt(0).toUpperCase() + resData['Response'].slice(1), time, false, true, 2000)

    //Muestra notificaciones al hacer QueueAdd o QueueRemove
    if(resData['DataQueue'] != null) loadMultiNotification(resData,time,parameters)
    if(resData['Response'] == 'success')eventPostExecuteAction(parameters)

  })
}

const eventPostExecuteAction = (parameters) => {

  switch (parameters['type_action']){
    case 'changeStatus':
      if(parameters['event_id'] == 1 && vueFront.getRole === 'user') setQueueAdd(true)
      break
    case 'assignAnnexed':
      //socketAsterisk.emit('createRoom', vueFront.annexed)
      break
    case 'releasesAnnexed':
      vueFront.remotoReleaseUserId = 0
      vueFront.remotoReleaseUsername = 0
      vueFront.remotoReleaseAnnexed = 0
      vueFront.remotoReleaseStatusQueueRemove = false
      socketAsterisk.emit('leaveRoom', vueFront.annexed)
      vueFront.annexed = 0
      setQueueAdd(false)
      if(this.remoteActiveCallsNameRole !== ''){
        if(vueFront.getUserId === vueFront.remoteActiveCallsUserId) {
          vueFront.getRole = vueFront.remoteActiveCallsNameRole
          vueFront.remoteActiveCallsNameRole = ''
          vueFront.remoteActiveCallsUserId = ''
        }
      }
      break
    case 'disconnectAgent':
      setTimeout('eventLogout()', 4000)
      break
  }
}

const loadMultiNotification = (resData,time,parameters) => {
  console.log(resData)
  console.log(parameters)
  let arrayMessage = resData['DataQueue']
  let message = ''
  let messageSuccess = ''
  let messageError = ''
  let messageWarning = ''

  for (let posicion = 0; posicion < arrayMessage.length; posicion++) {

    switch (arrayMessage[posicion]['Response']){
      case 'Success' :
        messageSuccess = messageSuccess + arrayMessage[posicion]['Message']
        if (posicion != ((arrayMessage.length) - 1)) messageSuccess = messageSuccess + '<br>'
        break
      case 'Warning' :
        messageWarning = messageWarning + arrayMessage[posicion]['Message']
        if (posicion != ((arrayMessage.length) - 1)) messageWarning = messageWarning + '<br>'
        break
      case 'Error' :
        messageError = messageError + arrayMessage[posicion]['Message']
        if (posicion != ((arrayMessage.length) - 1)) messageError = messageError + '<br>'
        break
    }

  }

  if (messageSuccess !== '') {
    mostrar_notificacion('success', messageSuccess, 'Success', time, false, true, 2000)
    if (parameters['type_action'] === 'changeStatus') setQueueAdd(true)
    if (parameters['type_action'] === 'releasesAnnexed') setQueueAdd(false)
  }

  if (messageError !== '') mostrar_notificacion('error', messageError, 'Error', 0, false, true, 0)
  if (messageWarning !== '') mostrar_notificacion('warning', messageWarning, 'Warning', 0, false, true, 0)
}

const setQueueAdd = (queueAdd) => {
  const token = $('input[name=_token]').val()
  $.ajax({
    type: 'POST',
    url: 'setQueueAdd',
    data: {
      _token: token,
      QueueAdd: queueAdd
    },
    success: function (data) {
      vueFront.statusQueueAddAsterisk = data
    }
  })
}

const eventLogout = () => location.href = 'logout'

const PanelStatus = () => {
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

const MarkAssitance = (user_id, day, hour_actually, action) => {
   if(vueFront.statusChangeAssistance == true){
    modalAssintance(user_id, day, hour_actually, action)
  }else if(vueFront.statusChangeAssistance != false){
    let assistence_user = $('#assistence_user').val().split('&')
    ModalStandBy(assistence_user[1])
  }else{
    checkPassword()
  }
}

const modalAssintance = (user_id, day, hour_actually, action) => {
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

const ModalStandBy = (hour_new) => {
  let present_hour = vueFront.hourServer
  let text_hour = restarHoras(present_hour, hour_new)
  const message = 'Bienvenido, para su entrada faltan :' +
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

const CloseStandBy = (hour_new) => {
  let present_hour = vueFront.hourServer
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
const rangoHoras = (hour_actually) => {
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
const ceroIzquierda = (numero) => {
  if (numero <= 9) numero = '0' + numero
  return numero
}

const ModificarEstado = (event_id, user_id, ip, name, pause) => {
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

const mostrar_notificacion = (type, mensaje, titulo, time, duplicate, close, extendtime) => {
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
const horaActual = () => {
  setTimeout(function(){
    let hourServer = vueFront.hourServer.split(':')
    let hora = parseInt(hourServer[0])
    let minuto = parseInt(hourServer[1])
    let segundo = parseInt(hourServer[2])
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

    if (str_hora.length == 1) hora = '0' + hora
    if (str_minuto.length == 1) minuto = '0' + minuto
    if (str_segundo.length == 1) segundo = '0' + segundo

    vueFront.hourServer = hora + ':' + minuto + ':' + segundo

    horaActual()

  }, 1000)
}

// Muestra la fecha actual en la cabecera del sistema.
const fechaActual = () => {
  let dateServer = vueFront.textDateServer.split('-')
  vueFront.textDateServer = nombre_dia(parseInt(dateServer[2])) + ' ' + parseInt(dateServer[0]) + ' de ' + nombre_mes(parseInt(dateServer[1]))
}

// Funcion que retorna nombre del mes, en base al número enviado
const nombre_mes = (mes) => {
  let nombre_mes
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
const nombre_dia = (dia) => {
  let nombre_dia
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

const restarHoras = (inicio, fin) => {
  inicio = inicio.split(':')
  fin = fin.split(':')

  let inicioHoras = parseInt(inicio[0]) * 3600
  let inicioMinutos = parseInt(inicio[1]) * 60
  let inicioSegundos = parseInt(inicio[2])
  let iniciototal = inicioHoras + inicioMinutos + inicioSegundos

  let finHoras = parseInt(fin[0]) * 3600
  let finMinutos = parseInt(fin[1]) * 60
  let finSegundos = parseInt(fin[2])
  let fintotal = finHoras + finMinutos + finSegundos

  let diferenciatotal = fintotal - iniciototal

  let diferenciaHoras = parseInt(diferenciatotal / 3600)
  let diferenciaMinutos = parseInt((diferenciatotal - (diferenciaHoras * 3600)) / 60)
  let diferenciaSegundos = parseInt(diferenciatotal - ((diferenciaHoras * 3600) + (diferenciaMinutos * 60)))

  return ceroIzquierda(diferenciaHoras) + ':' + ceroIzquierda(diferenciaMinutos) + ':' + ceroIzquierda(diferenciaSegundos)
}


// Funcion que carga el modal se marcado de salida
const disconnect = () => {
  let hour = vueFront.hourServer
  let rank_hours = rangoHoras(hour.trim())
  const message_1 = 'Usted se retira de las oficinas ?'
  const message_2 = 'Por favor de seleccionar la hora correspondiente a su Salida.' +
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
                    console.log($('input:radio[name=rbtnHour]:checked').val().trim())
                    vueFront.remoteDisconnectAgentHour = $('input:radio[name=rbtnHour]:checked').val().trim()
                    vueFront.disconnectAgent()
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
          vueFront.remoteDisconnectAgentHour = hour.trim()
          vueFront.disconnectAgent()
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


const liberar_anexos = () => {
  let anexo = vueFront.annexed
  if (anexo != 0) {
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
            vueFront.releasesAnnexed()
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
  }else {
    mostrar_notificacion('warning', 'No tiene un anexo asignado', 'Warning', 10000, false, true)
  }
}

const assignAnexxed = (annexed,userId,username) => {
  if(userId.length === 0 && vueFront.annexed !== 0){
    mostrar_notificacion('warning', 'Ya se encuentra asignado al anexo ' + vueFront.annexed + '.', 'Warning', 10000, false, true)
  }else {

    if (userId.length === 0) {
      vueFront.annexed = annexed
      vueFront.assignAnnexed()
    }else{
      vueFront.remotoReleaseAnnexed = annexed
      vueFront.remotoReleaseUsername = username
      vueFront.remotoReleaseUserId = userId
      vueFront.remotoReleaseStatusQueueRemove = true
      vueFront.releasesAnnexed()
    }
  }
}

/**
 * Created by jdelacruzc on 18/04/2017.
 *
 * [filterLetter description]
 * @return Solo permite letras y letras con acentos en los inputs
 */
function filterLetter(e){
  const key = e.keyCode || e.which
  const board = String.fromCharCode(key).toLowerCase()
  const letter = " áéíóúabcdefghijklmnñopqrstuvwxyz"
  const specials = "8-37-39-46"

  let specialskey = false
  for(let i in specials){
    if(key === specials[i]){
      specialskey = true
      break
    }
  }

  if(letter.indexOf(board) === -1 && !specialskey){
    return false
  }
}

/**
 * Created by jdelacruzc on 19/04/2017.
 *
 * [BlockCopyPaste description]
 * @return Bloquea el Ctrl C y Ctrl V
 */
const BlockCopyPaste = (e) =>{
  if(e.ctrlKey === true && (e.which === 118 || e.which === 86)){
    return false
  }
}

/**
 * Created by jdelacruzc on 19/04/2017.
 *
 * [filterNumber description]
 * @return Solo permite ingresar numeros
 */
const filterNumber = (e) =>{
  let key = window.Event ? e.which : e.keyCode
  return (key >= 48 && key <= 57 || key === 8 || key === 9)
}

const closeNotificationBootstrap = () => {
  $.each(BootstrapDialog.dialogs, function (id, dialog) {
    dialog.close()
  })
}