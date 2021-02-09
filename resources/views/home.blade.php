@extends('layouts.app')

@section('css')
    <link href="{{asset('css/ranking.css')}}" rel="stylesheet">
@endsection

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12 col-md-10 offset-md-1 margin-top-40">
            @include('ranking.index')
        </div>
    </div>
</div>
@endsection

@section('js')
    <script src="{{asset('/js/ranking/ranking.js')}}"></script>
@endsection
