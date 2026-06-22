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
        Schema::create('training_realization_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('training_realization_id');
            $table->string('employee_name');
            $table->unsignedBigInteger('employee_id')->nullable();
            $table->string('employee_position')->nullable();
            $table->unsignedBigInteger('position_id')->nullable();
            $table->string('employee_bod_level')->nullable();
            $table->string('employee_unit')->nullable();
            $table->unsignedBigInteger('unit_id')->nullable();
            $table->string('employee_division')->nullable();
            $table->unsignedBigInteger('division_id')->nullable();
            $table->string('employee_region')->nullable();
            $table->unsignedBigInteger('region_id')->nullable();
            $table->timestamps();

            $table->foreign('training_realization_id')->references('id')->on('training_realizations')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('employee_id')->references('id')->on('employees')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('position_id')->references('id')->on('positions')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('unit_id')->references('id')->on('units')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('division_id')->references('id')->on('divisions')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('region_id')->references('id')->on('regions')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_realization_details');
    }
};
