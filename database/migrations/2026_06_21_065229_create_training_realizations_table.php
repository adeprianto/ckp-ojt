<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('training_realizations', function (Blueprint $table) {
            $table->id();
            $table->string('training_name');
            $table->bigInteger('training_id')->unsigned()->nullable();
            $table->date('training_start_date');
            $table->date('training_end_date');
            $table->integer('total_participants');
            $table->integer('total_learning_hours');
            $table->bigInteger('cost');
            $table->timestamps();

            $table->foreign('training_id')->references('id')->on('trainings')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_realizations');
    }
};
