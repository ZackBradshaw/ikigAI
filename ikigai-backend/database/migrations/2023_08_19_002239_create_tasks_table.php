<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task')->nullable();
            $table->enum('category',\App\Models\Task::CATEGORIES)->nullable();
            $table->unsignedInteger('points')->nullable();
            $table->foreignIdFor(\App\Models\User::class)->nullable()->cascadeOnUpdate()->cascadeOnDelete();
            $table->boolean('completed')->default(false);
            $table->boolean('created_by_user')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
