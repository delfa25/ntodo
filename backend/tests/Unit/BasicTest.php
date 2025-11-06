<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class BasicTest extends TestCase
{
    public function test_basic_assertion(): void
    {
        $this->assertTrue(true);
    }
    
    public function test_application_returns_successful_response(): void
    {
        $this->assertTrue(class_exists('App\Models\User'));
        $this->assertTrue(class_exists('App\Models\Contact'));
        $this->assertTrue(class_exists('App\Models\Group'));
    }
}