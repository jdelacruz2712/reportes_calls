Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value')

const vm = new Vue({
  el: '#detail_agents',
  data: {
    agents: []
  }
})

var kpi = new Vue({
  el: '#kpi',
  data: {
    answered: '-',
    answeredTime: '-',
    abandonedTime: '-',
    abandoned: '-',
    slaDay: '-',
    queue: '-',
    abandonedSymbol: '',
    abandonedSecond: '',
    answeredSymbol: '',
    answeredSecond: ''
  },
  mounted(){
    this.loadAnswered()
    this.loadAbandoned()
    this.loadAnsweredTime()
    this.loadAbandonedTime()
    this.loadSlaDay()
    //this.loadQueue()
  },
  methods:{
    loadAnswered: function(){
      this.answered = '-'
      let parameters = {type : 'calls_completed'}
      this.$http.post('dashboard_01/getEventKpi',parameters).then(response => {
        this.answered = response.data.message
        this.loadSlaDay()
      },response =>{
        console.log(response.body.message)
      })
    },
    loadAbandoned: function(){
      this.abandoned = '-'
      let parameters = {type : 'calls_abandone'}
      this.$http.post('dashboard_01/getEventKpi',parameters).then(response => {
        this.abandoned = response.data.message
        this.loadSlaDay()
      },response =>{
        console.log(response.body.message)
      })
    },
    loadAnsweredTime: function(){
      this.answeredTime = '-'
      let parameters = {
        type : 'calls_completed',
        time : 'true'
      }
      this.$http.post('dashboard_01/getEventKpi',parameters).then(response => {
        this.answeredTime = response.data.message
        this.answeredSecond = response.data.time
        this.answeredsymbol = response.data.symbol
        this.loadSlaDay()
      },response =>{
        console.log(response.body.message)
      })
    },
    loadAbandonedTime: function(){
      this.abandonedTime = '-'
      let parameters = {
        type : 'calls_abandone',
        time : 'true'
      }
      this.$http.post('dashboard_01/getEventKpi',parameters).then(response => {
        this.abandonedTime = response.data.message
        this.abandonedSecond = response.data.time
        this.abandonedsymbol = response.data.symbol

      },response =>{
        console.log(response.body.message)
      })
    },
    loadSlaDay: function(){
      this.slaDay = '-'
      let answered = this.answered
      let abandoned = this.abandoned
      let answeredTime = this.answeredTime
      let abandonedTime = this.abandonedTime
      if(answered != '-' && abandoned != '-' && answeredTime != '-' && abandonedTime != '-') {
        this.slaDay = (answeredTime * 100)/answered
      }else{
        this.slaDay = '-'
      }
    },
    loadQueue: function(){
      //this.queue = 15
    }
  }
})


var socket = io.connect('http://192.167.99.246:3363', { 'forceNew': true })
socket.emit('connect_dashboard')

socket.on('QueueMemberAdded', data => {
  let dataAgent = data['QueueMemberAdded']
  let numberAnnexed = dataAgent.number_annexed
  const actionPush = updateDataAgent(numberAnnexed, dataAgent)
  if (actionPush === true) vm.agents.push(data['QueueMemberAdded'])
})

socket.on('QueueMemberRemoved', data => {
  updateDataAgent(data.NumberAnnexed, '')
})

socket.on('QueueMemberChange', data => {
  let dataAgent = data['QueueMemberChange']
  let numberAnnexed = dataAgent.number_annexed
  updateDataAgent(numberAnnexed, dataAgent)
})

function updateDataAgent(numberAnnexed, dataAgent){
  actionPush = true
  vm.agents.forEach(item => {
    if (item.number_annexed === numberAnnexed) {
      actionPush = false
      if (dataAgent){
        vm.agents.splice(item, 1, dataAgent)
      }else{
        vm.agents.splice(item, 1)
      }
    }
  })

  return actionPush
}
