/**
 * Created by dominguez on 10/03/2017.
 */

//Setear el valor del estado actual del agente
var present_status = new Vue({
    el: '#statusAgent',
    data: {
        present_status: 'Login'
    }
});

//Parámetro de conexion al Servidor NodeJs
var mySocket = io.sails.connect('http://192.167.99.246:1338/');

//Conecta con el Socket Server
mySocket.on('connect', function () {
    $('#disconnection_nodejs').hide();
    console.log("Socket connected!");
});

mySocket.on('disconnect', function ()
{
    $('#disconnection_nodejs').show();
    console.log('desconectado!');
});


//Cambia la etiqueta del estado actual cada vez que realiza un cambio de estado
mySocket.on('status_agent', function (data) {
    present_status.present_status = data.Message;
});


//Setea la etiqueta del estado actual cada vez que actualicen la pantalla del sistema
var parameters = {
    user_id         : $('#user_id').val()
};
ajaxNodeJs(parameters,'/detalle_eventos/getstatus',true);


