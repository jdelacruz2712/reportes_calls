<?php

namespace Cosapi\Models;

use Illuminate\Database\Eloquent\Model;

class QueuesTemplate extends Model
{
    protected $connection   = 'laravel';
    protected $table        = 'queues_template';
    protected $primaryKey   = 'id';
    public    $timestamps   = false;

    protected $fillable = [
        'id', 'name_template', 'music_onhold', 'empty_template', 'estado_id',
    ];

    public function musicOnHold(){
        return $this->belongsTo('Cosapi\Models\QueuesMusicOnHold','music_onhold');
    }
}
