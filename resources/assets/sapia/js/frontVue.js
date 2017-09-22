'use strict'
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value')

const socketIO = io.connect(restApiSails)
const socketSails = io.sails.connect(restApiSails)
io.sails.autoConnect = false
socketSails.reconnection = true
socketSails.reconnectionDelayMax = 5

const socketNodejs = io.connect(restApiDashboard, {'reconnection': true, 'reconnectionAttempts': 15, 'reconnectionDelay': 9000, 'reconnectionDelayMax': 9000})

const vueFront = new Vue({
  el: '#frontAminLTE',
  data: {
    getNameProyect: '',
    getUserId: '',
    getUsername: '',
    getNameComplete: '',
    getRole: '',
    getRemoteIp: '',
    getEventName: '',
    getEventId: '',
    statusChangePassword: '',
    statusChangeAssistance: '',
    statusAddAgentDashboard: '',
    statusQueueAddAsterisk: false,
    eventStatusPause: '',
    annexedStatusAsterisk: 0,
    annexed: 0,
    srcAvatar: 'default_avatar.png',

    remotoReleaseUserId: 0,
    remotoReleaseUsername: 0,
    remotoReleaseAnnexed: 0,
    remotoReleaseStatusQueueRemove: false,
    remoteAgentHour: '',
    remoteActiveCallsUserId: '',
    remoteActiveCallsNameRole: '',

    quantityQueueAssign: 0,
    getQueuesUser: [],
    hourServer: '',
    textDateServer: '',
    dateServer: '',
    requiredAnnexed: false,
    differenceHour: '00:00:00',

    getListEvents: [],
    getAgentDashboard: [],

    assistanceTextModal: 'Entrada',
    assistanceHour: '',
    assistanceNextHour: '',

    nextEventId: '',
    nextEventName: '',
    routeAction: '/detalle_eventos/registrarDetalle',

    ModalLoading: 'modal fade',
    ModalAssistance: 'modal fade',
    ModalChangeStatus: 'modal fade',
    ModalReleasesAnnexed: 'modal fade',
    ModalConnectionNodeJs: 'modal fade',
    ModalStandByAssistance: 'modal fade',

    nodejsStatusSails: false,
    nodejsStatusAsterisk: false,

    nodejsServerName: '',
    nodejsServerMessage: '',

    titleStandBy: '',
    messageStandBy: ''
  },
  mounted () {
    this.loadVariablesGlobals()
  },
  computed:{
      getPercentageOfWeightQueue() {
          return this.getQueuesUser.map(function(item) {
              let weightAgent = item.Priority.weight_agent
              return Math.round(100/weightAgent)
          })
      },
      getColorPercentageOfWeightQueue() {
          return this.getQueuesUser.map(function(item) {
              let color
              let weightAgent = item.Priority.weight_agent
              let percentage = Math.round(100/weightAgent)
              switch (true){
                  case (percentage > 75):
                      color = 'success'
                      break
                  case (percentage > 50 && percentage <= 75):
                      color = 'primary'
                      break
                  case (percentage > 25 && percentage <= 50):
                      color = 'info'
                      break
                  case (percentage > 10 && percentage <= 25):
                      color = 'warning'
                      break
                  case (percentage > 0 && percentage <= 10):
                      color = 'danger'
                      break
                  default:
                      color = 'light-blue'
                      break
              }
              return color
          })
      }
  },
  methods: {

    sendUrlRequest: async function (url, parameters = {}) {
      try {
        let response = await this.$http.post(url, parameters)
        return response.data
      } catch (error) { return error.status }
    },

    getAvatar: function () {
      let userId = this.getUserId
      let parameters = { userID: userId }
      this.$http.post('viewUsers', parameters).then(response => {
        this.srcAvatar = response.body[0].user_profile.avatar
      }, response => console.log(response.body))
    },

    loadVariablesGlobals: async function () {
      const dataGlobals = await this.sendUrlRequest('/getVariablesGlobals')
      this.getAgentDashboard = await this.sendUrlRequest('/getAgentDashboard')

      this.annexedStatusAsterisk = this.getAgentDashboard.agent_status
      this.getEventName = this.getAgentDashboard.event_name

      this.getNameProyect = dataGlobals.getNameProyect
      this.getUserId = dataGlobals.getUserId
      this.getUsername = dataGlobals.getUsername
      this.getNameComplete = dataGlobals.getNameComplete
      this.getRole = dataGlobals.getRole
      this.getRemoteIp = dataGlobals.getRemoteIp
      this.statusChangePassword = dataGlobals.statusChangePassword
      this.statusChangeAssistance = dataGlobals.statusChangeAssistance
      this.statusQueueAddAsterisk = dataGlobals.statusQueueAddAsterisk
      this.requiredAnnexed = dataGlobals.requiredAnnexed
      this.hourServer = dataGlobals.hourServer
      this.textDateServer = dataGlobals.textDateServer
      this.dateServer = dataGlobals.dateServer
      this.annexed = dataGlobals.annexed
      this.quantityQueueAssign = dataGlobals.quantityQueueAssign
      this.getQueuesUser = dataGlobals.getQueuesUser
      this.assistanceNextHour = dataGlobals.assistanceNextHour
      currenTime()

      // Cargando image del profile_user
      this.getAvatar()

      // Verificacion de marcado de asistencia y requerimiento de cambio de contraseña
      await this.verifyAssistance()

      if (this.annexed === 0) loadModule('agents_annexed')

      if (dataGlobals) {
        if (this.getUserId && this.getNameProyect) {
          this.statusAddAgentDashboard = true
          socketNodejs.emit('createRoomFrontPanel', { nameProyect: this.getNameProyect, agent_user_id: this.getUserId})
        }

        // Cargando registro en Dahsboard
        let responseAddDashboard = await this.sendUrlRequest('/getStatusAddAgentDashboard')
        if (responseAddDashboard.statusAddAgentDashboard === false) {
          this.statusAddAgentDashboard = true
          this.getAgentDashboard = await this.sendUrlRequest('/getAgentDashboard')
          socketNodejs.emit('addUserToDashboard', this.getAgentDashboard)
        }
      }
    },

    verifyQueueAssign: function () {
      if (this.getRole === 'user') {
        if (this.quantityQueueAssign === false) {
          showNotificacion('warning', 'Usted no tiene colas asignadas.', 'Ooops!!!', 10000, false, true)
          return false
        }
        return true
      }
      return true
    },

    loadModalStatus: async function () {
      let response = ''
      let isVerifyAnnexed = false
      let isVerifyQueueAssign = this.verifyQueueAssign()
      if (isVerifyQueueAssign) isVerifyAnnexed = this.verifyAnnexed()
      if (isVerifyAnnexed) response = await this.sendUrlRequest('list_event')
      if (isVerifyAnnexed) this.getListEvents = response.getListEvents
      if (isVerifyAnnexed) this.ModalChangeStatus = 'modal show'
    },

    verifyAnnexed: function () {
      if (this.getRole === 'user') {
        if (this.requiredAnnexed) {
          if (this.annexed == 0) {
            closeNotificationBootstrap()
            showNotificacion('warning', 'Usted debe seleccionar un anexo.', 'Ooops!!!', 8000, true, true)
            return false
          }
          return true
        }
        return false
      }
      return true
    },

    defineRoute: function (event) {
      switch (event) {
        case 'changeStatus' :
          if (this.getRole === 'user') {
            (this.statusQueueAddAsterisk === true) ? this.routeAction = '/detalle_eventos/queuePause' : this.routeAction = '/detalle_eventos/queueAdd'
          } else this.routeAction = '/detalle_eventos/registrarDetalle'
          break
        case 'releasesAnnexed' :
          this.routeAction = '/anexos/liberarAnexoOnline'
          break
        case 'assignAnnexed' :
          this.routeAction = '/anexos/asignarAnexo'
          break
        case 'disconnectAgent' :
          (this.statusQueueAddAsterisk === true) ? this.routeAction = '/detalle_eventos/queueRemove' : this.routeAction = '/anexos/logout'
          break
        case 'checkAssistance' :
          this.routeAction = '/detalle_eventos/registerAssistence'
          break
      }
    },

    changeStatus: function (eventId, eventName, eventStatusPause) {
      this.ModalChangeStatus = 'modal fade'
      this.defineRoute('changeStatus')
      this.nextEventId = eventId
      this.nextEventName = eventName
      this.eventStatusPause = eventStatusPause
      this.remoteAgentHour = this.hourServer
      let parameters = this.loadParameters('changeStatus')
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
    },

    assignAnnexed: function () {
      this.defineRoute('assignAnnexed')
      this.nextEventId = this.getEventId
      this.nextEventName = this.getEventName
      let parameters = this.loadParameters('assignAnnexed')
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
      loadModule('agents_annexed')
    },

    liberarAnexos: function () {
      if (this.annexed != 0) this.ModalReleasesAnnexed = 'modal show'
      else showNotificacion('warning', 'No tiene un anexo asignado', 'Warning', 10000, false, true)
    },

    releasesAnnexed: function () {
      this.defineRoute('releasesAnnexed')
      this.nextEventId = 11
      this.nextEventName = 'Login'
      this.remoteAgentHour = this.hourServer
      this.annexed = 0
      let parameters = this.loadParameters('releasesAnnexed')
      vueFront.ModalReleasesAnnexed = 'modal fade'
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
      loadModule('agents_annexed')
    },

    activeCalls: async function () {
      let parametersRole = this.loadParameters('activeCalls')
      let response = await this.sendUrlRequest('saveformchangeRole', parametersRole)
      closeNotificationBootstrap()
      if (response.message === 'Success') {
        if (this.getUserId === this.remoteActiveCallsUserId) {
          this.getRole = this.remoteActiveCallsNameRole
          this.statusQueueAddAsterisk = false
          this.remoteActiveCallsNameRole = ''
          this.remoteActiveCallsUserId = ''
        }
        showNotificacion('success', 'El cambio de rol se realizo exitosamente !!!', 'Success', 5000, false, true)
      } else {
        showNotificacion('error', 'Problemas a la  hora de actualizar el rol en la base de datos', 'Error', 10000, false, true)
      }
    },

    disconnectAgent: function () {
      this.defineRoute('disconnectAgent')
      this.nextEventId = 15
      this.nextEventName = 'Desconectado'
      let parameters = this.loadParameters('disconnectAgent')
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
    },

    verifyAssistance: async function () {
      if (this.statusChangeAssistance === true) this.loadModalCheckAssistance()
      else if (this.statusChangeAssistance != false) {
        this.titleStandBy = 'Ventana de Conexión'
        this.messageStandBy = 'Usted ingresara al menú del sistema en :'
        this.loadModalStandByAssistance()
      } else checkPassword()
    },

    loadModalCheckAssistance: async function () {
      let rankHours = await rangoHoras(this.hourServer)
      this.assistanceHour = rankHours[1]
      this.assistanceNextHour = rankHours[2]
      this.ModalAssistance = 'modal show'
    },

    loadModalStandByAssistance: function () {
      this.titleStandBy = 'Ventana de Conexión'
      this.messageStandBy = 'Usted ingresara al menú del sistema en :'
      this.ModalStandByAssistance = 'modal show'
      let refreshIntervalStandBy = setInterval(() => {
        this.differenceHour = restarHoras(this.hourServer, this.assistanceNextHour)
        if (this.hourServer >= this.assistanceNextHour) {
          clearInterval(refreshIntervalStandBy)
          this.ModalStandByAssistance = 'modal fade'
          checkPassword()
        }
      }, 1000)
    },

    checkAssistance: function () {
      let route = (this.assistanceTextModal === 'Entrada') ? 'checkAssistance' : 'disconnectAgent'
      this.defineRoute(route)
      if (route == 'checkAssistance') {
        this.nextEventId = 11
        this.nextEventName = 'Login'
      }
      let parameters = this.loadParameters(route)
      ajaxNodeJs(parameters, this.routeAction, true, 2000)
      this.ModalAssistance = 'modal fade'
    },

    loadParameters: function (actionEvent) {
      let data = []

      if (actionEvent === 'activeCalls') {
        if (this.remoteActiveCallsNameRole === '') data = { nameRole: this.getRole, userId: this.getUserId }
        else data = {nameRole: this.remoteActiveCallsNameRole, userId: this.remoteActiveCallsUserId }
        return data
      }

      data = {
        userID: (this.remotoReleaseUserId === 0) ? this.getUserId : this.remotoReleaseUserId,
        username: (this.remotoReleaseUsername === 0) ? this.getUsername : this.remotoReleaseUsername,
        userRol: this.getRole,
        eventID: this.getEventId,
        eventName: this.getEventName,
        eventNextID: this.nextEventId,
        eventNextName: this.nextEventName,
        eventFechaHora: `${this.dateServer} ${this.remoteAgentHour}`,
        eventDateReally: `${this.dateServer} ${this.hourServer}`,
        eventIPCliente: this.getRemoteIp,
        eventAnnexed: (this.remotoReleaseAnnexed === 0) ? this.annexed : this.remotoReleaseAnnexed,
        typeActionPostRequest: actionEvent,
        eventStatusPause: this.eventStatusPause,
        statusQueueRemove: (this.remotoReleaseStatusQueueRemove === false) ? this.statusQueueAddAsterisk : this.remotoReleaseStatusQueueRemove
      }
      return data
    }
  }
})

socketNodejs.on('connect', function () {
  vueFront.nodejsServerName = 'Servidor Nodejs'
  vueFront.ModalConnectionNodeJs = 'modal fade'
  vueFront.nodejsServerMessage = 'Acabas de conectar con el Servidor Nodejs'
  console.log('Socket Asterisk connected!')
})

socketNodejs.on('connect_error', function () {
  vueFront.nodejsServerName = 'Servidor Nodejs'
  vueFront.ModalConnectionNodeJs = 'modal show'
  let i = 9
  let refreshIntervalId = setInterval(() => {
    vueFront.nodejsServerMessage = `Fallo la conexión con el socket del Server NodeJS volveremos a reintentar en ${i} segundos!!!`
    i--
    if (i === 0) clearInterval(refreshIntervalId)
  }, 1000)
  console.log('socketNodejs Connection Failed')
})

socketNodejs.on('disconnect', function () {
  vueFront.nodejsServerName = 'Servidor Nodejs'
  vueFront.ModalConnectionNodeJs = 'modal show'
  vueFront.nodejsServerMessage = 'Acabas de perder conexión con el socket del Server Nodejs !!!'
  console.log('socketNodejs Disconnected')
})

// Cambia la etiqueta de estado actual cuando este recibe o realiza un llamada
socketNodejs.on('statusAgent', (data) => {
  vueFront.sendUrlRequest('/updateStatusAddAgentDashboard')
  vueFront.statusAddAgentDashboard = data.statusAddAgentDashboard
  vueFront.getEventName = data.eventName
  vueFront.getEventId = data.eventId
  vueFront.annexedStatusAsterisk = data.annexedStatusAsterisk
  vueFront.nextEventId = ''
  vueFront.nextEventName = ''
})

// Cambia la etiqueta del estado actual cada vez que realiza un cambio de estado
socketSails.on('statusSails', function (data) {
  vueFront.ModalLoading = 'modal fade'
  vueFront.getEventName = data.eventName
  vueFront.getEventId = data.eventId
  vueFront.nextEventId = ''
  vueFront.nextEventName = ''
})

socketSails.on('connect', function () {
  vueFront.nodejsServerName = 'Servidor Sails'
  vueFront.ModalConnectionNodeJs = 'modal fade'
  vueFront.nodejsServerMessage = 'Acabas de conectar con el Servidor Sails'
  console.log('Socket Sails.io connected!')
})

socketSails.on('disconnect', function () {
  vueFront.nodejsServerName = 'Servidor Sails'
  vueFront.ModalConnectionNodeJs = 'modal show'
  vueFront.nodejsServerMessage = 'Acabas de perder conexión con el Servidor Sails'
  console.log('Socket Sails.io desconectado!')
})
