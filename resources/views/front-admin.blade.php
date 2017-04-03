@extends('layout.amdinLTE')
@section('title', getenv('PROYECT_NAME_COMPLETE'))
@section('content')
	@include('layout.recursos.modal_loading')
	<div  id="container"></div>
@endsection
