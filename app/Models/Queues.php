<?php

namespace Cosapi\Models;

use Illuminate\Database\Eloquent\Model;

class Queues extends Model
{
    protected $connection   = 'laravel';
    protected $table        = 'queues';
    protected $primaryKey   = 'id';
    public    $timestamps   = false;

    protected $fillable = [
        'id', 'name', 'vdn', 'queues_strategy_id', 'queues_priority_id', 'music_id', 'estado_id',
    ];

    public function estrategia(){
        return $this->belongsTo('Cosapi\Models\QueueStrategy','queues_strategy_id');
    }

    public function prioridad(){
        return $this->belongsTo('Cosapi\Models\QueuePriority','queues_priority_id');
    }

    public function music(){
        return $this->belongsTo('Cosapi\Models\QueueMusic','music_id');
    }
}
