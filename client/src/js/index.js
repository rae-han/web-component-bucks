// import MenuItemComponent from './components/MenuItemComponent.js';
import './components/MenuItemComponent.js';
import './components/PopUpInfo.js'

import { menuRegister, menuLoad } from '../api/menu.js'

// customElements.define('menu-item', MenuItemComponent);

// Elements
const $inputMenuForm = document.querySelector('#inputMenuForm');
const $inputMenuName = document.querySelector('#inputMenuName');
const $menuList = document.querySelector('#menuList');

// insert menj
async function addMenu(e) {
  console.log('func addMenu');
  e.preventDefault();

  let newMenuName = this.value;

  try {
    let res = await menuRegister(newMenuName);
    
    if(!res.ok) { throw res };

    await fetchMenu();
  } catch (error) {
    console.error(error);
  }

  this.value = '';
}

$inputMenuForm.addEventListener('submit', addMenu.bind($inputMenuName));

// select menu
const fetchMenu = async () => {
  console.log('func fetchMenu');
  try {
    let res = await menuLoad();

    let menu = await res.json()
    makeMenuList(menu);
    return res;
  } catch (error) {
    console.error(error);
  }
}

// create menu item
const makeMenuList = menu => {
  console.log('func makeMenuList');
  console.log(menu)
  removeChildElements($menuList);

  // let $popup = document.createElement('popup-info');
  // console.log($popup);

  // let $menuItme = document.createElement('menu-item');
  // console.dir($menuItme);

  let $menuItems = menu.map(menuItem => {
    let $menuItem = document.createElement('menu-item');
    console.log($menuItem);
    return $menuItem;
  })

  $menuList.append(...$menuItems);

  return $menuItems;
}

const removeChildElements = $el => {
  while($el.hasChildNodes()) {
    $el.removeChild($el.firstChild);
  }
}

window.onload = () => {
  fetchMenu();
}

