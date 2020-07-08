<?php

namespace ClarkWinkelmann\PopularDiscussionBadge;

use Flarum\Extend;
use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Console())
        ->command(Commands\UpdatePopularDiscussions::class),

    new \FoF\Console\Extend\EnableConsole(),

    function (Application $app, Dispatcher $events) {
        $app->register(Providers\ConsoleProvider::class);

        $events->subscribe(Listeners\DiscussionAttributes::class);
        $events->subscribe(Listeners\ForumAttributes::class);
    },
];
