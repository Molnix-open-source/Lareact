<?php

namespace Fizzybit\Lareact;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Fizzybit\Lareact\Skeleton\SkeletonClass
 */
class LareactFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'lareact';
    }
}
