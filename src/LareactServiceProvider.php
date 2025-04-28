<?php

namespace Molnix\Lareact;

use Illuminate\Support\ServiceProvider;
use Molnix\Lareact\Console\Commands\UpdateCommand;
use Molnix\Lareact\Console\Commands\InstallCommand;

class LareactServiceProvider extends ServiceProvider
{
    /**
     * Register the application services.
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            InstallCommand::class,
            UpdateCommand::class,
        ]);
    }
}
