class MyCounter extends HTMLElement {
  constructor() {
    console.log(1, 'constructor')
    super();

    this.increment = this.increment.bind(this);

    this.render();
  };

  connectedCallback() {
    console.log(8, 'connectedCallback');

    this.incrementBtn.addEventListener('click', this.increment);
    
    if(!this.hasAttribute('value')) {
      this.setAttribute('value', 1);
    }
  }
  render() {
    console.log(2, 'render')
    const style = document.createElement('style');
    style.innerHTML = `
    .calc > button, .number {
      font-size: 3rem;
      font-family: monospace;
      padding: 0 .5rem;
    }

    .calc > button {
      background: pink;
      color: black;
      border: 0;
      border-radius: 6px;
      box-shadow: 0 0 5px rgba(173, 61, 85, .5);
    }

    .calc > button:active {
      background: #ad3d55;
      color: white;
    }
    `;
    this.appendChild(style);

    const $calc = document.createElement('div');
    $calc.classList = 'calc';

    const $decrementBtn = document.createElement('button');
    $decrementBtn.setAttribute("decrement", "");
    $decrementBtn.textContent = "-";
    this.decrementBtn = $decrementBtn;
    $calc.appendChild($decrementBtn);

    const $span = document.createElement('span');
    $span.classList = "number";
    $span.textContent = 0;
    this.displayVal = $span;
    $calc.appendChild($span);

    const $incrementBtn = document.createElement('button');
    $incrementBtn.setAttribute("increment", "");
    $incrementBtn.textContent = "+";
    this.incrementBtn = $incrementBtn;
    $calc.appendChild($incrementBtn);

    this.appendChild($calc);
  }

  increment() {
    const newValue = +this.value + this.step;
    console.log(this.value, this.step)
    console.log(this.max)
    console.log(newValue)
    console.log('this in increment method', this);

    this.value = this.max && newValue > this.max ? +this.max : newValue;
  }

  static get observedAttributes() { // 이 메서드를 통해 아래 attributeChangedCallback을 실행해준다.
    console.log(0, 'get observedAttributes')
    return ['value']; // 여기 없는 값은 attributeChangedCallback 에서 감지 못한다.
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(4, `attributeChangedCallback oldValue: ${oldValue}, newValue: ${newValue}`);
    this.displayVal.innerText = this.value;
  }

  get value() {
    console.log('get value');
    return this.getAttribute('value');
  }

  get step() {
    console.log(this.getAttribute('step'))
    return +this.getAttribute('step') || 1;
  }

  get min() {
    return this.getAttribute('min');
  }

  get max() {
    return this.getAttribute('max');
  }

  set value(newValue) {
    console.log('set value')
    this.setAttribute('value', newValue);
  }

  set step(newValue) {
    this.setAttribute('step', newValue);
  }

  set min(newValue) {
    this.setAttribute('min', newValue);
  }

  set max(newValue) {
    this.setAttribute('max', newValue);
  }

  disconnectedCallback() {
    this.incrementBtn.removeEventListener('click', this.increment);
  }
};

window.customElements.define('my-counter', MyCounter)