<?php

namespace ClarkWinkelmann\PopularDiscussionBadge\Events;

/**
 * This event will only be dispatched if the extension is using the scheduler mode.
 */
class DiscussionBecamePopular
{
    public $discussionId;

    public function __construct($discussionId)
    {
        $this->discussionId = $discussionId;
    }
}
