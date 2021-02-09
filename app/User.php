<?php

namespace App;

use App\Models\Prueba;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identificacion',
        'nombres',
        'apellidos',
        'nickname',
        'genero',
        'curso',
        'jornada',
        'estado',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function pruebas(){
        return $this->hasMany(Prueba::class,'user_id');
    }
}
