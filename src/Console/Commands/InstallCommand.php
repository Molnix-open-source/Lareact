<?php

namespace Molnix\Lareact\Console\Commands;

use Molnix\Lareact\Lareact;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Filesystem\Filesystem;

class InstallCommand extends Command
{
    protected Lareact $service;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lareact:install
                            {--force : Force reinstall, over write files.}
        ';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scafold your app with react and react router';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->service = new Lareact();
        if (File::exists(resource_path('js/main.tsx')) && str_contains(File::get(resource_path('js/main.tsx')), '//lareact')) {
            $this->newLine(1);
            $this->error('The package already installed.');

            if (!$this->option('force')) {
                $this->error('Please run this on a new laravel install.');
                return;
            }
            $this->newLine(1);
        }
        $this->install();
    }


    protected function install()
    {
        $this->call('install:api', ['--without-migration-prompt' => true]);
        $this->call('config:publish', ['name' => 'cors']);
        $this->call('lang:publish');
        foreach ($this->service->filesToCopy() as $source => $destination) {
            File::ensureDirectoryExists(dirname($destination));
            copy($this->service->getPath($source), $destination);
            $this->info("\u{2705}  File '$source' copied.");
        }
        foreach ($this->service->foldersToCopy() as $source => $destination) {
            File::ensureDirectoryExists(dirname($destination));
            (new Filesystem)->copyDirectory($this->service->getPath($source), $destination);
            $this->info("\u{2705}  Folder '$source' copied.");
        }

        foreach ($this->service->filesToDelete() as $destination) {
            (new Filesystem)->delete($destination);
            $this->line("\u{2705}  File '$destination' deleted.");
        }

        (new Filesystem)->replaceInFile(
            "'supports_credentials' => false,",
            "'supports_credentials' => true,",
            $this->laravel->configPath('cors.php'),
        );
        $this->line("\u{2705}  Modified 'config/cors.php' file.");

        if (!str_contains((new Filesystem)->get($this->laravel->bootstrapPath('app.php')), '$middleware->statefulApi();')) {
            (new Filesystem)->replaceInFile(
                '->withMiddleware(function (Middleware $middleware) {',
                '->withMiddleware(function (Middleware $middleware) {' . PHP_EOL . '        $middleware->statefulApi();',
                $this->laravel->bootstrapPath('app.php'),
            );
            $this->warn("\u{2705}  Modified 'bootstrap/app.php' file.");
        } else {
            $this->line("\u{274C}  'bootstrap/app.php' already modified, skipping.");
        }

        if (!str_contains((new Filesystem)->get($this->laravel->basePath('app/Models/User.php')), 'implements MustVerifyEmail')) {
            (new Filesystem)->replaceInFile(
                '// use Illuminate\Contracts\Auth\MustVerifyEmail;',
                'use Illuminate\Contracts\Auth\MustVerifyEmail;',
                $this->laravel->basePath('app/Models/User.php'),
            );

            (new Filesystem)->replaceInFile(
                'class User extends Authenticatable',
                'class User extends Authenticatable implements MustVerifyEmail',
                $this->laravel->basePath('app/Models/User.php'),
            );
            $this->warn("\u{2705}  Modified 'app/Models/User.php' file.");
        } else {
            $this->line("\u{274C}  'app/Models/User.php' already modified, skipping.");
        }
    }
}
