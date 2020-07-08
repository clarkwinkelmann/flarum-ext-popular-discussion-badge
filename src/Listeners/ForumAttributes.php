<?php

namespace ClarkWinkelmann\PopularDiscussionBadge\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class ForumAttributes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'attributes']);
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            /**
             * @var SettingsRepositoryInterface $settings
             */
            $settings = app(SettingsRepositoryInterface::class);

            // Only include the conditions if we are in Frontend mode
            // The presence of the conditions will signal the frontend to use Frontend mode
            if ($settings->get('clarkwinkelmann-popular-discussion-badge.mode') !== 'scheduler') {
                $event->attributes += [
                    'popularDiscussionBadgeConditions' => json_decode($settings->get('clarkwinkelmann-popular-discussion-badge.conditions')),
                ];
            }
        }
    }
}
