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

    loadTimeElapsed: function (index, tableDashboard) {
      setInterval(async function () {
        let horaFin = await this.getEventTime(index, tableDashboard)
        if (horaFin) {
          let horaInicio = (new Date()).getTime()
          let elapsed = differenceHours(horaInicio - horaFin)
          // console.log(index + ' - ' + elapsed)
          this.showTimeElapsed(index, elapsed, tableDashboard)
        }
      }.bind(this), 1000)
    },

    getEventTime: function (index, tableDashboard) {
      if (this.callsInbound[index] || this.others[index]) {
        if (tableDashboard) return this.callsInbound[index].inbound_start
        else return this.others[index].event_time
      }
    },

    showTimeElapsed: function (index, elapsed, tableDashboard) {
      if (this.callsInbound[index] || this.others[index]) {
        if (tableDashboard) this.callsInbound[index].timeElapsed = elapsed
        else this.others[index].timeElapsed = elapsed
      }
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
  dashboard.others = []
  socket.emit('listOther')
}

refreshDetailsCalls()

socket.on('AddCallWaiting', dataCallWaiting => {
  console.log(dataCallWaiting)
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

socket.on('RemoveOther', dataOther => removeOther(dataOther))
socket.on('UpdateOther', dataOther => updateOther(dataOther))
socket.on('AddOther', dataOther => {
    dataOther.total_calls = getTotalCalls(dataOther)
    AddOther(dataOther)
})

socket.on('RemoveOutbound', dataOutbound => removeOutbound(dataOutbound))
socket.on('UpdateOutbound', dataOutbound => updateOutbound(dataOutbound))
socket.on('AddOutbound', dataOutbound => {
  dataOutbound.total_calls = getTotalCalls(dataOutbound)
  AddOutbound(dataOutbound)
})

socket.on('RemoveInbound', dataInbound => removeInbound(dataInbound))
socket.on('UpdateInbound', dataInbound => updateInbound(dataInbound))
socket.on('AddInbound', dataInbound => {
  dataInbound.total_calls = getTotalCalls(dataInbound)
  AddInbound(dataInbound)
})

AddOther = (data) => {
  console.log(`Agregan a otros agentes el anexo : ${data.agent_annexed} `)
  data.timeElapsed = 0
  let index = (dashboard.others.length)
  dashboard.others.push(data)
  dashboard.loadTimeElapsed(index, false)
}

AddOutbound = (data) => {
  console.log(`Agregan llamadas outbound del anexo : ${data.agent_annexed} `)
  data.timeElapsed = 0
  let index = (dashboard.callsOutbound.length)
  dashboard.callsOutbound.push(data)
  // dashboard.loadTimeElapsed(index, false)
}

AddInbound = (data) => {
  console.log(`Agregan llamadas outbound del anexo : ${data.agent_annexed} `)
  data.timeElapsed = 0
  let index = (dashboard.callsInbound.length)
  dashboard.callsInbound.push(data)
  // dashboard.loadTimeElapsed(index, false)
}

updateOther = (data) => {
  console.log(`Actualizando data de otros agentes del anexo : ${data.agent_annexed} `)
  dashboard.others.forEach((item, index) => {
    if (item.agent_annexed === data.agent_annexed) {
      if (item.event_id !== data.event_id) {
        data.total_calls = getTotalCalls(data)
        dashboard.others.splice(index, 1, data)
        dashboard.loadMetricasKpi(false)
      }
    }
  })
}

updateOutbound = (data) => {
  console.log(`Actualizando data de llamadas outbound del anexo : ${data.agent_annexed} `)
  dashboard.callsOutbound.forEach((item, index) => {
    if (item.agent_annexed === data.agent_annexed) {
      if (item.event_id !== data.event_id) {
        data.total_calls = getTotalCalls(data)
        dashboard.callsOutbound.splice(index, 1, data)
        dashboard.loadMetricasKpi(false)
      }
    }
  })
}

updateInbound = (data) => {
  console.log(`Actualizando data de llamadas outbound del anexo : ${data.agent_annexed} `)
  dashboard.callsInbound.forEach((item, index) => {
    if (item.agent_annexed === data.agent_annexed) {
      if (item.event_id !== data.event_id) {
        data.total_calls = getTotalCalls(data)
        dashboard.callsInbound.splice(index, 1, data)
        dashboard.loadMetricasKpi(false)
      }
    }
  })
}

removeOther =  (data) => {
  dashboard.others.forEach((item, index) => {
    if (item.agent_annexed === data.agent_annexed) dashboard.others.splice(index, 1)
  })
}


removeOutbound =  (data) => {
  dashboard.callsOutbound.forEach((item, index) => {
    if (item.agent_annexed === data.agent_annexed) dashboard.callsOutbound.splice(index, 1)
  })
}

removeInbound =  (data) => {
  dashboard.callsInbound.forEach((item, index) => {
    if (item.agent_annexed === data.agent_annexed) dashboard.callsInbound.splice(index, 1)
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
