<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Group;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_complete_workflow()
    {
        // Créer un groupe
        $groupData = ['name' => 'Famille', 'description' => 'Contacts familiaux'];
        $groupResponse = $this->postJson('/api/groups', $groupData);
        $groupResponse->assertStatus(201);
        $groupId = $groupResponse->json('id');

        // Créer des contacts dans le groupe
        $contactData = [
            'first_name' => 'Jean',
            'last_name' => 'Dupont',
            'email' => 'jean@test.com',
            'phone' => '0123456789',
            'group_id' => $groupId
        ];
        
        $contactResponse = $this->postJson('/api/contacts', $contactData);
        $contactResponse->assertStatus(201);

        // Vérifier les contacts du groupe
        $groupContactsResponse = $this->getJson("/api/groups/{$groupId}/contacts");
        $groupContactsResponse->assertStatus(200)
                             ->assertJsonCount(1);

        // Supprimer le contact
        $contactId = $contactResponse->json('id');
        $deleteResponse = $this->deleteJson("/api/contacts/{$contactId}");
        $deleteResponse->assertStatus(200);

        // Vérifier que le groupe est vide
        $emptyGroupResponse = $this->getJson("/api/groups/{$groupId}/contacts");
        $emptyGroupResponse->assertStatus(200)
                          ->assertJsonCount(0);
    }
}