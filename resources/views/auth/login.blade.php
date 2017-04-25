@extends('layout.login')
@section('title', 'Login Agente')
@section('content')
<div class="container">
  @include('layout.recursos.error')
  <div id="container-login" class="card card-container">
    <center><img id="profile-img" class="profile-img-card" src="img/logo.svg" /></center>
    <br>
    <p id="profile-name" class="profile-name-card"></p>
    <form role="form" method="POST" action="{{route('login')}}">
      <input type="hidden" name="_token" value="{{ csrf_token() }}">
      <div class="form-group input-group margin-bottom-20">
        <span class="input-group-addon" style="background: #F2F2F2 no-repeat scroll right center;"><i class="fa fa-user"></i></span>
        <input type="text" class="form-control" placeholder="Ingrese su Usuario" aria-describedby="sizing-addon3" id="inputUsername" required="autofocus" name="username">
      </div>
      <div class="form-group input-group margin-bottom-20">
        <span class="input-group-addon" style="background: #F2F2F2 no-repeat scroll right center;"><i class="fa fa-lock"></i></span>
        <input type="password" class="form-control" placeholder="Ingrese su Contraseña" aria-describedby="sizing-addon3" id="inputPassword" required="required" name="password">
      </div>
      <br>
      <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Ingresar</button>
    </form>
  </div><!-- /card-container -->
</div><!-- /container -->
@endsection
