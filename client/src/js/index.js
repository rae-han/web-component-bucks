import MenuItemComponent from './components/MenuItemComponent.js';

import { menuRegister } from '../api/menu.js'

customElements.define('menu-item', MenuItemComponent);

// Elements
const $inputMenuForm = document.querySelector('#inputMenuForm');
const $inputMenuName = document.querySelector('#inputMenuName');

// menu insert
function addMenu(e) {
  e.preventDefault();

  let newMenuName = this.value;

  let res =  menuRegister(newMenuName);
  
  this.value = '';
}

$inputMenuForm.addEventListener('submit', addMenu.bind($inputMenuName));

