import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SettingsModal from './components/SettingsModal';

app.initializers.add('clarkwinkelmann-popular-discussion-badge', () => {
    app.extensionSettings['clarkwinkelmann-popular-discussion-badge'] = () => app.modal.show(SettingsModal);
});
