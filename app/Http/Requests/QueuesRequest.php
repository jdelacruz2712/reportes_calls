<?php

namespace Cosapi\Http\Requests;

use Cosapi\Http\Requests\Request;

class QueuesRequest extends Request
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
        return [
            'nameQueue'           => 'required|unique:queues,name,'.$this->queueID,
            'numVdn'              => 'required|unique:queues,vdn,'.$this->queueID,
            'selectedStrategy'    => 'required',
            'selectedPriority'    => 'required'
        ];
    }

    public function messages()
    {
        return [
            'nameQueue.required'            => 'Debes ingresar un nombre para la Cola (Queue)',
            'numVdn.required'               => 'Debes ingresar un número VDN',
            'selectedStrategy.required'     => 'Debes escoger una Estrategia',
            'selectedPriority.required'     => 'Debes escoger una prioridad',
            'nameQueue.unique'              => 'El nombre de la Cola ingresada ya existe',
            'numVdn.unique'                 => 'El número de VDN ingresado, ya existe'
        ];
    }
}
