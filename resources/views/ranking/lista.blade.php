<ul class="list-group ranking">
    @php($posicion = 1)
    @forelse($ranking as $r)
        <li id="est_{{$r->estudiante_id}}" class="list-group-item align-items-center text-center item-ranking d-none animated">
            <span class="badge badge-primary badge-pill left">{{$posicion++}}</span>
            {{$r->estudiante}}
            <span class="right text-primary font-weight-500 puntaje">{{$r->puntos}}</span>
        </li>
    @empty
        <li id="est_1" class="list-group-item align-items-center text-center item-ranking d-none animated">
            No hay información para mostrar
        </li>
    @endforelse
</ul>