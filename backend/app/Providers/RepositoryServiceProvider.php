<?php

namespace App\Providers;

use App\Repositories\ContactRepository;
use App\Repositories\GroupRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(GroupRepository::class);
        $this->app->singleton(ContactRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
