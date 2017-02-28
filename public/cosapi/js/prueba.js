
const vue = new Vue({
  el: '#detail_agents',
  data: {
    list_agents: []
  }
})

const socket = io.connect('http://192.167.99.246:3363')

socket.emit('connect_dashboard')

socket.on('connect_dashboard', data => {
  vue.list_agents = []
  vue.list_agents.push(data['ListAgents'])
})

socket.on('QueueMemberAdded', data => {
  vue.list_agents.push(data['QueueMemberAdded'])
})

socket.on('QueueMemberRemoved', data => {
  vue.list_agents.push('')

  let index = data['QueueMemberRemoved']
  delete vue.list_agents['0'][index]

  // vue.list_agents.splice(['0']['SIP/244'], 1)
})

socket.on('QueueMemberPause', data => {
  console.log(data)
})

socket.on('mensaje', data => {
  console.log(data)
})
