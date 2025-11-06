<?php

namespace Tests\Feature;

use App\Models\Group;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GroupTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_groups()
    {
        Group::factory()->count(3)->create();
        
        $response = $this->getJson('/api/groups');
        
        $response->assertStatus(200)
                ->assertJsonCount(3);
    }

    public function test_can_create_group()
    {
        $data = [
            'name' => 'Famille',
            'description' => 'Contacts familiaux'
        ];
        
        $response = $this->postJson('/api/groups', $data);
        
        $response->assertStatus(201)
                ->assertJsonFragment($data);
        
        $this->assertDatabaseHas('groups', $data);
    }

    public function test_can_show_group()
    {
        $group = Group::factory()->create();
        
        $response = $this->getJson("/api/groups/{$group->id}");
        
        $response->assertStatus(200)
                ->assertJsonFragment(['name' => $group->name]);
    }

    public function test_can_update_group()
    {
        $group = Group::factory()->create();
        $data = ['name' => 'Nouveau nom', 'description' => 'Nouvelle description'];
        
        $response = $this->putJson("/api/groups/{$group->id}", $data);
        
        $response->assertStatus(200);
        $this->assertDatabaseHas('groups', $data);
    }

    public function test_can_delete_group()
    {
        $group = Group::factory()->create();
        
        $response = $this->deleteJson("/api/groups/{$group->id}");
        
        $response->assertStatus(200);
        $this->assertDatabaseMissing('groups', ['id' => $group->id]);
    }

    public function test_group_name_is_required()
    {
        $response = $this->postJson('/api/groups', ['description' => 'Test']);
        
        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name']);
    }
}
