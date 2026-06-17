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
        Schema::create('trainings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('learning_hours');
            $table->decimal('cost', 16, 2)->nullable();
            $table->unsignedBigInteger('organization_id')->nullable();
            $table->boolean('is_ptpn_group')->nullable();
            $table->timestamps();

            $table->foreign('organization_id')->references('id')->on('organizers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainings');
    }
};
