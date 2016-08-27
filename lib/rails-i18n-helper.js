'use babel';

import RailsI18nHelperView from './rails-i18n-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  railsI18nHelperView: null,
  modalPanel: null,
  subscriptions: null,
  plainText: null,
  translationKey: null,

  activate(state) {
    this.railsI18nHelperView = new RailsI18nHelperView(state.railsI18nHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.railsI18nHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rails-i18n-helper:toggle': () => this.toggle(),
      'core:cancel': () => this.close(),
      'core:close': () => this.close(),
      'core:confirm': () => this.confirm()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.railsI18nHelperView.destroy();
  },

  serialize() {
    return {
      railsI18nHelperViewState: this.railsI18nHelperView.serialize()
    };
  },

  toggle() {
    var editor = atom.workspace.getActiveTextEditor();
    if(editor) {
      this.plainText = editor.getSelectedText();
      console.log(this.plainText);
      this.railsI18nHelperView.getLineEdit().getModel().setText(this.plainText);
    }
    this.railsI18nHelperView.getLineEdit().focus();
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  close() {
    return (
      this.modalPanel.hide()
    );
  },

  confirm() {
    this.translationKey = this.railsI18nHelperView.getLineEdit().getModel().getText();
    console.log(this.plainText + " => " + this.translationKey);
    // TODO: Implement text replace and append to locale file
  }

};
