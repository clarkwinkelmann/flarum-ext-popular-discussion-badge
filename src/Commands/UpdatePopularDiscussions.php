<?php

namespace ClarkWinkelmann\PopularDiscussionBadge\Commands;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Michaelbelgium\Discussionviews\Models\DiscussionView;

class UpdatePopularDiscussions extends Command
{
    protected $signature = 'clarkwinkelmann:popular-discussions';
    protected $description = 'Updates which discussions are popular';

    public function handle(SettingsRepositoryInterface $settings)
    {
        if ($settings->get('clarkwinkelmann-popular-discussion-badge.mode') !== 'scheduler') {
            $this->warn('The extension is not in scheduler mode. The computation done here might be ignored');
        }

        $conditionSets = json_decode($settings->get('clarkwinkelmann-popular-discussion-badge.conditions'), true);

        if (!is_array($conditionSets)) {
            $this->error('The condition list is not correctly formatted (not an array)');
            return;
        }

        if (count($conditionSets) === 0) {
            $this->warn('No conditions to evaluate, aborting update');
            return;
        }

        $popularDiscussionIds = [];

        foreach ($conditionSets as $index => $conditions) {
            $matchingCommentDiscussionIds = null;

            if ($commentCountWanted = Arr::get($conditions, 'comments')) {
                $query = Discussion::query();

                if ($timeframe = Arr::get($conditions, 'comments_within_hours')) {
                    $commentsAfter = Carbon::now()->subHours($timeframe);

                    $query->whereHas('comments', function (Builder $builder) use ($commentsAfter) {
                        $builder->where('created_at', '>=', $commentsAfter);
                    }, '>=', $commentCountWanted);
                } else {
                    $query->where('comment_count', '>=', $commentCountWanted);
                }

                $matchingCommentDiscussionIds = $query->pluck('id')->all();
            }

            $matchingViewDiscussionIds = null;

            if ($viewCountWanted = Arr::get($conditions, 'views')) {
                $query = Discussion::query();

                if ($timeframe = Arr::get($conditions, 'views_within_hours')) {
                    if (!class_exists(DiscussionView::class)) {
                        throw new \Exception('Extension michaelbelgium/flarum-discussion-views must be used for the view timeframe feature');
                    }

                    $viewsAfter = Carbon::now()->subHours($timeframe);

                    // The `views` relationship is defined in michaelbelgium/flarum-discussion-views's extend.php
                    $query->whereHas('views', function (Builder $builder) use ($viewsAfter) {
                        $builder->where('visited_at', '>=', $viewsAfter);
                    }, '>=', $viewCountWanted);
                } else {
                    // `view_count` is used by both view counter extensions
                    $query->where('view_count', '>=', $viewCountWanted);
                }

                $matchingViewDiscussionIds = $query->pluck('id')->all();
            }

            $additionalPopularDiscussionIds = [];

            // If both conditions were evaluated, we use the discussions that were matched by both filters
            // If only one condition was evaluated, we use all the discussions that matched that condition
            if (!is_null($matchingCommentDiscussionIds) && !is_null($matchingViewDiscussionIds)) {
                $additionalPopularDiscussionIds = array_intersect($matchingCommentDiscussionIds, $matchingViewDiscussionIds);
            } else if (!is_null($matchingCommentDiscussionIds) && is_null($matchingViewDiscussionIds)) {
                $additionalPopularDiscussionIds = $matchingCommentDiscussionIds;
            } else if (is_null($matchingCommentDiscussionIds) && !is_null($matchingViewDiscussionIds)) {
                $additionalPopularDiscussionIds = $matchingViewDiscussionIds;
            }

            $this->info(count($additionalPopularDiscussionIds) . ' discussions matched by condition #' . $index);

            $popularDiscussionIds = array_unique(array_merge($popularDiscussionIds, $additionalPopularDiscussionIds));
        }

        $this->info(count($popularDiscussionIds) . ' discussions matched as popular');

        $currentlyPopularDiscussionIds = Discussion::query()
            ->where('is_popular', true)
            ->pluck('id')
            ->all();

        $newPopularDiscussionIds = array_diff($popularDiscussionIds, $currentlyPopularDiscussionIds);

        $this->info(count($newPopularDiscussionIds) . ' discussions switched from not popular to popular');

        Discussion::query()->whereIn('id', $newPopularDiscussionIds)->update([
            'is_popular' => true,
        ]);

        $noLongerPopularDiscussionIds = array_diff($currentlyPopularDiscussionIds, $popularDiscussionIds);

        $this->info(count($noLongerPopularDiscussionIds) . ' discussions switched from popular to not popular');

        Discussion::query()->whereIn('id', $noLongerPopularDiscussionIds)->update([
            'is_popular' => false,
        ]);
    }
}
