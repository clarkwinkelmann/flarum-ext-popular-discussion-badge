<?php

namespace ClarkWinkelmann\PopularDiscussionBadge;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Extend;

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

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->attribute('isPopular', function (DiscussionSerializer $serializer, Discussion $discussion) {
            return $discussion->is_popular;
        }),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\ServiceProvider())
        ->register(Providers\ConsoleProvider::class),
];
