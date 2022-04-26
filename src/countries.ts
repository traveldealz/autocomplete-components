import BaseElement from './base';

export default class extends BaseElement {

  connectedCallback() {
    super.connectedCallback();
    fetch('https://data.travel-dealz.eu/api/countries')
      .then(resp => resp.json())
      .then(countries => this._tribute.append(0, countries))
  }

  _tributeConfig() {
    return {
      ...super._tributeConfig(),
      replaceTextSuffix: ',',
      values: [],
      };
  }

  _selectTemplate(item) {
    return item.original.code;
  }

  _lookup(item, mentionText) {
    return item.name + ' ' + item.name_native;
  }

  _menuItemTemplate(item) {
    return item.original.name + ' ' + item.original.emoji + ' [' + item.original.code + ']';
  }

}