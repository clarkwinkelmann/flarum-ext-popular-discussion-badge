import app from 'flarum/app';
import BaseSettingsModal from 'flarum/components/SettingsModal';
import Button from 'flarum/components/Button';

/* global m */

const settingsPrefix = 'clarkwinkelmann-popular-discussion-badge.';
const translationPrefix = 'clarkwinkelmann-popular-discussion-badge.admin.settings.';

export default class SettingsModal extends BaseSettingsModal {
    className() {
        return 'Modal--large PopularDiscussionBadgeSettings';
    }

    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    form() {
        let conditionsList;

        try {
            conditionsList = JSON.parse(this.setting(settingsPrefix + 'conditions')());
        } catch (e) {
            // do nothing, we'll reset to something usable
        }

        if (!Array.isArray(conditionsList)) {
            conditionsList = [{
                comments: null,
                views: null,
            }];
        }

        return m('table', [
            m('tbody', [
                conditionsList.map((conditions, index) => m('tr', [
                    m('td', index === 0 ? null : m('strong', app.translator.trans(translationPrefix + 'or'))),
                    m('td', [
                        m('label', [
                            app.translator.trans(translationPrefix + 'comments'),
                            ' >= ',
                        ]),
                        m('input.FormControl', {
                            type: 'number',
                            step: 1,
                            min: 0,
                            value: conditions.comments || '',
                            onchange: event => {
                                conditions.comments = event.target.value ? parseInt(event.target.value) : null;
                                this.setting(settingsPrefix + 'conditions')(JSON.stringify(conditionsList));
                            },
                        }),
                    ]),
                    m('td', m('strong', app.translator.trans(translationPrefix + 'and'))),
                    m('td', [
                        m('label', [
                            app.translator.trans(translationPrefix + 'views'),
                            ' >= ',
                        ]),
                        m('input.FormControl', {
                            type: 'number',
                            step: 1,
                            min: 0,
                            value: conditions.views || '',
                            onchange: event => {
                                conditions.views = event.target.value ? parseInt(event.target.value) : null;
                                this.setting(settingsPrefix + 'conditions')(JSON.stringify(conditionsList));
                            },
                        }),
                    ]),
                    m('td', conditionsList.length > 1 ? Button.component({
                        className: 'Button Button--icon',
                        icon: 'fas fa-times',
                        onclick: () => {
                            conditionsList.splice(index, 1);

                            this.setting(settingsPrefix + 'conditions')(JSON.stringify(conditionsList));
                        },
                    }) : null),
                ])),
                m('tr', m('td', {
                    colspan: 5,
                }, Button.component({
                    className: 'Button Button--block',
                    onclick: () => {
                        conditionsList.push({
                            comments: null,
                            views: null,
                        });

                        this.setting(settingsPrefix + 'conditions')(JSON.stringify(conditionsList));
                    },
                    children: app.translator.trans(translationPrefix + 'add'),
                })))
            ]),
        ]);
    }
}
