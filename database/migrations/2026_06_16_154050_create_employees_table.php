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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('nik')->unique();
            $table->string('name');
            $table->date('start_working_date')->nullable();
            $table->boolean('is_active');
            $table->string('company_code')->nullable();
            $table->string('personnel_area_code')->nullable();
            $table->string('employee_group_code')->nullable();
            $table->string('employee_group')->nullable();
            $table->string('job_grade')->nullable();
            $table->string('personnel_area')->nullable();
            $table->string('personnel_subarea')->nullable();
            $table->string('payroll_area')->nullable();
            $table->string('organizational_unit_code')->nullable();
            $table->string('unit')->nullable();
            $table->string('position_code')->nullable();
            $table->string('position')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('person_grade')->nullable();
            $table->string('gender_code')->nullable();
            $table->string('gender')->nullable();
            $table->string('educational')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
