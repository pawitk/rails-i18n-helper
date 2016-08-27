'use babel';

export default class RailsI18nHelperView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('rails-i18n-helper');

    this.lineEdit = document.createElement("atom-text-editor")
    this.lineEdit.setAttribute("mini", "")
    this.lineEdit.classList.add('native-key-bindings');
    this.lineEdit.setAttribute("tabindex",-1);
    this.element.appendChild(this.lineEdit)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getLineEdit() {
    return this.lineEdit
  }
}
