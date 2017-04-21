'use strict'
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value')
const vueFront = new Vue({
  el: '#statusAgent',
  data: {
    present_status_name: '',
    present_status_id: '',
    anexo: '',
    srcAvatar:'default_avatar.png'
  },
  mounted(){
    this.getAvatar()
  },
  methods:{
    getAvatar: function (){
      let userId = $('#user_id').val()
      let parameters = { userID: userId }
      this.$http.post('viewUsers', parameters).then(response => {
        this.srcAvatar = response.body[0].user_profile.avatar
        vueMenuHeader.srcAvatar = response.body[0].user_profile.avatar
      },response => console.log(response.body))
    }
  }
})

const vueMenuHeader = new Vue({
  el:'#menuHeader',
  data: {
    srcAvatar:'default_avatar.png'
  }
})

const socketIO = io.connect(restApiSails)
const socketSails = io.sails.connect(restApiSails)
io.sails.autoConnect = false
socketSails.reconnection = true
socketSails.reconnectionDelayMax = 5
// socketSails.timeout = 10
// socketSails.reconnectionDelay = 20

const socketAsterisk = io.connect(restApiDashboard, { 'forceNew': true })
socketAsterisk.on('connect', function() {
   if ($('#anexo').text()) {
     socketAsterisk.emit('createRoom', $('#anexo').text())
   }
});

socketAsterisk.on('statusAgent',  (data) => {
  vueFront.present_status_name  = data.NameEvent
  vueFront.present_status_id    = data.EventId
})

socketSails.on('connect', function () {
  $('#loading').hide()
  console.log('Socket Sails.io connected!')
})

socketSails.on('disconnect', function () {
  let divLoading = '<div class="loading" id="loading" style="display: inline;"><li></li><li></li><li></li><li></li><li></li></div>'
  $('#container').html(divLoading)
  console.log('Socket Sails.io desconectado!')
})

// Cambia la etiqueta del estado actual cada vez que realiza un cambio de estado
socketSails.on('status_agent', function (data) {
  vueFront.present_status_name = data.Name_Event
  vueFront.present_status_id = data.Event_id
})

// Setea la etiqueta del estado actual cada vez que actualicen la pantalla del sistema
let parameters = {user_id: $('#user_id').val()}
ajaxNodeJs(parameters, '/detalle_eventos/getstatus', true)
