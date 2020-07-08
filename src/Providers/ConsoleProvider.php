<?php

namespace ClarkWinkelmann\PopularDiscussionBadge\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Console\Scheduling\Schedule;

class ConsoleProvider extends AbstractServiceProvider
{
    public function register()
    {
        if (!defined('ARTISAN_BINARY')) {
            define('ARTISAN_BINARY', 'flarum');
        }

        $settings = $this->app->make(SettingsRepositoryInterface::class);

        if ($settings->get('clarkwinkelmann-popular-discussion-badge.mode') !== 'scheduler') {
            return;
        }

        $frequency = $settings->get('clarkwinkelmann-popular-discussion-badge.scheduler_frequency', 'daily');

        $this->app->resolving(Schedule::class, function (Schedule $schedule) use ($frequency) {
            $builder = $schedule->command('clarkwinkelmann:popular-discussions');

            switch ($frequency) {
                case 'everyFiveMinutes':
                    $builder->everyFiveMinutes();
                    break;
                case 'everyTenMinutes':
                    $builder->everyTenMinutes();
                    break;
                case 'everyFifteenMinutes':
                    $builder->everyFifteenMinutes();
                    break;
                case 'everyThirtyMinutes':
                    $builder->everyThirtyMinutes();
                    break;
                case 'hourly':
                default:
                    $builder->hourly();
                    break;
            }

            $builder->withoutOverlapping();
        });
    }
}
