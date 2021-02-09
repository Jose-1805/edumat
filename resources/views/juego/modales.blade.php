<div class="modal fade" id="modal_inicio_prueba" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="text-warning font-weight-400">Bienvenid@, {{Auth::user()->nickname}}</h2>
                <h4>Esta es la operación <span id="numero_operacion" class="font-weight-500 text-info"></span> del módulo de <span id="modulo_actual"></span>.</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btn-iniciar-operacion"><span class="fas fa-play margin-right-10"></span>Iniciar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_operacion_incorrecta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-sm modal-notify modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="heading lead font-weight-500">Incorrecto</p>
            </div>
            <div class="modal-body">
                <p>El resultado de la operación es incorrecto</p>
                <h4>Puntos obtenidos: <strong>0</strong></h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-continuar">Continuar <span class="fas fa-angle-right margin-left-10"></span></button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_operacion_correcta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-sm modal-notify modal-success" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="heading lead font-weight-500">Correcto</p>
            </div>
            <div class="modal-body">
                <p>El resultado de la operación es correcto</p>
                <h4>Puntos obtenidos: <strong>{{config('params.puntuacion_por_operacion')}}</strong></h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-continuar">Continuar <span class="fas fa-angle-right margin-left-10"></span></button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_fin_prueba" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body padding-30">
                <div class="row">
                    <h3 class="col-12 mayuscula text-center">EDUMAT: MÓDULO DE {{$competencia->nivel}} superado</h3>
                    <h5 class="col-12 text-center margin-top-20">Felicitaciones: {{Auth::user()->nickname}}</h5>
                    <h3 id="texto-prueba-finalizada" class="d-none text-success text-center font-weight-500 margin-top-20">Has finalizado todos los módulos de esta prueba.</h3>
                    <div class="starability-growRotate margin-top-30" style="margin: 0 auto;width: auto !important;">
                        <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked aria-label="No rating." />

                        @for($i = 1;$i <= config('params.operaciones_por_modulo');$i++)
                            <input class="estrella_acierto" type="radio" id="first-rate{{$i}}" name="rating" disabled/>
                            <label for="first-rate{{$i}}"></label>
                        @endfor
                    </div>
                    <div class="col-12">
                        <div class="row" id="contenedor-botones-finalizar-competencia">
                            <a href="{{url('/')}}" class="btn btn-default col"><i class="fas fa-caret-left margin-right-10 fa-2x align-middle"></i> Salir</a>
                            <a href="{{url('/juego')}}" class="btn btn-success col" id="btn-continuar-prueba"><span>Continuar </span> <i class="fas fa-caret-right margin-left-10 fa-2x align-middle"></i></a>
                        </div>
                        <div class="row d-none" id="contenedor-botones-finalizar-prueba">
                            <a href="{{url('/')}}" class="btn btn-default col-12"><i class="fas fa-caret-left margin-right-10 fa-2x align-middle"></i> Salir</a>
                            <a href="{{url('/juego')}}" class="btn btn-success col-12" id="btn-continuar-prueba"><span>Iniciar nueva prueba </span> <i class="fas fa-caret-right margin-left-10 fa-2x align-middle"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>