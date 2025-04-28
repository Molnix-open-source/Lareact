<?php

namespace Molnix\Lareact\Console\Commands;

use Molnix\Lareact\Lareact;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class UpdateCommand extends Command
{
    protected Lareact $service;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lareact:update
                            {--force : Force reinstall, over write files.}
        ';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copy newly added components to your app.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->service = new Lareact();

        $existingFiles = collect((new Filesystem)->files(base_path('resources/js/Components')))->map(fn($item) => $item->getFilename())->toArray();
        foreach ((new Filesystem)->files($this->service->getPath('resources/js/Components')) as $soruceFile) {
            if (in_array($soruceFile->getFilename(), $existingFiles) && !$this->option('force')) {
                continue;
            }
            copy($this->service->getPath('resources/js/Components/' . $soruceFile->getFilename()), base_path('resources/js/Components/' . $soruceFile->getFilename()));
        }
    }
}
