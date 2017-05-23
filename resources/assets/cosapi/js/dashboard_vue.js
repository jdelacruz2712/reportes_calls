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
        const horaBD = await this.getEventTime(index, dataDashboard, namePanel)
        const horaActual = (new Date()).getTime()
        const elapsed = differenceHours(horaActual - horaBD)
        const estado = dataDashboard[index].event_name
        console.log(index + ' - '+ horaBD + ' - ' + estado + ' - ' + elapsed)
        dataDashboard[index].timeElapsed = elapsed
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

socket.on('RemoveOther', dataOther => removeDataDashboard(dataOther, dashboard.others))
socket.on('UpdateOther', dataOther => updateDataDashboard(dataOther, dashboard.others))
socket.on('AddOther', dataOther => AddDataDashboard(dataOther, dashboard.others, 'AddOther'))

socket.on('RemoveOutbound', dataOutbound => removeDataDashboard(dataOutbound, dashboard.callsOutbound))
socket.on('UpdateOutbound', dataOutbound => updateDataDashboard(dataOutbound, dashboard.callsOutbound))
socket.on('AddOutbound', dataOutbound => AddDataDashboard(dataOutbound, dashboard.callsOutbound, 'AddOutbound'))

socket.on('RemoveInbound', dataInbound => removeDataDashboard(dataInbound, dashboard.callsInbound))
socket.on('UpdateInbound', dataInbound => updateDataDashboard(dataInbound, dashboard.callsInbound))
socket.on('AddInbound', dataInbound => AddDataDashboard(dataInbound, dashboard.callsInbound, 'AddInbound'))

AddDataDashboard = (data, dataDashboard, namePanel) => {
  let index = (dataDashboard.length)
  data.total_calls = getTotalCalls(data)
  dataDashboard.push(data)
  dashboard.loadTimeElapsed(index, dataDashboard, namePanel)
}

updateDataDashboard = (data, dataDashboard) => {
  dataDashboard.forEach((item, index) => {
    if (item.agent_name === data.agent_name) {
      if (item.event_id !== data.event_id) {
        data.total_calls = getTotalCalls(data)
        dataDashboard.splice(index, 1, data)
        dashboard.loadMetricasKpi(false)
      }
      item.agent_annexed = data.agent_annexed
      item.event_name = data.event_name
    }
  })
}

removeDataDashboard =  (data, dataDashboard) => {
  dataDashboard.forEach((item, index) => {
    if (item.agent_name === data.agent_name) dataDashboard.splice(index, 1)
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
