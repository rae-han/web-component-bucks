export default class MenuItemComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log('before render');
    this.render();
    console.log('created');
  }
  disconnectedCallback() {
    console.log('disconnected');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }
  static get observedAttributes() {
    return ['id'];
  }
  update() {
    console.log('update');
    this.render();

  }
  firstUpdated() {
    console.log('firstUpdated');
    this.render();

  }
  updated() {
    console.log('updated');
    this.render();

  }
  render() {
    console.log('render');
    let $li = document.createElement('li');
    $li.classList = "menu-list-item d-flex items-center py-2";
    $li.textContent = 'list item';

    let $span = document.createElement('span');
    $span.classList = "w-100 pl-2 menu-name";
    $span.textContent = name;
    $li.appendChild($span);

    let $toggleBtn = document.createElement('button');
    $toggleBtn.classList = "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button";
    $toggleBtn.textContent = "품절";
    $li.appendChild($toggleBtn);
    $toggleBtn.onclick = () => { 
      console.log(this.id)
      this.id = 123 
    }

    let $updateBtn = document.createElement('button');
    $updateBtn.classList = "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
    $updateBtn.textContent = "수정";
    $li.appendChild($updateBtn);

    let $removeBtn = document.createElement('button');
    $removeBtn.classList = "bg-gray-50 text-gray-500 text-sm menu-remove-button";
    $removeBtn.textContent = "삭제";
    $li.appendChild($removeBtn);

    this.appendChild($li);

    console.log(this.id)
  }
  get id() {
    return this.getAttribute('id');
  }
  set id(newValue) {
    this.setAttribute('id', newValue);
  }
}