'use strict'
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value')
const vueFront = new Vue({
  el : '#frontAminLTE',
  data : {
    getUserId : '',
    getUsername : '',
    getNameComplete : '',
    getRole : '',
    getRemoteIp : '',
    getEvent : 11,
    statusChangePassword : '',
    statusChangeAssistance : '',
    annexed : 0,
    srcAvatar :'default_avatar.png',

    statusQueueAddAsterisk : false,
    hourServer : '',
    textDateServer : '',
    dateServer : '',
    present_status_name : '',
    present_status_id : '',
    getListEvents : [],
    requiredAnexo : false,
    textCheckAssistance : 'Entrada',
    HourAssistance : '',
    nextHourAssistance : '',
    nextEventId : '',
    routeAction : '/detalle_eventos/registrarDetalle',

    showStatusModal : 'modal fade',
    showReleasesAnnexedModal : 'modal fade',
    showAssistanceModal : 'modal fade'
  },
  mounted(){
    this.getAvatar(),
    this.loadVariablesGlobals()
  },
  methods :{

    sendUrlRequest : async function (url){
      let response = await this.$http.post(url)
      return response.data
    },

    getAvatar : function (){
      let userId = $('#user_id').val()
      let parameters = { userID : userId }
      this.$http.post('viewUsers', parameters).then(response => {
        this.srcAvatar = response.body[0].user_profile.avatar
      },response => console.log(response.body))
    },

    loadVariablesGlobals : async function () {
      let response = await this.sendUrlRequest('/getVariablesGlobals')
      this.getUserId = response.getUserId
      this.getUsername = response.getUsername
      this.getNameComplete = response.getNameComplete
      this.getRole = response.getRole
      this.getRemoteIp = response.getRemoteIp
      this.statusChangePassword = response.statusChangePassword
      this.statusChangeAssistance = response.statusChangeAssistance
      this.statusQueueAddAsterisk = response.statusQueueAddAsterisk
      this.requiredAnnexed = response.requiredAnnexed
      this.hourServer = response.hourServer
      this.textDateServer = response.textDateServer
      this.dateServer = response.dateServer
      this.annexed = response.annexed
      await fechaActual()
      await horaActual()
      //await this.verifyAssistance()

      // Setea la etiqueta del estado actual cada vez que actualicen la pantalla del sistema
      let parameters = {user_id: this.getUserId}
      ajaxNodeJs(parameters, '/detalle_eventos/getstatus', true)

      //Verificacion de marcado de asistencia
      MarkAssitance(this.getUserId, this.dateServer, this.hourServer, 'Entrada')
    },

    loadModalStatus : async  function (){
      let response = await this.sendUrlRequest('list_event')
      this.getListEvents = response.getListEvents
      this.showStatusModal = 'modal show'
    },

    verifyAnnexed : function(){
      if (this.getRole === 'user') {
        if(this.requiredAnnexed) {
          if (this.annexed == 0){
            alert('Seleccionar Anexo !!!')
            return false
          }
          return true
        }
        return false
      }
      return true
    },

    defineRoute : function(event){
      if (this.getRole === 'user') {
        switch (event){
          case 'changeStatus' :
            (this.statusQueueAddAsterisk === true)? this.routeAction = '/detalle_eventos/QueuePause' : this.routeAction = '/detalle_eventos/cambiarEstado'
            break
          case 'releasesAnnexed' :
            this.routeAction = '/anexos/liberarAnexo'
            break
        }
      }
    },

    changeStatus : function (eventId){
      this.showStatusModal = 'model fade'
      let isVerifyAnnexed = this.verifyAnnexed()
      if (isVerifyAnnexed) this.defineRoute('changeStatus')
      this.nextEventId = eventId
      let parameters = this.loadParameters('changeStatus')
      if(isVerifyAnnexed) ajaxNodeJs(parameters, this.routeAction, true, 2000)
    },

    releasesAnnexed : async function (){
      this.showReleasesAnnexedModal = 'modal fade'
      let verifyRequired = await this.verifyRequired()
      if (verifyRequired) await this.defineRoute('releasesAnnexed')
    },

    verifyAssistance : async function(){
      if(this.statusChangePassword){
        this.loadModalCheckAssistance()
      }else if(this.statusChangePassword != false){
        this.showStandByAssistanceModal = 'modal show'
        this.loadModalStandByAssistance()
      }
    },

    loadModalCheckAssistance : async function (){
      let rankHours = await rangoHoras(this.hourServer)
      this.HourAssistance = rankHours[1]
      this.nextHourAssistance = rankHours[2]
      this.showAssistanceModal = 'modal show'
    },

    loadModalStandByAssistance : function (){
      setInterval(function(){
        let differenceHour = restarHoras(this.nextHourAssistance, this.hourServer)
        if (this.hourServer >= this.nextHourAssistance) this.showStandByAssistanceModal = 'modal fade'
      }.bind(this),1000)
    },

    loadParameters : function (actionEvent){
      let data = []
      if (actionEvent === 'changeStatus'){
        data = {
          number_annexed : this.annexed,
          event_id : this.nextEventId,
          user_id : this.getUserId,
          username : this.getUsername,
          ip : this.getRemoteIp,
          type_action : 'update'
        }
      }
      return data
    }
  }
})

const socketIO = io.connect(restApiSails)
const socketSails = io.sails.connect(restApiSails)
io.sails.autoConnect = false
socketSails.reconnection = true
socketSails.reconnectionDelayMax = 5
// socketSails.timeout = 10
// socketSails.reconnectionDelay = 20

const socketAsterisk = io.connect(restApiDashboard, { 'forceNew': true })
socketAsterisk.on('connect', function() {
   if (vueFront.annexed) {
     socketAsterisk.emit('createRoom', vueFront.annexed)
   }
});

socketAsterisk.on('statusAgent',  (data) => {
  vueFront.present_status_name  = data.NameEvent
  vueFront.present_status_id    = data.EventId
})

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


