<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'FamClan') ?? config('app.name', 'FamClan') }}</title>


    <!-- Styles / Scripts -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/main.tsx'])

</head>

@php
    $data = [
        'flash' => [
            'info' => session('info'),
            'success' => session('success'),
            'warning' => session('warning'),
            'error' => session('error'),
            'default' => session('default'),
        ],
    ];
    $initData = htmlspecialchars(json_encode($data), ENT_QUOTES, 'UTF-8');
@endphp

<body class="antialiased flex flex-col bg-base-200" data-init="<?= $initData ?>">
    <div id="root"></div>
</body>

</html>
