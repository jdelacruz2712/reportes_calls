/**
 * Created by dominguez on 10/03/2017.
 */

//variables Vue JS
//Setear el valor del estado actual del agente
var present_status = new Vue({
    el: '#statusAgent',
    data: {
        present_status_name : 'Login',
        present_status_id   : '11',
        anexo               : '',
    }
});
console.log(present_status.$data.anexo)
//Parámetro de conexion al Servidor NodeJs
var socketSails = io.sails.connect('http://192.167.99.246:1338/');
var socketAsterisk = io.connect('http://192.167.99.246:3363', { 'forceNew': true })


//Conecta con el Socket Server
socketSails.on('connect', function () {
    $('#disconnection_nodejs').hide();
    console.log("Socket connected!");
});

socketSails.on('disconnect', function ()
{
    $('#disconnection_nodejs').show();
    console.log('desconectado!');
});


//Cambia la etiqueta del estado actual cada vez que realiza un cambio de estado
socketSails.on('status_agent',  (data) => {
    present_status.present_status_name  = data.Name_Event;
    present_status.present_status_id    = data.Event_id;
})

socketAsterisk.emit('join', '228')

socketAsterisk.on('status_agent',  (data) => {
    console.log(data);
    //present_status.present_status_name  = data.Name_Event;
    //present_status.present_status_id    = data.Event_id;
})


//Setea la etiqueta del estado actual cada vez que actualicen la pantalla del sistema
var parameters = {user_id         : $('#user_id').val()}
ajaxNodeJs(parameters,'/detalle_eventos/getstatus',true);

