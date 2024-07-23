<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'file_id',
        'name',
    ];

    public function File()
    {
        return $this->belongsTo(Files::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
