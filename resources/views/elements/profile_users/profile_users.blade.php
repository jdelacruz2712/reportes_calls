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
                                            <label for="primerNombre">Primer Nombre:</label>
                                            <input type="text" id="primerNombre" class="form-control" style="border-radius: 7px;" v-model="primerNombre" onkeypress="return filterLetter(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="numDNI">DNI:</label>
                                            <input type="text" id="numDNI" class="form-control" style="border-radius: 7px;" v-model="numDNI" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 8 || event.keyCode == 9">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="segundoNombre">Segundo Nombre:</label>
                                            <input type="text" id="segundoNombre" class="form-control" style="border-radius: 7px;" v-model="segundoNombre" onkeypress="return filterLetter(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="numTelefono">Telefono:</label>
                                            <input type="text" id="numTelefono" class="form-control" style="border-radius: 7px;" v-model="numTelefono" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 8 || event.keyCode == 9">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="apellidoPaterno">Apellido Paterno:</label>
                                            <input type="text" id="apellidoPaterno" class="form-control" style="border-radius: 7px;" v-model="apellidoPaterno" onkeypress="return filterLetter(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="idSexo">Sexo:</label>
                                            <div style="margin-top: 5px;">
                                                <input type="radio" id="M" value="M" v-model="idSexo"> M
                                                <input type="radio" id="F" value="F" v-model="idSexo"> F
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="apellidoMaterno">Apellido Materno:</label>
                                            <input type="text" id="apellidoMaterno" class="form-control" style="border-radius: 7px;" v-model="apellidoMaterno" onkeypress="return filterLetter(event)">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="fecNacimiento">Fecha de Nacimiento:</label>
                                            <input type="date" id="fecNacimiento" class="form-control" style="border-radius: 7px;" v-model="fecNacimiento">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div v-if="srcAvatar != 'storage/-'">
                                    <img :src="srcAvatar"  class="img-responsive img-rounded" style="margin: 0px auto; float: none !important;">
                                </div>
                                <div v-else>
                                    <img src="http://pcdoctorti.com.br/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" class="img-responsive img-rounded" style="margin: 0px auto; float: none !important;">
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
                                    <select id="nomDepartamento" class="form-control" style="border-radius: 7px;">
                                        <option selected="selected">Seleccionar Aqui</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nomProvincia">Provincia:</label>
                                    <select id="nomProvincia" class="form-control" style="border-radius: 7px;">
                                        <option selected="selected">-</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nomDistrito">Distrito:</label>
                                    <select id="nomDistrito" class="form-control" style="border-radius: 7px;">
                                        <option selected="selected">-</option>
                                    </select>
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

    var ubigeoID = ''

    var vmProfile = new Vue({
        el: '#divProfile',
        data: {
            primerNombre: '-',
            numDNI: '-',
            segundoNombre: '-',
            numTelefono: '-',
            apellidoPaterno: '-',
            apellidoMaterno: '-',
            fecNacimiento: '',
            userName: '-',
            passWord: '-',
            srcAvatar: 'http://pcdoctorti.com.br/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
            srcAvatarOriginal: '-',
            idSexo: '-',
            idProfile: '-'
        },
        mounted: function(){
            this.loadData()
        },
        methods:{
            loadData: function(){
                this.primerNombre = '-'
                this.numDNI = '-'
                this.segundoNombre = '-'
                this.numTelefono = '-'
                this.apellidoPaterno = '-'
                this.apellidoMaterno = '-'
                this.fecNacimiento = ''
                this.userName = '-'
                this.passWord = '-'
                this.srcAvatar = 'http://pcdoctorti.com.br/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
                this.srcAvatarOriginal = '-'
                let id_user = {{Session::get('UserId')}}
                let parameters = { userID: id_user }
                this.$http.post('viewUsers',parameters).then(response => {

                    /* Data tabla users */
                    this.primerNombre = response.body[0].primer_nombre
                    this.segundoNombre = response.body[0].segundo_nombre
                    this.apellidoPaterno = response.body[0].apellido_paterno
                    this.apellidoMaterno = response.body[0].apellido_materno
                    this.userName = response.body[0].username
                    this.passWord = '-----------------------'
                    /* Data tabla users_profile */
                    let profile_user = response.body[0].user_profile
                    if(profile_user){
                        this.numDNI = profile_user.dni
                        this.numTelefono = profile_user.telefono
                        this.fecNacimiento = profile_user.fecha_nacimiento
                        this.fecNacimiento = profile_user.fecha_nacimiento
                        this.idSexo = profile_user.Sexo
                        this.srcAvatar = 'storage/' + profile_user.avatar
                        this.srcAvatarOriginal = profile_user.avatar
                        this.idProfile = profile_user.id
                        ubigeoID = profile_user.ubigeo_id
                    }

                    this.$nextTick(function () {
                        this.loadSelect()
                    })
                },response =>{
                    console.log(response.body)
                })
            },
            loadSelect: function(){
                let parameters = { idUbigeo: ubigeoID }
                this.$http.post('viewUbigeos',parameters).then(response => {
                    console.log(response)
                },response =>{
                    console.log(response.body)
                })
            }
        }
    })

    $('#formPerfil').submit(function(event) {
        let userID = {{Session::get('UserId')}}
        let form = new FormData()
        form.append('userID', userID)
        form.append('primerNombre', $('input[id=primerNombre]').val())
        form.append('numDNI', $('input[id=numDNI]').val())
        form.append('segundoNombre', $('input[id=segundoNombre]').val())
        form.append('imgAvatar', $('input[name=imgAvatar]')[0].files[0])
        form.append('imgAvatarOriginal', $('input[name=imgAvatarOriginal]').val())
        form.append('numTelefono', $('input[id=numTelefono]').val())
        form.append('apellidoPaterno', $('input[id=apellidoPaterno]').val())
        form.append('apellidoMaterno', $('input[id=apellidoMaterno]').val())
        form.append('idSexo', $('input[type=radio]').val())
        form.append('userName', $('input[id=userName]').val())
        form.append('fecNacimiento', $('input[id=fecNacimiento]').val())
        form.append('nomDepartamento', $('select[id=nomDepartamento]').val())
        form.append('nomProvincia', $('select[id=nomProvincia]').val())
        form.append('nomDistrito', $('select[id=nomDistrito]').val())
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
            vmProfile.loadData()
            mostrar_notificacion('success', 'Se edito tu perfil con exito !', 'Success', 2000, false, true)
        }
    })
        event.preventDefault()
    })

    /*setTimeout(function() {
        let splitDepartamento   = ubigeoID.substring(0,2)
        let splitCiudad         = ubigeoID.substring(2,4)
        let splitDistrito       = ubigeoID.substring(4)
        console.log(splitDepartamento + ' ' + splitCiudad + ' ' + splitDistrito)
    },5000)*/
</script>