<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prueba extends Model
{
    protected $table = 'pruebas';
    protected $fillable = [
        'nivel_actual',
        'estado',
        'puntos_totales'
    ];

    public function competencias(){
        return $this->hasMany(Competencia::class,'prueba_id');
    }

    public function ultimaCompetencia(){
        return $this->competencias()->orderBy('id','DESC')->first();
    }

    public static function strSegundos($segundos){
        if($segundos < 60){
            return $segundos.' seg.';
        }

        $minutos = $segundos/60;
        if($minutos < 60){
            if(is_int($minutos)){
                return $minutos.' min.';
            }else{
                $int_val = intval($minutos);
                $segundos = ($minutos-$int_val)*60;
                return $int_val.' min '.$segundos.' seg.';
            }
        }else{
            $horas = $minutos/60;

            if(is_int($horas)){
                return $horas.' h.';
            }else{
                $int_val = intval($horas);
                $minutos = ($horas-$int_val)*60;
                if(is_int($minutos)){
                    return $int_val.' h '.$minutos.' min.';
                }else{
                    $int_val_ = intval($minutos);
                    $segundos = ($minutos-$int_val_)*60;
                    return $int_val.' h '. $int_val_ .' min '.$segundos.' seg.';
                }

            }
        }

    }
}
