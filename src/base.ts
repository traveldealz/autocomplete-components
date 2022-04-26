import Tribute from "tributejs";
import debounce from './helper/debounce';

const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
  :host {
    position: relative;
  }
  .tribute-container {
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    overflow: auto;
    display: block;
    z-index: 999999;
  }
  .tribute-container ul {
    margin: 0;
    margin-top: 2px;
    padding: 0;
    list-style: none;
    background: #efefef;
  }
  .tribute-container li {
    padding: 5px 5px;
    cursor: pointer;
  }
  .tribute-container li.highlight {
    background: #ddd;
  }
  .tribute-container li span {
    font-weight: bold;
  }
  .tribute-container li.no-match {
    cursor: default;
  }
  .tribute-container .menu-highlighted {
    font-weight: bold;
  }
</style>
<slot></slot>
`;

export default class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._values = debounce(this._values, 500);
    this._tribute = new Tribute(this._tributeConfig());
    this._tribute.attach(this.firstChild);
  }

  _tributeConfig() {
    return {
      menuContainer: this.shadowRoot,
      allowSpaces: true,
      requireLeadingSpace: false,
      replaceTextSuffix: '-',
      selectTemplate: this._selectTemplate,
      lookup: this._lookup,
      menuItemTemplate: this._menuItemTemplate,
      values: this._values,
      menuShowMinLength: 3,
    };
  }

  _selectTemplate(item) {
    return item.original.locode;
  }

  _lookup(item, mentionText) {
    return item.name + ' ' + item.country;
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
