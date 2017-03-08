
const vm = new Vue({
  el: '#detail_agents',
  data: {
    agents: []
  }
})

const socket = io.connect('http://192.167.99.246:3363')

socket.emit('connect_dashboard')

socket.on('QueueMemberAdded', data => {
  vm.agents.push(data['QueueMemberAdded'])
})

socket.on('QueueMemberRemoved', data => {
  for (agent in vm.agents) {
    if (vm.agents.hasOwnProperty(agent)) {
      if (vm.agents[agent]['number_annexed'] === data['QueueMemberRemoved']){
        vm.agents.splice(agent, 1)
      }
    }
  }
})

socket.on('QueueMemberPause', data => {
  for (agent in vm.agents) {
    if (vm.agents.hasOwnProperty(agent)) {
      if (vm.agents[agent]['number_annexed'] === data['QueueMemberPause']['number_annexed']){
        vm.agents.splice(agent, 1, data['QueueMemberPause'])
      }
    }
  }
})

socket.on('mensaje', data => {
  console.log(data)
})
