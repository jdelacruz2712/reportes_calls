'use strict'
const vueFront = new Vue({
  el: '#statusAgent',
  data: {
    present_status_name: '',
    present_status_id: '',
    anexo: ''
  }
})

const socketIO = io.connect('http://192.167.99.246:1338/')
const socketSails = io.sails.connect('http://192.167.99.246:1338/')
io.sails.autoConnect = false
socketSails.reconnection = true
socketSails.reconnectionDelayMax = 5
// socketSails.timeout = 10
// socketSails.reconnectionDelay = 20
/*
const socketAsterisk = io.connect('http://192.167.99.246:3363', { 'forceNew': true })
socketAsterisk.emit('join', $('#anexo').text())
socketAsterisk.on('status_agent',  (data) => {
    present_status.present_status_name  = data.Name_Event;
    present_status.present_status_id    = data.Event_id;
})
*/

socketSails.on('connect', function () {
  $('#loading').hide()
  console.log('Socket Sails.io connected!')
})

socketSails.on('disconnect', function () {
  let divLoading = '<div class="loading" id="loading" style="display: inline;"><li></li><li></li><li></li><li></li><li></li></div>'
  $('#container').html(divLoading)
  console.log('Socket Sails.io desconectado!')
})

// Cambia la etiqueta del estado actual cada vez que realiza un cambio de estado
socketSails.on('status_agent', function (data) {
  vueFront.present_status_name = data.Name_Event
  vueFront.present_status_id = data.Event_id
})

// Setea la etiqueta del estado actual cada vez que actualicen la pantalla del sistema
let parameters = {user_id: $('#user_id').val()}
ajaxNodeJs(parameters, '/detalle_eventos/getstatus', true)
