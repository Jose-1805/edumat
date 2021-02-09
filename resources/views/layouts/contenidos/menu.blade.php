<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="{{url('/')}}">{{ config('app.name', 'Laravel') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <!--<li class="nav-item active">
                <a class="nav-link" href="{{url('/')}}">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li>-->
        </ul>

        <ul class="navbar-nav">
            @guest
                <li><a href="{{ route('login') }}">Login</a></li>
                <li><a href="{{ route('register') }}">Register</a></li>
            @else
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true" v-pre>
                        <i class="fa fa-user-circle margin-right-5"></i>{{ Auth::user()->nickname }} <span class="caret"></span>
                    </a>

                    <ul class="dropdown-menu">
                        <li>
                            <a href="{{ route('logout') }}"
                               onclick="event.preventDefault();
                                                             document.getElementById('logout-form').submit();">
                                Salir
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                {{ csrf_field() }}
                            </form>
                        </li>
                    </ul>
                </li>
            @endguest
        </ul>
    </div>
</nav>

<div id="menu_flotante">
    <a href="{{url('/')}}" class="item_menu_flotante btn btn-success btn-circle btn-lg animated d-none" data-toggle="tooltip" data-placement="right" title="Ranking"><i class="fas fa-trophy"></i></a>
    @if(Auth::user()->rol == 'docente')
        <a href="{{url('/estudiante')}}" class="item_menu_flotante btn btn-primary btn-circle btn-lg animated d-none" data-toggle="tooltip" data-placement="right" title="Estudiantes"><i class="fas fa-user-graduate"></i></a>
        <a href="{{url('/estadisticas')}}" class="item_menu_flotante btn btn-info btn-circle btn-lg animated d-none" data-toggle="tooltip" data-placement="right" title="Estadísticas del juego"><i class="fas fa-chart-bar"></i></a>
    @endif
    @if(Auth::user()->rol == 'estudiante')
        <a href="{{url('/juego')}}" class="item_menu_flotante btn btn-warning btn-circle btn-lg animated d-none" data-toggle="tooltip" data-placement="right" title="Jugar"><i class="fas fa-play"></i></a>
    @endif
</div>