@extends('layout.login')
@section('title', 'Login Agente')
@section('content')
<div class="container">
  @include('layout.recursos.error')
  <div class="card card-container" style="background-color: transparent">
    <center><img id="profile-img" class="profile-img-card" src="img/logo.svg" /></center>
    <br>
    <p id="profile-name" class="profile-name-card"></p>
    <form role="form" method="POST" action="{{route('login')}}">
      <input type="hidden" name="_token" value="{{ csrf_token() }}">
      <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="Ingrese su Usuario" id="inputUsername" required="autofocus" name="username">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Ingrese su Contraseña" id="inputPassword" required="autofocus" name="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Ingresar</button>
    </form>
  </div><!-- /card-container -->
</div><!-- /container -->
@endsection
