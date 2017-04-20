<form id="formPerfil" enctype="multipart/form-data" method="POST">
    <input id="tokenId" type="hidden" name="_token" value="{{ csrf_token() }}">
    <div id="divProfile" class="box box-primary">
        <div role="tab" id="headingOne" class="box-header">
            <h4 class="box-title"><b>Edit Profile</b></h4>
            <div role="group" aria-label="..." class="btn-group pull-right">
                <div role="group" class="btn-group">
                    <button role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" data-widget="collapse" class="btn btn-box-tool"><i class="fa fa-minus"></i></button>
                </div>
            </div>
        </div>

        <div id="collapseOne" role="tabpanel" aria-labelledby="headingOne" class="panel-collapse collapse in">
            <div class="box-body">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <center><b>Datos Personales</b></center>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="firstName">Primer Nombre:</label>
                                            <input type="text" id="firstName" class="form-control" style="border-radius: 7px;" v-model="firstName" onkeypress="return filterLetter(event)" onkeydown="return BlockCopyPaste(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="numberDni">DNI:</label>
                                            <input type="text" id="numberDni" class="form-control" style="border-radius: 7px;" v-model="numberDni" onkeypress="return filterNumber(event)" onkeydown="return BlockCopyPaste(event)" maxlength="8">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="secondName">Segundo Nombre:</label>
                                            <input type="text" id="secondName" class="form-control" style="border-radius: 7px;" v-model="secondName" onkeypress="return filterLetter(event)" onkeydown="return BlockCopyPaste(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="numberTelephone">Telefono:</label>
                                            <input type="text" id="numberTelephone" class="form-control" style="border-radius: 7px;" v-model="numberTelephone" onkeypress="return filterNumber(event)" onkeydown="return BlockCopyPaste(event)" maxlength="9">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="firstLastName">Apellido Paterno:</label>
                                            <input type="text" id="firstLastName" class="form-control" style="border-radius: 7px;" v-model="firstLastName" onkeypress="return filterLetter(event)" onkeydown="return BlockCopyPaste(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="idSex">Sexo:</label>
                                            <div style="margin-top: 5px;">
                                                <input type="radio" id="M" value="M" v-model="idSex"> M
                                                <input type="radio" id="F" value="F" v-model="idSex"> F
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="secondLastName">Apellido Materno:</label>
                                            <input type="text" id="secondLastName" class="form-control" style="border-radius: 7px;" v-model="secondLastName" onkeypress="return filterLetter(event)" onkeydown="return BlockCopyPaste(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="birthdate">Fecha de Nacimiento:</label>
                                            <input type="date" id="birthdate" class="form-control" style="border-radius: 7px;" v-model="birthdate" onkeydown="return BlockCopyPaste(event)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div v-if="srcAvatar != 'storage/-'">
                                    <img :src="srcAvatar"  class="img-responsive img-rounded" style="margin: 0px auto; float: none !important;">
                                </div>
                                <div v-else>
                                    <img src="storage/default_avatar.png" class="img-responsive img-rounded" style="margin: 0px auto; float: none !important;">
                                </div>
                                <br>
                                <input type="file" name="imgAvatar" class="form-control" style="border-radius: 7px;" accept="image/*">
                                <input type="text" name="imgAvatarOriginal" class="form-control" style="border-radius: 7px;visibility: hidden;" v-model="srcAvatarOriginal">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <center><b>Credenciales</b></center>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="userName">Usuario:</label>
                                    <input type="text" id="userName" disabled class="form-control" style="border-radius: 7px;" v-model="userName">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="passWord">Contraseña:</label>
                                    <input type="password" id="passWord" disabled class="form-control" style="border-radius: 7px;" v-model="passWord">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <center><b>Ubigueo</b></center>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nomDepartamento">Departamento:</label>
                                    <v-select id="nomDepartamento" :on-change="loadProvincia"  :value.sync="selectedD" :options="departamento" placeholder="Choose here..!!"></v-select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nomProvincia">Provincia:</label>
                                    <v-select id="nomProvincia" :on-change="loadDistrito" :value.sync="selectedP" :options="provincia" placeholder="Choose here..!!"></v-select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nomDistrito">Distrito:</label>
                                    <v-select id="nomDistrito" :on-change="getDistrito" :value.sync="selectedDi" :options="distrito" placeholder="Choose here..!!"></v-select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-footer">
                <input type="text" id="idProfile" class="form-control" style="border-radius: 7px;visibility: hidden" v-model="idProfile" hidden>
                <input type="submit" value="Editar Perfil" class="btn btn-success pull-right">
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</form>
<script>
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#tokenId').getAttribute('value')
    Vue.component('v-select', VueSelect.VueSelect)
    var ubigeoID = ''
    var idDepartamento = ''
    var idProvincia = ''
    var idDistrito = ''

    var vmProfile = new Vue({
        el: '#divProfile',
        data: {
            selectedD: null,
            selectedP: null,
            selectedDi: null,
            departamento: [],
            provincia: [],
            distrito: [],
            firstName: '-',
            numberDni: '-',
            secondName: '-',
            numberTelephone: '-',
            firstLastName: '-',
            secondLastName: '-',
            birthdate: '',
            userName: '-',
            passWord: '-',
            srcAvatar: 'storage/default_avatar.png',
            srcAvatarOriginal: '-',
            idSex: '-',
            idProfile: '-',
            oldDepartamento: '',
            oldProvincia: ''
        },
        mounted()  {
        this.loadData()
    },
    methods:{
        loadData: function() {
            let userId = {{Session::get('UserId')}}
        let parameters = { userID: userId }
            this.$http.post('viewUsers',parameters).then(response => {
                /* Data tabla users */
                this.firstName = response.body[0].primer_nombre
                this.secondName = response.body[0].segundo_nombre
                this.firstLastName = response.body[0].apellido_paterno
                this.secondLastName = response.body[0].apellido_materno
                this.userName = response.body[0].username
                this.passWord = '-----------------------'
                /* Data tabla users_profile */
                let profile_user = response.body[0].user_profile
                if(profile_user){
                    this.numberDni = profile_user.dni
                    this.numberTelephone = profile_user.telefono
                    this.birthdate = profile_user.fecha_nacimiento
                    this.birthdate = profile_user.fecha_nacimiento
                    this.idSex = profile_user.Sexo
                    this.srcAvatar = `storage/${profile_user.avatar}`
                    this.srcAvatarOriginal = profile_user.avatar
                    this.idProfile = profile_user.id
                    ubigeoID = profile_user.ubigeo_id
                    this.$nextTick( () => {
                        this.loadDepartamento()
                        this.loadSelect()
                    })
                }
            },response => {
                console.log(response.body)
            })
        },
        loadDepartamento: function() {
            this.$http.post('viewDepartamento').then(response => {
                let departamento = []
                response.body.forEach((item, index) => departamento.push(item.departamento))
                this.departamento = departamento
            },response => console.log(response.body))
        },
        loadProvincia: function(nameDepartamento) {
            if (this.oldDepartamento != nameDepartamento){ this.selectedP = '' }
            idDepartamento = nameDepartamento
            let parameters = { Departamento: nameDepartamento }
            this.$http.post('viewProvincia',parameters).then(response => {
                let provincia = []
                response.body.forEach((item, index) => provincia.push(item.provincia))
                this.provincia = provincia
            },response => console.log(response.body))
        },
        loadDistrito: function(nameProvincia) {
            if (this.oldProvincia != nameProvincia){ this.selectedDi = '' }
            idProvincia = nameProvincia
            let parameters = { Provincia: nameProvincia }
            this.$http.post('viewDistrito',parameters).then(response => {
                let distrito = []
                response.body.forEach((item, index) => distrito.push(item.distrito))
                this.distrito = distrito
            },response => console.log(response.body))
        },
        getDistrito: function(nameDistrito){
            idDistrito = nameDistrito
        },
        loadSelect: function(){
            let parameters = { idUbigeo: ubigeoID }
            this.$http.post('viewUbigeo',parameters).then(response => {
                if(response.body[0]){
                    this.oldDepartamento = response.body[0].departamento
                    this.selectedD = response.body[0].departamento
                    this.oldProvincia = response.body[0].provincia
                    this.selectedP = response.body[0].provincia
                    this.selectedDi = response.body[0].distrito
                }
            },response => console.log(response.body))
        }
    }
    })

    $('#formPerfil').submit(function(event) {
        const userID = {{Session::get('UserId')}}
        let form = new FormData()
        form.append('userId', userID)
        form.append('firstName', $('input[id=firstName]').val())
        form.append('numberDni', $('input[id=numberDni]').val())
        form.append('secondName', $('input[id=secondName]').val())
        form.append('imgAvatar', $('input[name=imgAvatar]')[0].files[0])
        form.append('imgAvatarOriginal', $('input[name=imgAvatarOriginal]').val())
        form.append('numberTelephone', $('input[id=numberTelephone]').val())
        form.append('firstLastName', $('input[id=firstLastName]').val())
        form.append('secondLastName', $('input[id=secondLastName]').val())
        form.append('idSex', $('input[type=radio]').val())
        form.append('userName', $('input[id=userName]').val())
        form.append('birthdate', $('input[id=birthdate]').val())
        form.append('idDepartamento', idDepartamento)
        form.append('idProvincia', idProvincia)
        form.append('idDistrito', idDistrito)
        form.append('idProfile', $('input[id=idProfile]').val())
        $.ajax({
            url: 'uploadPerfil',
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            beforeSend: (xhr) => {
            const token = $('input[name=_token]').val()
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token)
            }
        },
        success: (data) => {
            if(data === 'Ok'){
                vmProfile.loadData()
                mostrar_notificacion('success', 'Se edito tu perfil con exito !', 'Success', 2000, false, true)
            }else{
                mostrar_notificacion('error', 'Hubo un error al editar, ', 'Success', 2000, false, true)
            }
        }
    })
        event.preventDefault()
    })
</script>