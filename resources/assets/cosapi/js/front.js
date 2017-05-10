/**
 * Created by dominguez on 3/05/2017.
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



  if (vueFront.annexed === 0 ) loadModule('agents_annexed')

  $('#statusAgent').click(function () {
    PanelStatus()
  })

  $('.reportes').on('click', function (e) {
    loadModule($(this).attr('id'))
  })

  //Modificacion del Rol a User para los agentes de BackOffice
  $('#activate_calls').click(function(){

  })
})

/*[show_tab_incoming Función que carga Llamadas Entrantes en el reporte] */
const show_tab_incoming = (evento) => dataTables('table-incoming', get_data_filters(evento), 'incoming_calls')

/*[show_tab_surveys Función que carga los datos de las Encuenstas] */
const show_tab_surveys = (evento) => dataTables('table-surveys', get_data_filters(evento), 'surveys')

/*[show_tab_consolidated Función que carga los datos del Consolidado]*/
const show_tab_consolidated = (evento) => dataTables('table-consolidated', get_data_filters(evento), 'consolidated_calls')

/*[show_tab_detail_events Función que carga los datos detallados de los Eventos del Agente]*/
const show_tab_detail_events = (evento) => dataTables('table-detail-events', get_data_filters(evento), 'events_detail')

/*[show_tab_detail_events Función que carga los datos detallados de los Eventos del Agente]*/
const show_tab_level_occupation = (evento) => dataTables('table-level-occupation', get_data_filters(evento), 'level_of_occupation')

/*[show_tab_angetOnline Función que carga los datos de los agentes online]*/
const show_tab_agentOnline = (evento) => dataTables('table-agentOnline', get_data_filters(evento), 'agents_online')

/*[show_tab_outgoing Función que carga los datos de las Llamadas Salientes]*/
const show_tab_outgoing = (evento) => dataTables('table-outgoing', get_data_filters(evento), 'outgoing_calls')

/*[show_tab_list_user Función que carga los datos detallados de los usuarios]*/
const show_tab_list_user = (evento) => dataTables('table-list-user', get_data_filters(evento), 'list_users')

/*[show_tab_annexed Función que carga la lista de anexos]*/
const show_tab_annexed = (event) => {
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

const activeCalls = () => {
  vueFront.remoteActiveCallsUserId = vueFront.getUserId
  let message = '<h4>¿Usted desea poder recibir llamadas?</h4>' +
    '<br>' +
    '<p><b>Nota : </b>Cuando active la entrada de llamadas pasara a un estado de "Login", porfavor de leer las ' +
    'notificaiones para saber que el cambio se realizo exitosamente y verificar que su rol este en "User", para luego' +
    'pase a "ACD" de maner manual y pueda así recibir llamadas siempre que este asignado a las colas.</p>'

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
          if(vueFront.getRole !== 'user'){
            vueFront.remoteActiveCallsNameRole = 'user'
            vueFront.activeCalls('user')
          }else{
            closeNotificationBootstrap()
          }
        }
      },
      {
        label: '<i class="fa fa-times" aria-hidden="true"></i> No',
        cssClass: 'btn-danger',
        action: function (dialogRef) {
          if(vueFront.getRole !== 'backoffice'){
            vueFront.remoteActiveCallsNameRole = 'backoffice'
            vueFront.activeCalls()
          }else{
            closeNotificationBootstrap()
          }
        }
      },
      {
        label: '<i class="fa fa-sign-out" aria-hidden="true"></i> Cancelar',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          vueFront.remoteActiveCallsUserId = ''
          dialogRef.close()
        }
      }
    ]
  })
}