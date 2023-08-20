<?php

namespace App\Trait;

trait Singleton
{
        private function instantiateSingleton()
        {
            app()->singletonIf(self::class, function() {
                return new self();
            });
        }
}
