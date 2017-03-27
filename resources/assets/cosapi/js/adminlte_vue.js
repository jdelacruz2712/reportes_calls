
'use strict'
/**
 * Created by dominguez on 10/03/2017.
 */

// variables Vue JS
// Setear el valor del estado actual del agente
var present_status = new Vue({
  el: '#statusAgent',
  data: {
    present_status_name: 'Login',
    present_status_id: '11',
    anexo: ''
  }
})

// Parámetro de conexion al Servidor NodeJs
io.sails.autoConnect = false
const socketIO = io.connect('http://192.167.99.246:1338/')
const socketSails = io.sails.connect('http://192.167.99.246:1338/')
/*
const socketAsterisk = io.connect('http://192.167.99.246:3363', { 'forceNew': true })
socketAsterisk.emit('join', $('#anexo').text())
socketAsterisk.on('status_agent',  (data) => {
    present_status.present_status_name  = data.Name_Event;
    present_status.present_status_id    = data.Event_id;
})
*/

// Conecta con el Socket Server
socketIO.on('connect', function () {
  $('#loading').hide()
  console.log('Socket connected!')
})

socketIO.on('disconnect', function () {
  let divLoading = '<div class="loading" id="loading" style="display: inline;"><li></li><li></li><li></li><li></li><li></li></div>'
  $('#container').html(divLoading)
  console.log('desconectado!')
})

// Cambia la etiqueta del estado actual cada vez que realiza un cambio de estado
socketSails.on('status_agent', function (data) {
  present_status.present_status_name = data.Name_Event
  present_status.present_status_id = data.Event_id
})

// Setea la etiqueta del estado actual cada vez que actualicen la pantalla del sistema
var parameters = {user_id: $('#user_id').val()}
ajaxNodeJs(parameters, '/detalle_eventos/getstatus', true)
