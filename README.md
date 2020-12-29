# Popular Discussion Badge

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/clarkwinkelmann/flarum-ext-popular-discussion-badge/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/clarkwinkelmann/flarum-ext-popular-discussion-badge.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-popular-discussion-badge) [![Total Downloads](https://img.shields.io/packagist/dt/clarkwinkelmann/flarum-ext-popular-discussion-badge.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-popular-discussion-badge) [![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/clarkwinkelmann)

Adds a "popular" badge to discussions based on custom criteria.

The extension can be used in two main "modes":

### Frontend mode

This mode verifies the badge conditions client-side against the information the current user can see.
The database column is not used at all.

In Frontend mode, the following criteria are available:

- Number of comments
- Number of views

The number of views is not computed by this extension.
It requires either `michaelbelgium/flarum-discussion-views` or `flarumite/simple-discussion-views`.

### Scheduler mode

This mode makes use of a CRON job to update the discussion status.
[See this thread on how to configure the Flarum scheduler in your crontab](https://discuss.flarum.org/d/24118-setup-the-flarum-scheduler-using-cron)

You can configure the frequency of the update through the extension settings.

In Scheduler mode, the following criteria are available:

- Number of comments
- Timeframe for the number of comments (in n last hours, leave empty for the total)
- Number of views
- Timeframe for the number of views (in n last hours, leave empty for the total)

The number of views is not computed by this extension.
It requires either `michaelbelgium/flarum-discussion-views` or `flarumite/simple-discussion-views`.

It's only possible to time-constraint the views of `michaelbelgium/flarum-discussion-views`.
Setting a views timeframe while using the Flarumite views extensions will result in an error.

## Installation

    composer require clarkwinkelmann/flarum-ext-popular-discussion-badge

## Support

This extension is under **minimal maintenance**.

It was developed for a client and released as open-source for the benefit of the community.
I might publish simple bugfixes or compatibility updates for free.

You can [contact me](https://clarkwinkelmann.com/flarum) to sponsor additional features or updates.

Support is offered on a "best effort" basis through the Flarum community thread.

**Sponsors**: [Daniel Alter](https://convo.co.il/), [Phenomlab](https://phenomlab.net/)

## Links

- [GitHub](https://github.com/clarkwinkelmann/flarum-ext-popular-discussion-badge)
- [Packagist](https://packagist.org/packages/clarkwinkelmann/flarum-ext-popular-discussion-badge)
- [Discuss](https://discuss.flarum.org/d/24490)
