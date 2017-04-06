<?php

namespace Cosapi\Providers;

use Illuminate\Support\ServiceProvider;

class VuejsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/../../node_modules/vue-resource/dist' => public_path('../resources/assets/node_modules/vue-resource'),
        ], 'public');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
