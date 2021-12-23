import MenuItemComponent from './components/MenuItemComponent.js';

import { menuRegister, menuLoad } from '../api/menu.js'

customElements.define('menu-item', MenuItemComponent);

// Elements
const $inputMenuForm = document.querySelector('#inputMenuForm');
const $inputMenuName = document.querySelector('#inputMenuName');

// menu insert
async function addMenu(e) {
  e.preventDefault();

  let newMenuName = this.value;

  try {
    let res = await menuRegister(newMenuName);
    
    if(!res.ok) { throw res };

    let menuList = await fetchMenu();
    menuList = await menuList.json();
    console.log(menuList);
    

  } catch (error) {
    console.error(error);
  }

  this.value = '';
}

$inputMenuForm.addEventListener('submit', addMenu.bind($inputMenuName));

const fetchMenu = async () => {
  try {
    let res = await menuLoad();

    return res;
  } catch (error) {
    console.error(error);
  }
}

