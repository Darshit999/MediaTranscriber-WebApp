<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'path',
        'size',
        'type',
    ];

    public function media()
    {
        return $this->hasMany(Media::class);
    }
}
