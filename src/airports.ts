import BaseElement from './base';

export default class extends BaseElement {
  _selectTemplate(item) {
    return item.original.iatacode ? item.original.iatacode : item.original.icaocode;
  }

  _lookup(item, mentionText) {
    return item.name + ' ' + item.country + ' ' + item.iatacode + ' ' + item.icaocode;
  }

  _menuItemTemplate(item) {
    return item.original.name + ', ' + item.original.country + ' [' + (item.original.iatacode ? item.original.iatacode : item.original.icaocode) + ']';
  }

  _values(text, cb) {
    if(3 > text.length) return;
    fetch('https://data.travel-dealz.eu/api/airports?search=' + encodeURIComponent(text))
      .then(resp => resp.json())
      .then(data => cb(data.data))
  }
}