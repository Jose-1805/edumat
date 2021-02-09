<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{env('APP_NAME')}}</title>

        <!-- DATATABLES -->
        <link href="//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet">

        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- Bootstrap core CSS -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
        <!-- Material Design Bootstrap -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.4/css/mdb.min.css" rel="stylesheet">
        <link href="{{asset('css/rediseno_tabla.css')}}" rel="stylesheet">
        <link href="{{asset('css/helpers.css')}}" rel="stylesheet">
        <link href="{{asset('css/ranking.css')}}" rel="stylesheet">
    </head>
    <body>

        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 margin-top-40">
                    <div class="row">
                        @if (Route::has('login'))
                            <div class="col-12 text-right no-padding margin-bottom-30">
                                @auth
                                    <a class="btn btn-info" href="{{ url('/home') }}">Inicio</a>
                                @else
                                    <a class="btn btn-info" href="{{ route('login') }}" data-toggle="modal" data-target="#modal_inicio_sesion"><i class="fa fa-user-circle margin-right-10 font-large"></i>Ingresar</a>
                                @endauth
                            </div>
                        @endif
                        <div class="col-12">
                            @include('ranking.index')
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal_inicio_sesion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Inicio sesión</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="row" method="POST" action="{{ route('login') }}">
                            {{ csrf_field() }}

                            <div class="col-12 form-group{{ $errors->has('nickname') ? ' has-error' : '' }}">
                                <label for="nickname" class="col-12 control-label no-padding">Nickname</label>

                                <input id="nickname" type="text" class="form-control" name="nickname" value="{{ old('nickname') }}" required autofocus>

                                @if ($errors->has('nickname'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('nickname') }}</strong>
                                    </span>
                                @endif
                            </div>

                            <div class="col-12 form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                <label for="password" class="col-12 control-label no-padding">Password</label>

                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                                @endif
                            </div>

                            <div class="col-12 form-group">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Recordarme
                                    </label>
                                </div>
                            </div>

                            <div class="col-12 form-group text-center">
                                <button type="submit" class="btn btn-primary">
                                    Ingresar
                                </button>

                                <!--<a class="btn btn-link" href="{{ route('password.request') }}">
                                    Forgot Your Password?
                                </a>-->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" id="general_url" value="{{url('/')}}">
        <input type="hidden" id="general_token" value="{{csrf_token()}}">

        <!-- JQuery -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- Bootstrap tooltips -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.13.0/umd/popper.min.js"></script>
        <!-- Bootstrap core JavaScript -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <!-- MDB core JavaScript -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.4/js/mdb.min.js"></script>

        <!-- DATATABLES -->
        <script type="text/javascript" src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>

        <script src="{{asset('/js/blockUi.js')}}"></script>
        <script src="{{asset('/js/global.js')}}"></script>
        <script src="{{asset('/js/ranking/ranking.js')}}"></script>

        @if($errors->has('nickname'))
            <script>
                $(function () {
                    $('#modal_inicio_sesion').modal('show');
                })
            </script>
        @endif
    </body>
</html>
