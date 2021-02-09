<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarEstudiante extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $data = [
            'identificacion'=>'required|max:15|unique:users,identificacion,'.$this->estudiante.',id',
            'nombres'=>'required|max:50',
            'apellidos'=>'required|max:50',
            'nickname'=>'required|max:50|unique:users,nickname,'.$this->estudiante.',id',
            'genero'=>'required|in:masculino,femenino',
            'curso'=>'required|in:1A,1B,1C,2A,2B,2C,3A,3B,3C,4A,4B,4C,5A,5B,5C',
            'jornada'=>'required|in:mañana,tarde',
            'estado'=>'required|in:activo,inactivo',
            'password'=>'required|min:6|max:30|confirmed'
        ];

        if($this->estudiante){
            if($this->password)
                $data['password'] = 'min:6|max:30|confirmed';
            else
                $data['password'] = '';
        }
        return $data;
    }
}
