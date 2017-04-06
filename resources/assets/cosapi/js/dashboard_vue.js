Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value');

const vm = new Vue({
  el: '#detail_agents',
  data: {
    agents: []
  }
})

var kpi = new Vue({
  el: '#kpi',
  data: {
    answered: 0,
    answeredTime: 0,
    abandonedTime: 0,
    abandoned: 0,
    slaDay: 0,
    queue: 0
  },
  mounted(){
    this.loadAnswered()
    this.loadAbandoned()
    this.loadAnsweredTime()
    this.loadAbandonedTime()
    //this.loadSlaDay()
    //this.loadQueue()
  },
  methods:{
    loadAnswered: function(){
      let parameters = {type : 'calls_completed'}
      this.$http.post('dashboard_01/getAnswered',parameters).then(response => {
        this.answered = response.data.message
      },response =>{
        console.log(response.body.message)
      })
    },
    loadAbandoned: function(){
      let parameters = {type : 'calls_abandone'}
      this.$http.post('dashboard_01/getAnswered',parameters).then(response => {
        this.abandoned = response.data.message
      },response =>{
        console.log(response.body.message)
      })
    },
    loadAnsweredTime: function(){
      let parameters = {
        type : 'calls_completed',
        time : 'true'
      }
      this.$http.post('dashboard_01/getAnswered',parameters).then(response => {
        this.answeredTime = response.data.message
      },response =>{
        console.log(response.body.message)
      })
    },
    loadAbandonedTime: function(){
      let parameters = {
        type : 'calls_abandone',
        time : 'true'
      }
      this.$http.post('dashboard_01/getAnswered',parameters).then(response => {
        this.abandonedTime = response.data.message
      },response =>{
        console.log(response.body.message)
      })
    },
    loadSlaDay: function(){
      //this.slaDay = 14
    },
    loadQueue: function(){
      //this.queue = 15
    }
  }
})


var socket = io.connect('http://192.167.99.246:3363', { 'forceNew': true })
socket.emit('connect_dashboard')

socket.on('QueueMemberAdded', data => {
  vm.agents.push(data['QueueMemberAdded'])
})

socket.on('QueueMemberRemoved', data => {
  for (agent in vm.agents) {
    if (vm.agents.hasOwnProperty(agent)) {
      if (vm.agents[agent]['number_annexed'] === data['NumberAnnexed']){
        vm.agents.splice(agent, 1)
      }
    }
  }
})

socket.on('QueueMemberChange', data => {
  console.log(data)
  for (agent in vm.agents) {
    if (vm.agents.hasOwnProperty(agent)) {
      if (vm.agents[agent]['number_annexed'] === data['NumberAnnexed']){
        vm.agents.splice(agent, 1, data['QueueMemberChange'])
      }
    }
  }
})
