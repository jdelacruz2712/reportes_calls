<?php

namespace Cosapi\Http\Requests;

use Cosapi\Http\Requests\Request;

class formQueuesRequest extends Request
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
            'nameQueue'           => 'required',
            'numVdn'              => 'required',
            'selectedStrategy'    => 'required',
            'selectedPriority'    => 'required'
        ];
    }

    public function messages()
    {
        return [
            'nameQueus.required'            => 'El campo Name Queue es obligatorio',
            'numVdn.required'               => 'El campo VDN es obligatorio',
            'selectedStrategy.required'     => 'El campo Strategy es obligatorio',
            'selectedPriority.required'     => 'El campo Prioriry es obligatorio',
            'nameQueue.unique'              => 'El Name Queue ingresado, ya existe',
            'numVdn.unique'                 => 'El VDN ingresado, ya existe'
        ];
    }
}
