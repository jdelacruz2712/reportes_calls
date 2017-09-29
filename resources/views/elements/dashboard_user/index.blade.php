@extends('layout.dashboardUser')
@section('title', 'Dashboard User | '.getenv('PROYECT_NAME_COMPLETE'))
@section('css')
    <style>
        .panel-heading>.nav-tabs {
            border-bottom: none;
            margin-bottom: -10px;
        }
    </style>
@endsection
@section('content')
    @include($routeDashboardUser)
@endsection
@section('scripts')
    @yield('scriptsUtilities')
@endsection