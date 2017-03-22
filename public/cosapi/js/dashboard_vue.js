
const vm = new Vue({
  el: '#detail_agents',
  data: {
    agents: []
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
