<?php

namespace ClarkWinkelmann\PopularDiscussionBadge;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Settings\SettingsRepositoryInterface;

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

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->attribute('isPopular', function (DiscussionSerializer $serializer, Discussion $discussion) {
            return $discussion->is_popular;
        }),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->mutate(function () {
            /**
             * @var SettingsRepositoryInterface $settings
             */
            $settings = app(SettingsRepositoryInterface::class);

            // Only include the conditions if we are in Frontend mode
            // The presence of the conditions will signal the frontend to use Frontend mode
            if ($settings->get('clarkwinkelmann-popular-discussion-badge.mode') !== 'scheduler') {
                return [
                    'popularDiscussionBadgeConditions' => json_decode($settings->get('clarkwinkelmann-popular-discussion-badge.conditions')),
                ];
            }

            return [];
        }),

    (new Extend\ServiceProvider())
        ->register(Providers\ConsoleProvider::class),
];
