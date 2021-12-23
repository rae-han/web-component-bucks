import MenuItemComponent from './components/MenuItemComponent.js';
// import './components/SampleCounter.js';
// import './components/MyCounter.js';
// import './components/CustomButton.js';

customElements.define('menu-item', MenuItemComponent);

// Elements
const $inputMenuForm = document.querySelector('#inputMenuForm');
const $inputMenuName = document.querySelector('#inputMenuName');

// menu insert
function addMenu(e) {
  e.preventDefault();

  
}

$inputMenuForm.addEventListener('submit', addMenu.bind($inputMenuName));

