export default class MenuItemComponent extends HTMLElement {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);

    this.render();
  }
  connectedCallback() {
    this.toggleBtn.addEventListener('click', this.toggle);
  }

  render() {
    console.log(2, 'render');
    let $li = document.createElement('li');
    $li.classList = "menu-list-item d-flex items-center py-2";

    let $span = document.createElement('span');
    $span.classList = `w-100 pl-2 menu-name ${this.isSoldOut ? 'sold-out' : ''}`;
    this.menuName = $span;
    $span.textContent = this.name;
    $li.appendChild($span);

    let $toggleBtn = document.createElement('button');
    $toggleBtn.classList = "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button";
    $toggleBtn.textContent = "품절";
    $li.appendChild($toggleBtn);
    this.toggleBtn = $toggleBtn;

    let $updateBtn = document.createElement('button');
    $updateBtn.classList = "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
    $updateBtn.textContent = "수정";
    $li.appendChild($updateBtn);

    let $removeBtn = document.createElement('button');
    $removeBtn.classList = "bg-gray-50 text-gray-500 text-sm menu-remove-button";
    $removeBtn.textContent = "삭제";
    $li.appendChild($removeBtn);

    this.appendChild($li);
  }

  toggle() {
    this.isSoldOut = !this.isSoldOut;
  }

  static get observedAttributes() { // 이 메서드를 통해 아래 attributeChangedCallback을 실행해준다.
    console.log(0, 'get observedAttributes')
    return ['id', 'name', 'issoldout']; // 여기 없는 값은 attributeChangedCallback 에서 감지 못한다.
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(4, `attributeChangedCallback oldValue: ${oldValue}, newValue: ${newValue}`);
    this.menuName.classList = `w-100 pl-2 menu-name ${this.isSoldOut ? 'sold-out' : ''}`
  }

  // GET
  get id() {
    return this.getAttribute('id');
  }
  get name() {
    return this.getAttribute('name');
  }
  get isSoldOut() {
    console.log(this.getAttribute('isSoldOut'))
    return this.getAttribute('isSoldOut') === 'true';
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

