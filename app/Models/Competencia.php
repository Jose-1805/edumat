<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Competencia extends Model
{
    protected $table = 'competencias';
    protected $fillable = [
        'nivel',
        'duracion_segundos',
        'puntaje',
        'aciertos',
        'desaciertos',
    ];
}
