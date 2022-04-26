import BaseElement from './base';

export default class extends BaseElement {
  _selectTemplate(item) {
    return item.original.locode;
  }

  _lookup(item, mentionText) {
    return item.name + ' ' + item.country + ' ' + item.locode;
  }

  _menuItemTemplate(item) {
    return item.original.name + ', ' + item.original.country + ' [' + item.original.locode + ']';
  }

  _values(text, cb) {
    if(3 > text.length) return;
    fetch('https://data.travel-dealz.eu/api/locodes?has_port=true&search=' + encodeURIComponent(text))
      .then(resp => resp.json())
      .then(data => cb(data.data))
  }
}