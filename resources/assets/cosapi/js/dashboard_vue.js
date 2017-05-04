Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value')
const socket = io.connect(restApiDashboard, { 'forceNew': true })
const dashboard = new Vue({
  el: '#dashboard',
  data: {
    agents: [],
    encoladas: [],
    otherAgents: [],

    slaDay: '0',
    answered: '0',
    abandoned: '0',
    callWaiting: '0',

    answeredTime: '0',
    abandonedTime: '0',

    abandonedSymbol: '',
    answeredSymbol: '',

    abandonedSecond: '',
    answeredSecond: ''
  },
  mounted(){
    this.loadMetricasKpi(true)
  },
  methods:{
    loadMetricasKpi:  async function (viewLoad){
      if (viewLoad) {
        this.answered = '-'
        this.abandoned = '-'
        this.answeredTime = '-'
        this.abandonedTime = '-'
        this.slaDay   = '-'
      }

      let answered = await this.loadAnswered()
      let abandoned = await this.loadAbandoned()
      let answeredTime = await this.loadAnsweredTime()
      let abandonedTime = await this.loadAbandonedTime()
      let slaDay = await this.loadSlaDay()
    },

    loadTimeElapsed: function(index, tableDashboard){
      setInterval(async function(){
        let horaFin = await this.getEventTime(index, tableDashboard)
        if (horaFin) {
          let horaInicio =  (new Date()).getTime()
          let elapsed = restarHoras(horaInicio - horaFin)
          //console.log(index + ' - ' +horaFin)
          this.showTimeElapsed(index, elapsed, tableDashboard)
        }
      }.bind(this), 1000)
    },

    getEventTime: function (index, tableDashboard){
      if (this.agents[index] || this.otherAgents[index]) {
        if (tableDashboard) return this.agents[index].inbound_start
        else return this.otherAgents[index].event_time
      }
    },

    showTimeElapsed: function(index, elapsed, tableDashboard){
      if (this.agents[index] || this.otherAgents[index] ){
        if (tableDashboard) {
          this.agents[index].timeElapsed = elapsed
        } else {
          this.otherAgents[index].timeElapsed = elapsed
        }
      }
    },

    loadTimeElapsedEncoladas: function(index){
      let calcular = () => {
        console.log(index)
        let horaInicio =  (new Date()).getTime()
        let horaFin = this.encoladas[index].start_call
        this.encoladas[index].timeElapsed = restarHoras(horaInicio - horaFin)
      }
      setInterval(calcular(), 1000)
    },

    sendUrlRequest: async function (url, type, actionTime = false){
      let parameters = {
        type : type,
        time : actionTime
      }
      let response = await this.$http.post(url, parameters)
      return response.data
    },

    loadAnswered: async function(){
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_completed')
      this.answered = response.message
    },

    loadAbandoned: async function(){
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_abandone')
      this.abandoned = response.message
    },

    loadAnsweredTime: async function(){
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_completed', 'true')
      this.answeredTime = response.message
      this.answeredSecond = response.time
      this.answeredSymbol = response.symbol
    },

    loadAbandonedTime: async function(){
      let response = await this.sendUrlRequest('dashboard_01/getEventKpi', 'calls_abandone', 'true')
      this.abandonedTime = response.message
      this.abandonedSecond = response.time
      this.abandonedSymbol = response.symbol
    },

    loadSlaDay: function(){
      answered      = this.answered
      answeredTime  = this.answeredTime
      this.slaDay   = 0
      if (answered !== 0) this.slaDay = ((answeredTime * 100)/answered).toFixed(2)
    },

    loadCallWaiting: function(){
      //this.queue = 15
    }
  }
})


//Refresca la informacion de la tabla de DetailsCalls
const refreshDetailsCalls = () => {
  dashboard.agents = []
  dashboard.otherAgents = []
  socket.emit('listAgentConnect')
}

refreshDetailsCalls()

socket.on('AddCallWaiting', data => {
  dashboard.encoladas.push(data.CallWaiting)
  dashboard.callWaiting = (dashboard.encoladas).length
})

socket.on('RemoveCallWaiting', data => {
  let numberPhone = data.CallWaiting
  dashboard.encoladas.forEach((item, index) => {
    if (item.number_phone === numberPhone) dashboard.encoladas.splice(index, 1)
  })
  dashboard.callWaiting = (dashboard.encoladas).length
})


socket.on('QueueMemberAdded', data => {
  let getTotalCalls = async () =>{
    let response = await dashboard.sendUrlRequest('dashboard_01/getQuantityCalls', 'calls_completed',data.QueueMemberAdded['name_agent'])
    let dataAgent = data.QueueMemberAdded
    dataAgent.total_calls = response.message
    let actionPush = await updateDataAgent(dataAgent)
    if (actionPush === true)  addAgentDashboard(dataAgent)
  }
  getTotalCalls()
})

socket.on('QueueMemberRemoved', data => {
  removeDataAgent(data.NumberAnnexed)
})

socket.on('QueueMemberChange', data => {
  let dataAgent = data.QueueMemberChange
  updateDataAgent(dataAgent)
  if (dataAgent.event_id != 11) dashboard.loadTimeElapsed((dashboard.agents.length)-1)
})

function addAgentDashboard(data){
  data.timeElapsed = 0

  if (data.event_id === 8 || data.event_id === 9)  {
    let index = (dashboard.agents.length)-1
    dashboard.agents.push(data)
    dashboard.loadTimeElapsed(index,true)
  }
  else {
    let index = (dashboard.otherAgents.length)
    dashboard.otherAgents.push(data)
    dashboard.loadTimeElapsed(index,false)
  }
}

function updateDataAgent(dataAgent){
  let actionPush = true
  let agentAnnexed = dataAgent.agent_annexed
  let eventId = dataAgent.event_id
  dashboard.otherAgents.forEach((item, index) => {
    if (item.agent_annexed === agentAnnexed) {
      actionPush = false
      if (item.event_id != eventId) {
        let getTotalCalls = async () =>{
          let response = await dashboard.sendUrlRequest('dashboard_01/getQuantityCalls', 'calls_completed',dataAgent.name_agent)
          dataAgent.total_calls = response.message
        }
        getTotalCalls()
        dashboard.otherAgents.splice(index, 1, dataAgent)
        dashboard.loadMetricasKpi(false)
      }
    }
  })

  return actionPush
}

function removeDataAgent (agentAnnexed) {
  dashboard.otherAgents.forEach((item, index) => {
    if (item.agent_annexed === agentAnnexed ) dashboard.otherAgents.splice(index, 1)
  })
}

function restarHoras (s) {
  function addZ(n) { return (n<10? '0':'') + n }

  let ms = s % 1000
  s = (s - ms) / 1000
  let secs = s % 60
  s = (s - secs) / 60
  let mins = s % 60
  let hrs = (s - mins) / 60

  return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)
}
