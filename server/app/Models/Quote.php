<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    // Define the table name (optional if the table name is the plural of the model name)
    protected $table = 'quotes';

    // Define which attributes can be mass-assigned
    protected $fillable = [
        'user_id',
        'content',
        'author',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
