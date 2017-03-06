@extends('layout.login')
@section('title', 'Login Agente')
@section('content')
    <div class="container">

        @include('layout.recursos.error')

        <div class="card card-container">

            <img id="profile-img" class="profile-img-card" src="cosapi/img/login.png" />
            <p id="profile-name" class="profile-name-card"></p>

            <form class="form-signin" role="form" method="POST" action="{{route('login')}}">

                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        {!! Form::text('username', null, ['id' => 'inputUsername',  'placeholder' => "Ingrese su Usuario",         'class' => 'form-control', 'type' => 'text',    'required'=>'autofocus'])       !!}
                        {!! Form::password('password',   ['id' => 'inputPassword',  'placeholder' => "Ingrese su Contraseña",      'class' => 'form-control', 'required'])                                         !!}
                        <!-- {!! Form::text('anexo', null,    ['id' => 'inputAnexo',     'placeholder' => "Numero de Anexo", 'class' => 'form-control', 'type' => 'text',    'autocomplete'=>'off'])         !!} -->

        <div id="remember" class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Recuérdame 
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Ingresar</button>

    </form>

    </div><!-- /card-container -->
    </div><!-- /container -->

@endsection

