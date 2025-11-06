<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ModelsTest extends TestCase
{
    public function test_user_model_exists(): void
    {
        $this->assertTrue(class_exists('App\Models\User'));
    }
    
    public function test_contact_model_exists(): void
    {
        $this->assertTrue(class_exists('App\Models\Contact'));
    }
    
    public function test_group_model_exists(): void
    {
        $this->assertTrue(class_exists('App\Models\Group'));
    }
    
    public function test_controllers_exist(): void
    {
        $this->assertTrue(class_exists('App\Http\Controllers\Api\AuthController'));
        $this->assertTrue(class_exists('App\Http\Controllers\Api\ContactController'));
        $this->assertTrue(class_exists('App\Http\Controllers\Api\GroupController'));
    }
}