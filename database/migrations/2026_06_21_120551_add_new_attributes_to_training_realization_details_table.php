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
        Schema::table('training_realization_details', function (Blueprint $table) {
            $table->unsignedBigInteger('training_id')->after('id');
            $table->date('training_start_date')->after('training_realization_id')->nullable();
            $table->date('training_end_date')->after('training_start_date')->nullable();
            $table->integer('learning_hours')->after('training_end_date')->nullable();
            $table->bigInteger('cost')->after('learning_hours')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('training_realization_details', function (Blueprint $table) {
            //
        });
    }
};
