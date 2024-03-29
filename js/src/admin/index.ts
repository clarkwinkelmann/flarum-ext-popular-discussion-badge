import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';

const settingsPrefix = 'clarkwinkelmann-popular-discussion-badge.';
const translationPrefix = 'clarkwinkelmann-popular-discussion-badge.admin.settings.';

interface Condition {
    comments: number | null
    comments_within_hours?: number | null
    views: number | null
    views_within_hours?: number | null
}

app.initializers.add('clarkwinkelmann-popular-discussion-badge', () => {
    app.extensionData
        .for('clarkwinkelmann-popular-discussion-badge')
        .registerSetting(function () {
            let conditionsList: Condition[];

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

            return [
                m('.Form-group', [
                    m('label', app.translator.trans(translationPrefix + 'mode')),
                    Select.component({
                        options: {
                            frontend: app.translator.trans(translationPrefix + 'mode_options.frontend'),
                            scheduler: app.translator.trans(translationPrefix + 'mode_options.scheduler'),
                        },
                        value: this.setting(settingsPrefix + 'mode')() || 'frontend',
                        onchange: this.setting(settingsPrefix + 'mode'),
                    }),
                    m('p.helpText', app.translator.trans(translationPrefix + 'mode_help')),
                ]),
                m('.Form-group', [
                    m('label', app.translator.trans(translationPrefix + 'scheduler_frequency')),
                    Select.component({
                        options: {
                            everyFiveMinutes: app.translator.trans(translationPrefix + 'scheduler_frequency_options.everyFiveMinutes'),
                            everyTenMinutes: app.translator.trans(translationPrefix + 'scheduler_frequency_options.everyTenMinutes'),
                            everyFifteenMinutes: app.translator.trans(translationPrefix + 'scheduler_frequency_options.everyFifteenMinutes'),
                            everyThirtyMinutes: app.translator.trans(translationPrefix + 'scheduler_frequency_options.everyThirtyMinutes'),
                            hourly: app.translator.trans(translationPrefix + 'scheduler_frequency_options.hourly'),
                        },
                        value: this.setting(settingsPrefix + 'scheduler_frequency')() || 'hourly',
                        onchange: this.setting(settingsPrefix + 'scheduler_frequency'),
                        disabled: this.setting(settingsPrefix + 'mode')() !== 'scheduler',
                    }),
                    m('p.helpText', app.translator.trans(translationPrefix + 'scheduler_frequency_help')),
                ]),
                m('.Form-group', [
                    m('label', app.translator.trans(translationPrefix + 'conditions')),
                    m('table', [
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
                                        placeholder: app.translator.trans(translationPrefix + 'comments_placeholder'),
                                    }),
                                    m('label', [
                                        ' ',
                                        app.translator.trans(translationPrefix + 'within'),
                                        ' ',
                                    ]),
                                    m('input.FormControl', {
                                        type: 'number',
                                        step: 1,
                                        min: 0,
                                        value: conditions.comments_within_hours || '',
                                        onchange: event => {
                                            conditions.comments_within_hours = event.target.value ? parseInt(event.target.value) : null;
                                            this.setting(settingsPrefix + 'conditions')(JSON.stringify(conditionsList));
                                        },
                                        placeholder: app.translator.trans(translationPrefix + 'within_placeholder'),
                                        disabled: this.setting(settingsPrefix + 'mode')() !== 'scheduler',
                                    }),
                                    m('label', [
                                        ' ',
                                        app.translator.trans(translationPrefix + 'hours'),
                                    ]),
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
                                        placeholder: app.translator.trans(translationPrefix + 'views_placeholder'),
                                    }),
                                    m('label', [
                                        ' ',
                                        app.translator.trans(translationPrefix + 'within'),
                                        ' ',
                                    ]),
                                    m('input.FormControl', {
                                        type: 'number',
                                        step: 1,
                                        min: 0,
                                        value: conditions.views_within_hours || '',
                                        onchange: event => {
                                            conditions.views_within_hours = event.target.value ? parseInt(event.target.value) : null;
                                            this.setting(settingsPrefix + 'conditions')(JSON.stringify(conditionsList));
                                        },
                                        placeholder: app.translator.trans(translationPrefix + 'within_placeholder'),
                                        disabled: this.setting(settingsPrefix + 'mode')() !== 'scheduler',
                                    }),
                                    m('label', [
                                        ' ',
                                        app.translator.trans(translationPrefix + 'hours'),
                                    ]),
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
                            }, app.translator.trans(translationPrefix + 'add'))))
                        ]),
                    ]),
                    m('p.helpText', app.translator.trans(translationPrefix + 'conditions_help')),
                ]),
            ];
        });
});
