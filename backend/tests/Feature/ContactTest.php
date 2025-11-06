<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Group;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_contacts()
    {
        Contact::factory()->count(3)->create();
        
        $response = $this->getJson('/api/contacts');
        
        $response->assertStatus(200)
                ->assertJsonCount(3);
    }

    public function test_can_create_contact()
    {
        $group = Group::factory()->create();
        $data = [
            'first_name' => 'Jean',
            'last_name' => 'Dupont',
            'email' => 'jean@test.com',
            'phone' => '0123456789',
            'group_id' => $group->id
        ];
        
        $response = $this->postJson('/api/contacts', $data);
        
        $response->assertStatus(201)
                ->assertJsonFragment($data);
        
        $this->assertDatabaseHas('contacts', $data);
    }

    public function test_can_show_contact()
    {
        $contact = Contact::factory()->create();
        
        $response = $this->getJson("/api/contacts/{$contact->id}");
        
        $response->assertStatus(200)
                ->assertJsonFragment(['email' => $contact->email]);
    }

    public function test_can_update_contact()
    {
        $contact = Contact::factory()->create();
        $data = [
            'first_name' => 'Pierre',
            'last_name' => 'Martin',
            'email' => 'pierre@test.com'
        ];
        
        $response = $this->putJson("/api/contacts/{$contact->id}", $data);
        
        $response->assertStatus(200);
        $this->assertDatabaseHas('contacts', $data);
    }

    public function test_can_delete_contact()
    {
        $contact = Contact::factory()->create();
        
        $response = $this->deleteJson("/api/contacts/{$contact->id}");
        
        $response->assertStatus(200);
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    }

    public function test_can_get_contacts_by_group()
    {
        $group = Group::factory()->create();
        Contact::factory()->count(2)->create(['group_id' => $group->id]);
        Contact::factory()->create(); // Contact sans groupe
        
        $response = $this->getJson("/api/groups/{$group->id}/contacts");
        
        $response->assertStatus(200)
                ->assertJsonCount(2);
    }

    public function test_contact_email_must_be_unique()
    {
        $contact = Contact::factory()->create(['email' => 'test@test.com']);
        
        $response = $this->postJson('/api/contacts', [
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@test.com'
        ]);
        
        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

    public function test_contact_required_fields()
    {
        $response = $this->postJson('/api/contacts', []);
        
        $response->assertStatus(422)
                ->assertJsonValidationErrors(['first_name', 'last_name', 'email']);
    }
}
