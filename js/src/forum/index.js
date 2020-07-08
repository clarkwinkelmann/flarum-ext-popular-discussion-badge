import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Discussion from 'flarum/models/Discussion';
import Badge from 'flarum/components/Badge';

/* global m */

function discussionMatchesConditions(discussion, conditions) {
    return Object.keys(conditions).every(key => {
        const value = conditions[key];

        // If there's no value or it's negative, we skip it (consider it pass)
        if (!value || value < 0) {
            return true;
        }

        switch (key) {
            case 'comments':
                return discussion.commentCount() >= value;
            case 'views':
                // `views` is from flarumite/simple-discussion-views while `viewCount` is from michaelbelgium/flarum-discussion-views
                return discussion.attribute('views') >= value || discussion.attribute('viewCount') >= value;
            default:
                console.warn('Unknown popular discussion criteria ' + key);
                return true;
        }
    });
}

app.initializers.add('clarkwinkelmann-popular-discussion-badge', () => {
    extend(Discussion.prototype, 'badges', function (items) {
        const conditionsList = app.forum.attribute('popularDiscussionBadgeConditions');

        let isPopular = false;

        if (Array.isArray(conditionsList)) {
            isPopular = conditionsList.some(conditions => discussionMatchesConditions(this, conditions));
        } else {
            isPopular = this.attribute('isPopular');
        }

        if (isPopular) {
            items.add('popular', Badge.component({
                type: 'popular',
                icon: 'fas fa-fire',
                label: app.translator.trans('clarkwinkelmann-popular-discussion-badge.forum.badge_label'),
            }));
        }
    });
});
