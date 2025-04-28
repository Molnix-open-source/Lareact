<?php

namespace Molnix\Lareact;

class Lareact
{

    protected $template = 'default';

    public function __construct($template = 'default')
    {
        $this->template = $template;
    }

    public function filesToCopy()
    {
        return [
            'package.json' => base_path('package.json'),
            'eslint.config.js' => base_path('eslint.config.js'),
            'tsconfig.app.json' => base_path('tsconfig.app.json'),
            'tsconfig.json' => base_path('tsconfig.json'),
            'tsconfig.node.json' => base_path('tsconfig.node.json'),
            'vite.config.js' => base_path('vite.config.js'),
            'routes/api.php' => base_path('routes/api.php'),
            'routes/auth.php' => base_path('routes/auth.php'),
            'routes/web.php' => base_path('routes/web.php'),
            'lang/en/msg.php' => base_path('lang/en/msg.php'),
            'app/Http/Controllers/AuthController.php' => app_path('Http/Controllers/AuthController.php'),
            'app/Http/Middleware/LanguageMiddleware.php' => app_path('Http/Middleware/LanguageMiddleware.php'),
        ];
    }

    public function filesToDelete()
    {
        return [
            base_path('resources/js/app.js'),
            base_path('resources/js/bootstrap.js'),
            base_path('resources/views/welcome.blade.php')
        ];
    }

    public function foldersToCopy()
    {
        return [
            'resources' =>  base_path('resources'),
            'app/Http/Requests' => app_path('Http/Requests'),
            'app/Http/Resources' => app_path('Http/Resources'),
        ];
    }

    public function getPath($path, $template = 'default'): string
    {

        return __DIR__ . str_replace('//', '/', '/../stubs/' . $template . '/' . $path);
    }
}
