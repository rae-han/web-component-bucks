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
    showError(error)
  }

  this.value = '';
}
$inputMenuForm.addEventListener('submit', addMenuItem.bind($inputMenuName));
$btnSubmit.addEventListener('click', addMenuItem.bind($inputMenuName));

// select menu
const fetchMenuList = async category => {
  try {
    let res = await fetchMenu(category);
    if(!res?.ok) { throw res };

    let menu = await res.json()
    createMenuList(menu);
    return res;
  } catch (error) {
    console.error(error);
    showError(error)
  }
}

const createMenuItem = menuItem => {
  let $menuItem = document.createElement('menu-item');
  $menuItem.setAttribute('id', menuItem.id);
  $menuItem.setAttribute('name', menuItem.name);
  $menuItem.setAttribute('isSoldOut', menuItem.isSoldOut);
  // $menuItem.setAttribute('category', current.category);
  $menuItem.dataset.category = current.category;
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
    current.category = categoryName;
    let res = await fetchMenuList(categoryName);
    $inputMenuName.setAttribute('placeholder', target.textContent.match(/[가-힣]+/));
    $categoryName.textContent = target.textContent;
  } catch (error) {
    console.error(error);
  } 
}
$categoryNav.addEventListener('click', switchCategory);

const showError = async error => {
  let { message } = await error.json();
  window.alert(message);
}

// const remove
window.onload = () => {
  // fetchMenuList(current.category);
}

window.addEventListener('load', () => {
  fetchMenuList(current.category);
  console.log('window load');
});

export {
  updateMenuCount,
  showError
}

