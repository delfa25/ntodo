<?php

namespace App\Repositories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;

class ContactRepository
{
    public function all(): Collection
    {
        return Contact::with('group')->get();
    }

    public function find(int $id): ?Contact
    {
        return Contact::with('group')->find($id);
    }

    public function create(array $data): Contact
    {
        return Contact::create($data);
    }

    public function update(int $id, array $data): bool
    {
        return Contact::where('id', $id)->update($data);
    }

    public function delete(int $id): bool
    {
        return Contact::destroy($id);
    }

    public function getByGroup(int $groupId): Collection
    {
        return Contact::where('group_id', $groupId)->get();
    }

    public function getByUser(int $userId): Collection
    {
        return Contact::with('group')->where('user_id', $userId)->get();
    }
}