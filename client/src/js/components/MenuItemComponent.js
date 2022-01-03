import { updateMenuCount, showError } from '../index.js';
import { toggleMenu, updateMenu, removeMenu } from '../../api/menu.js';
import stylesheet from '../../data/menuItemStyle.js';

export default class MenuItemComponent extends HTMLElement {
// class MenuItemComponent extends HTMLElement {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    
    let shadow = this.attachShadow({mode: 'open'}); // shadow === this.shadowRoot
    this.render(shadow);
    // console.log(this.render().content.cloneNode(true))
    // this.shadowRoot.appendChild(this.render().content.cloneNode(true));

  }
  connectedCallback() {
    this.toggleBtn.addEventListener('click', this.toggle);
    this.updateBtn.addEventListener('click', this.update);
    this.removeBtn.addEventListener('click', this.remove);
  }

  render(shadow) {
    // const template = document.createElement('template');
    const style = document.createElement('style');
    style.textContent = stylesheet;

    shadow.appendChild(style);

    let $li = document.createElement('li');
    $li.setAttribute('class', "menu-list-item d-flex items-center py-2");

    let $span = document.createElement('span');
    $span.setAttribute('class', `w-100 pl-2 menu-name ${this.isSoldOut ? 'sold-out' : ''}`);
    this.menuName = $span;
    $span.textContent = this.name;
    $li.appendChild($span);

    let $toggleBtn = document.createElement('button');
    $toggleBtn.setAttribute('class', "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button");
    $toggleBtn.textContent = "품절";
    $li.appendChild($toggleBtn);
    this.toggleBtn = $toggleBtn;

    let $updateBtn = document.createElement('button');
    $updateBtn.setAttribute('class', "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button");
    $updateBtn.textContent = "수정";
    $li.appendChild($updateBtn);
    this.updateBtn = $updateBtn;

    let $removeBtn = document.createElement('button');
    $removeBtn.setAttribute('class', "bg-gray-50 text-gray-500 text-sm menu-remove-button");
    $removeBtn.textContent = "삭제";
    $li.appendChild($removeBtn);
    this.removeBtn = $removeBtn;

    shadow.appendChild($li);
    return shadow;
  }

  async toggle() {
    const { id, category } = this;

    try {
      let res = await toggleMenu({id, category});

      if(!res.ok) { throw res };
      this.isSoldOut = !this.isSoldOut;

      let jsonRes = await res.json();
    } catch (error) {
      console.error(error);
      showError(error)
    }
  }

  async update() {
    const newName = window.prompt(`${this.name}의 이름을 무엇으로 바꾸시겠습니까?`);
    const { id, category } = this;

    if(newName === '') return;

    try {
      let res = await updateMenu({id, category, name: newName});

      if(!res.ok) { throw res };
      this.name = newName;

      let jsonRes = await res.json();
    } catch (error) {
      console.error(error);
      showError(error)
    }
    
  }

  async remove() {
    const willRemove = window.confirm(`${this.name}을(를) 삭제하시겠습니까?`);
    const { id, category } = this;
    
    if(!willRemove) {
      return;
    }

    try {
      let res = await removeMenu({id, category});
      console.log(res)

      if(!res.ok) { throw res };
      updateMenuCount('decrement');
      this.parentElement.removeChild(this);
    } catch (error) {
      console.error(error);
      showError(error)
    }
  }

  static get observedAttributes() { // 이 메서드를 통해 아래 attributeChangedCallback을 실행해준다.
    console.log(0, 'get observedAttributes')
    return ['id', 'name', 'issoldout', 'category']; // 여기 없는 값은 attributeChangedCallback 에서 감지 못한다.
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(4, `attributeChangedCallback(${name}) oldValue: ${oldValue}, newValue: ${newValue}`);
    switch(name) {
      case 'issoldout':
        this.menuName.classList = `w-100 pl-2 menu-name ${this.isSoldOut ? 'sold-out' : ''}`;
        return;
      case 'name':
        this.menuName.textContent = newValue;
        return;
      default:
        return;

    }
  }

  // GET
  get id() {
    return this.getAttribute('id');
  }
  get name() {
    return this.getAttribute('name');
  }
  get isSoldOut() {
    // console.log(this.getAttribute('isSoldOut'))
    return this.getAttribute('isSoldOut') === 'true';
  }
  get category() {
    return this.getAttribute('category');
  }

  // SET
  set id(newValue) {
    this.setAttribute('id', newValue);
  }
  set name(newValue) {
    this.setAttribute('name', newValue);
  }
  set isSoldOut(newValue) {
    console.log('set', newValue)
    this.setAttribute('isSoldOut', newValue);
  }

  // unmounted
  disconnectedCallback() {
    
  }
}

