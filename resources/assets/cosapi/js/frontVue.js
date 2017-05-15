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
    getEventName : '',
    getEventId : '',
    statusChangePassword : '',
    statusChangeAssistance : '',
    statusAddAgentDashboard : '',
    annexed : 0,
    srcAvatar :'default_avatar.png',

    remotoReleaseUserId : 0,
    remotoReleaseUsername : 0,
    remotoReleaseAnnexed : 0,
    remotoReleaseStatusQueueRemove : false,
    remoteDisconnectAgentHour : '',
    remoteActiveCallsUserId : '',
    remoteActiveCallsNameRole : '',

    quantityQueueAssign : 0,
    statusQueueAddAsterisk : false,
    hourServer : '',
    textDateServer : '',
    dateServer : '',
    requiredAnnexed : false,

    getListEvents : [],
    getAgentDashboard : [],

    assistanceTextModal : 'Entrada',
    assistanceHour : '',
    assistanceNextHour : '',

    nextEventId : '',
    routeAction : '/detalle_eventos/registrarDetalle',

    ModalChangeStatus : 'modal fade',
    ModalReleasesAnnexed : 'modal fade',
    ModalAssistance : 'modal fade'
  },
  mounted(){
    this.loadVariablesGlobals()
  },
  methods :{

    sendUrlRequest : async function (url,parameters = {}){
      let response = await this.$http.post(url,parameters)
      return response.data
    },

    getAvatar : function (){
      let userId = this.getUserId
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
      this.statusAddAgentDashboard = response.statusAddAgentDashboard
      this.requiredAnnexed = response.requiredAnnexed
      this.hourServer = response.hourServer
      this.textDateServer = response.textDateServer
      this.dateServer = response.dateServer
      this.annexed = response.annexed
      this.quantityQueueAssign = response.quantityQueueAssign
      this.getAgentDashboard = response.getAgentDashboard
      await fechaActual()
      await horaActual()

      //await this.verifyAssistance()

      if (this.annexed === 0 ) loadModule('agents_annexed')

      // Setea la etiqueta del estado actual cada vez que actualicen la pantalla del sistema
      let parameters = {user_id: this.getUserId}
      ajaxNodeJs(parameters, '/detalle_eventos/getstatus', true)

      //Verificacion de marcado de asistencia y requerimiento de cambio de contraseña
      MarkAssitance(this.getUserId, this.dateServer, this.hourServer, 'Entrada')

      //Cargando image del profile_user
      this.getAvatar()

      //Cargando registro en Dahsboard
      if(this.statusAddAgentDashboard === false) {
        socketAsterisk.emit('createUserDashboard', this.getAgentDashboard)
      }
    },

    verifyQueueAssign : function(){
      if (this.getRole === 'user') {
        if(this.quantityQueueAssign === false) {
          mostrar_notificacion('warning', 'Usted no tiene colas asignadas.', 'Ooops!!!', 10000, false, true)
          return false
        }
        return true
      }
      return true
    },

    loadModalStatus : async  function (){
      let response = ''
      let isVerifyAnnexed = false
      let isVerifyQueueAssign  = this.verifyQueueAssign()
      if (isVerifyQueueAssign) isVerifyAnnexed = this.verifyAnnexed()
      if (isVerifyAnnexed) response = await this.sendUrlRequest('list_event')
      if (isVerifyAnnexed) this.getListEvents = response.getListEvents
      if (isVerifyAnnexed) this.ModalChangeStatus = 'modal show'
    },

    verifyAnnexed : function(){
      if (this.getRole === 'user') {
        if(this.requiredAnnexed) {
          if (this.annexed == 0){
            closeNotificationBootstrap()
            mostrar_notificacion('warning', 'Usted debe seleccionar un anexo.', 'Ooops!!!', 10000, false, true)
            return false
          }
          return true
        }
        return false
      }
      return true
    },

    defineRoute : function(event){
        switch (event){
          case 'changeStatus' :
            if (this.getRole === 'user') {
              (this.statusQueueAddAsterisk === true)? this.routeAction = '/detalle_eventos/QueuePause' : this.routeAction = '/detalle_eventos/cambiarEstado'
            }else{
              this.routeAction = '/detalle_eventos/registrarDetalle'
            }
            break
          case 'releasesAnnexed' :
            this.routeAction = '/anexos/liberarAnexo'
            break
          case 'assignAnnexed' :
            this.routeAction = '/anexos/updateAnexo'
            break
          case 'disconnectAgent' :
            (this.statusQueueAddAsterisk === true)? this.routeAction = '/detalle_eventos/queueLogout' : this.routeAction = '/anexos/Logout'
            break
        }

    },

    changeStatus : function (eventId){
      this.ModalChangeStatus = 'modal fade'
      this.defineRoute('changeStatus')
      this.nextEventId = eventId
      let parameters = this.loadParameters('changeStatus')
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
    },

    assignAnnexed : function (){
      this.defineRoute('assignAnnexed')
      let parameters = this.loadParameters('assignAnnexed')
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
      loadModule('agents_annexed')
    },

    releasesAnnexed : function (){
      this.defineRoute('releasesAnnexed')
      let parameters = this.loadParameters('releasesAnnexed')
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
      loadModule('agents_annexed')
    },

    activeCalls : async function (){
      let parametersRole = this.loadParameters('activeCalls')
      let response = await this.sendUrlRequest('modifyRole',parametersRole)
      closeNotificationBootstrap()
      if(response === 1 ) {
        if(this.getUserId === this.remoteActiveCallsUserId) {
          this.getRole = this.remoteActiveCallsNameRole
          this.statusQueueAddAsterisk = false
          this.remoteActiveCallsNameRole = ''
          this.remoteActiveCallsUserId = ''
        }
        mostrar_notificacion('success', 'El cambio de rol se realizo exitosamente !!!', 'Success', 5000, false, true)
      }
      else {
        mostrar_notificacion('error', 'Problemas a la  hora de actualizar el rol en la base de datos', 'Error', 10000, false, true)
      }
    },

    disconnectAgent : function (){
      this.defineRoute('disconnectAgent')
      let parameters = this.loadParameters('disconnectAgent')
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
    },

    verifyAssistance : async function(){
      if(this.statusChangePassword === true){
        this.loadModalCheckAssistance()
      }else if(this.statusChangePassword != false){
        this.showStandByAssistanceModal = 'modal show'
        this.loadModalStandByAssistance()
      }
    },

    loadModalCheckAssistance : async function (){
      let rankHours = await rangoHoras(this.hourServer)
      this.assistanceHour = rankHours[1]
      this.assistanceNextHour = rankHours[2]
      this.ModalAssistance = 'modal show'
    },

    loadModalStandByAssistance : function (){
      setInterval(function(){
        let differenceHour = restarHoras(this.assistanceNextHour, this.hourServer)
        if (this.hourServer >= this.assistanceNextHour) this.showStandByAssistanceModal = 'modal fade'
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
          type_action : 'changeStatus'
        }
      }

      if (actionEvent === 'assignAnnexed'){
        data = {
          number_annexed : this.annexed,
          user_id : this.getUserId,
          username: this.getUsername,
          userRol: this.getRole,
          type_action : 'assignAnnexed'
        }
      }

      if (actionEvent === 'releasesAnnexed'){
        data = {
          user_id : (this.remotoReleaseUserId === 0)? this.getUserId : this.remotoReleaseUserId,
          number_annexed : (this.remotoReleaseAnnexed === 0)? this.annexed : this.remotoReleaseAnnexed,
          username : (this.remotoReleaseUsername === 0)? this.getUsername : this.remotoReleaseUsername,
          event_id : 11,
          event_name : 'Login',
          ip : this.getRemoteIp,
          statusQueueRemove : (this.remotoReleaseStatusQueueRemove === false)? this.statusQueueAddAsterisk : this.remotoReleaseStatusQueueRemove,
          type_action : 'releasesAnnexed'
        }
      }

      if(actionEvent === 'disconnectAgent'){
        data = {
          user_id: this.getUserId,
          hour_exit: this.dateServer+ ' ' + this.remoteDisconnectAgentHour,
          number_annexed: this.annexed,
          username : this.getUsername,
          event_id: 15,
          ip: this.getRemoteIp,
          event_name : 'Desconectado',
          type_action: 'disconnectAgent'

        }
      }

      if(actionEvent === 'activeCalls'){
        if(this.remoteActiveCallsNameRole === ''){
          data = {
            nameRole : this.getRole,
            userId : this.getUserId
          }
        }else{
          data = {
            nameRole : this.remoteActiveCallsNameRole,
            userId : this.remoteActiveCallsUserId
          }
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

const socketAsterisk = io.connect(restApiDashboard, { 'forceNew': true })
socketAsterisk.on('connect', function() {
   if (vueFront.annexed) {
     socketAsterisk.emit('createRoom', vueFront.annexed)
   }
});

socketAsterisk.on('statusAgent',  (data) => {
  vueFront.sendUrlRequest('/updateStatusAddAgentDashboard')
  vueFront.statusAddAgentDashboard = data.statusAddAgentDashboard
  vueFront.getEventName = data.eventName
  vueFront.getEventId = data.eventId
})

// Cambia la etiqueta del estado actual cada vez que realiza un cambio de estado
socketSails.on('statusSails', function (data) {
  $('#myModalLoading').modal('hide')
  vueFront.getEventName = data.eventName
  vueFront.getEventId = data.eventId
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
