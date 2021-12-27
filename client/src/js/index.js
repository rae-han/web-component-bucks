import MenuItemComponent from './components/MenuItemComponent.js';
// import './components/MenuItemComponent.js';
// import './components/PopUpInfo.js'

import { addMenu, fetchMenu } from '../api/menu.js'

customElements.define('menu-item', MenuItemComponent);

// Elements
const $inputMenuForm = document.querySelector('#InputMenuForm');
const $inputMenuName = document.querySelector('#InputMenuName');
const $btnSubmit = document.querySelector('button[name=submit]');
const $menuList = document.querySelector('#MenuList');
const $menuCount = document.querySelector('#MenuCount');
const $categoryNav = document.querySelector('#CategoryNav');
const $categoryName = document.querySelector('#CategoryName');

// current status
const current = {
  category: 'espresso'
}

// insert menj
async function addMenuItem(e) {
  console.log('func addMenuItem');
  e.preventDefault();

  let newMenuName = this.value;

  try {
    const res = await addMenu({
      category: current.category,
      name: newMenuName,
    });
    
    if(!res.ok) { throw res };

    const jsonRes = await res.json();
    $menuList.appendChild(createMenuItem(jsonRes));
    updateMenuCount('increment');
  } catch (error) {
    console.error(error);
  }

  this.value = '';
}

$inputMenuForm.addEventListener('submit', addMenuItem.bind($inputMenuName));
$btnSubmit.addEventListener('click', addMenuItem.bind($inputMenuName));


// select menu
const fetchMenuList = async category => {
  console.log('func fetchMenu');
  try {
    let res = await fetchMenu(category);

    let menu = await res.json()
    createMenuList(menu);
    return res;
  } catch (error) {
    console.error(error);
  }
}

const createMenuItem = menuItem => {
  let $menuItem = document.createElement('menu-item');
  $menuItem.setAttribute('id', menuItem.id);
  $menuItem.setAttribute('name', menuItem.name);
  $menuItem.setAttribute('isSoldOut', menuItem.isSoldOut);
  $menuItem.setAttribute('category', current.category);
  return $menuItem;
}

const updateMenuCount = count => {
  switch(count) {
    case 'increment':
      $menuCount.textContent = +$menuCount.textContent + 1;
      return;
    case 'decrement':
      $menuCount.textContent = +$menuCount.textContent - 1;
      return;
    default:
      $menuCount.textContent = count;
      return;
  }
}

// create menu list
const createMenuList = menu => {
  removeChildElements($menuList);

  let $menuItems = menu.map(menuItem => createMenuItem(menuItem));
  $menuList.append(...$menuItems);

  updateMenuCount($menuItems.length);

  return $menuItems;
}

const removeChildElements = $el => {
  while($el.hasChildNodes()) {
    $el.removeChild($el.firstChild);
  }
}

const switchCategory = async ({target}) => {
  if(!target.matches('#CategoryNav > .cafe-category-name')) return;

  const { categoryName } = target.dataset;

  try {
    let res = await fetchMenuList(categoryName);
    $inputMenuName.setAttribute('placeholder', target.textContent.match(/[가-힣]+/));
    $categoryName.textContent = target.textContent;
    current.category = categoryName;
  } catch (error) {
    console.error(error);
  } 
  
}

$categoryNav.addEventListener('click', switchCategory);

// const remove
window.onload = () => {
  fetchMenuList(current.category);
}

export {
  updateMenuCount
}

