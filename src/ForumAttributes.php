<?php

namespace ClarkWinkelmann\PopularDiscussionBadge;

use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(): array
    {
        // Only include the conditions if we are in Frontend mode
        // The presence of the conditions will signal the frontend to use Frontend mode
        if ($this->settings->get('clarkwinkelmann-popular-discussion-badge.mode') !== 'scheduler') {
            return [
                'popularDiscussionBadgeConditions' => @json_decode($this->settings->get('clarkwinkelmann-popular-discussion-badge.conditions')),
            ];
        }

        return [];
    }
}
