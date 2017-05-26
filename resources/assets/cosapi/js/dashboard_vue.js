Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value')
const socket = io.connect(restApiDashboard, { 'forceNew': true })
const dashboard = new Vue({
  el: '#dashboard',
  data: {
    callsInbound: [],
    callsOutbound: [],
    callsWaiting: [],
    others: [],

    slaDay: '0',
    answered: '0',
    abandoned: '0',
    totalCallsWaiting: '0',

    answeredTime: '0',
    abandonedTime: '0',

    abandonedSymbol: '',
    answeredSymbol: '',

    abandonedSecond: '',
    answeredSecond: ''
  },
  mounted () {
    this.loadMetricasKpi(true)
  },
  methods: {
    loadMetricasKpi: async function (viewLoad) {
      if (viewLoad) {
        this.answered = '-'
        this.abandoned = '-'
        this.answeredTime = '-'
        this.abandonedTime = '-'
        this.slaDay = '-'
      }

      await this.loadAnswered()
      await this.loadAbandoned()
      await this.loadAnsweredTime()
      await this.loadAbandonedTime()
      await this.loadSlaDay()
    },

    loadTimeElapsed: function (index, dataDashboard, namePanel) {
      setInterval(async function () {
        if (dataDashboard[index]){
          const horaBD = await this.getEventTime(index, dataDashboard, namePanel)
          const horaActual = (new Date()).getTime()
          const elapsed = differenceHours(horaActual - horaBD)
          dataDashboard[index].timeElapsed = elapsed
        }
      }.bind(this), 1000)
    },

    getEventTime: function (index, dataDashboard, namePanel) {
        if (namePanel === 'AddInbound') return dataDashboard[index].inbound_start
        if (namePanel === 'AddOutbound') return dataDashboard[index].outbound_start
        if (namePanel === 'AddOther') return dataDashboard[index].event_time
    },

    loadTimeElapsedEncoladas: function (index) {
      let calcular = () => {
        let horaInicio = (new Date()).getTime()
        let horaFin = this.callsWaiting[index].start_call
        this.callsWaiting[index].timeElapsed = differenceHours(horaInicio - horaFin)
      }
      setInterval(calcular(), 1000)
    },

    sendUrlRequest: async function (url, type, actionTime = false) {
      let parameters = {
        type: type,
        time: actionTime
      }
      let response = await this.$http.post(url, parameters)
      return response.data
    },

    loadAnswered: async function () {
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_completed')
      this.answered = response.message
    },

    loadAbandoned: async function () {
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_abandone')
      this.abandoned = response.message
    },

    loadAnsweredTime: async function () {
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_completed', 'true')
      this.answeredTime = response.message
      this.answeredSecond = response.time
      this.answeredSymbol = response.symbol
    },

    loadAbandonedTime: async function () {
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_abandone', 'true')
      this.abandonedTime = response.message
      this.abandonedSecond = response.time
      this.abandonedSymbol = response.symbol
    },

    loadSlaDay: function () {
      let answered = this.answered
      let answeredTime = this.answeredTime
      this.slaDay = 0
      if (answered !== 0) this.slaDay = ((answeredTime * 100) / answered).toFixed(2)
    },

    loadCallWaiting: function () {
      // this.queue = 15
    }
  }
})

// Refresca la informacion de la tabla de DetailsCalls
const refreshDetailsCalls = () => {
  dashboard.callsInbound = []
  dashboard.callsOutbound = []
  dashboard.callsWaiting = []
  dashboard.others = []
  socket.emit('listDataDashboard')
}

refreshDetailsCalls()

socket.on('AddCallWaiting', dataCallWaiting => {
  dashboard.callsWaiting.push(dataCallWaiting)
  dashboard.totalCallsWaiting = (dashboard.callsWaiting).length
})

socket.on('RemoveCallWaiting', dataCallWaiting => {
  let numberPhone = dataCallWaiting
  dashboard.callsWaiting.forEach((item, index) => {
    if (item.number_phone === numberPhone) dashboard.callsWaiting.splice(index, 1)
  })
  dashboard.totalCallsWaiting = (dashboard.callsWaiting).length
})

socket.on('RemoveOther', dataOther => removeDataDashboard(dataOther, dashboard.others,'others'))
socket.on('UpdateOther', dataOther => updateDataDashboard(dataOther, dashboard.others, 'AddOther','others'))
socket.on('AddOther', dataOther => AddDataDashboard(dataOther, dashboard.others, 'AddOther','others'))

socket.on('RemoveOutbound', dataOutbound => removeDataDashboard(dataOutbound, dashboard.callsOutbound))
socket.on('UpdateOutbound', dataOutbound => updateDataDashboard(dataOutbound, dashboard.callsOutbound))
socket.on('AddOutbound', dataOutbound => AddDataDashboard(dataOutbound, dashboard.callsOutbound, 'AddOutbound'))

socket.on('RemoveInbound', dataInbound => removeDataDashboard(dataInbound, dashboard.callsInbound))
socket.on('UpdateInbound', dataInbound => updateDataDashboard(dataInbound, dashboard.callsInbound))
socket.on('AddInbound', dataInbound => AddDataDashboard(dataInbound, dashboard.callsInbound, 'AddInbound'))

AddDataDashboard =  (data, dataDashboard, namePanel, variableVue = '') => {
  let index = (dataDashboard.length)
  data.total_calls = getTotalCalls(data)
  dataDashboard.push(data)
  orderDashboard(dataDashboard,variableVue)
  dashboard.loadTimeElapsed(index, dataDashboard, namePanel)
}

updateDataDashboard = (data, dataDashboard, namePanel, variableVue = '') => {
  dataDashboard.forEach((item, index) => {
    if (item.agent_name === data.agent_name) {
      if (item.event_id !== data.event_id) {
        data.total_calls = getTotalCalls(data)
        dataDashboard.splice(index, 1, data)
        dashboard.loadMetricasKpi(false)
        dashboard.loadTimeElapsed(index, dataDashboard, namePanel)
      }
      item.agent_annexed = data.agent_annexed
      item.event_name = data.event_name
      orderDashboard(dataDashboard,variableVue)
    }
  })
}

removeDataDashboard =  (data, dataDashboard, variableVue = '') => {
  dataDashboard.forEach((item, index) => {
    if (item.agent_name === data.agent_name){
      dataDashboard.splice(index, 1)
      orderDashboard(dataDashboard,variableVue)
    }
  })
}

getTotalCalls = async (data) => {
  let response = await dashboard.sendUrlRequest('dashboard_01/getQuantityCalls', 'calls_completed', data.name_agent)
  return response.message
}

differenceHours = (s) => {
  function addZ (n) { return (n < 10 ? '0' : '') + n }

  let ms = s % 1000
  s = (s - ms) / 1000
  let secs = s % 60
  s = (s - secs) / 60
  let mins = s % 60
  let hrs = (s - mins) / 60

  return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)
}

const orderDashboard = async (dataDashboard,variableVue) => {
  if(variableVue !== ''){
    let newObject = await orderObjects(dataDashboard, 'agent_name') // Ordena alfabeticamente
    newObject = await orderObjects(newObject, 'event_id', getRulers('event_id')) //Ordena por regla establecida
    eval('dashboard.'+ variableVue +'= newObject')
  }
}

const orderObjects = (object, column, rulers = '') => {
  let newObject = []
  let indexObject = []
  object.forEach(function (objectPrimary, indexPrimary, arrPrimary) {
    menorIndex = indexPrimary
    menorObject = objectPrimary
    object.forEach((objectSecond, indexSecond, arrSecond) => {
      if (indexObject.indexOf(menorIndex) < 0) {
        if (indexObject.indexOf(indexSecond) < 0) {
          if (menorIndex != indexSecond) {
            let primervalor = (rulers !== '') ? rulers[menorObject[column]] : menorObject[column]
            let segundovalor = (rulers !== '') ? rulers[objectSecond[column]] : objectSecond[column]
            if (primervalor === segundovalor) {
              if (indexSecond > menorIndex) {
                menorIndex = menorIndex
                menorObject = menorObject
              } else {
                menorIndex = indexSecond
                menorObject = objectSecond
              }
            } else if (primervalor > segundovalor) {
              menorIndex = indexSecond
              menorObject = objectSecond
            }
          }
        }
      } else {
        menorIndex = indexSecond
        menorObject = objectSecond
      }
    })
    indexObject.push(menorIndex)
    newObject[indexPrimary] = menorObject
  })
  return newObject
}

const getRulers = (action) => {
  let rulers = ''
  if (action === 'event_id'){
    rulers = {
      '12'  : 1,  // Ring Inbound
      '16'  : 2,  // Hold Inbound
      '8'   : 3,  // Inbound
      '13'  : 4,  // Ring Outbound
      '17'  : 5,  // Hold Outbound
      '9'   : 6,  // Outbound
      '1'   : 7,  // ACD
      '7'   : 8,  // Gestión BackOffice
      '2'   : 9,  // Break
      '4'   : 10, // Refrigerio
      '3'   : 11, // SSHH
      '5'   : 12, // Feedback
      '6'   : 13, // Capacitación
      '11'  : 14  //Login
    }
  }
  return rulers
}
