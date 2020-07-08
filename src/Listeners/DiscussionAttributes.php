<?php

namespace ClarkWinkelmann\PopularDiscussionBadge\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\DiscussionSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class DiscussionAttributes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'attributes']);
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class)) {
            $event->attributes['isPopular'] = $event->model->is_popular;
        }
    }
}
