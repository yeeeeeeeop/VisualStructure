class Stack {
  constructor(maxSize) {
    this.items = [];
    this.maxSize = maxSize;
  }

  push(element) {
    if (this.size() < this.maxSize) {
      this.items.push(element);
      this.render();
    } else {
      showModal('Stack is full');
    }
  }

  pop() {
    if (this.isEmpty()) return 'Stack is empty';
    const poppedElement = this.items.pop();
    this.render();
    return poppedElement;
  }

  top() {
    return this.isEmpty()
      ? 'Stack is empty'
      : this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  elements() {
    return this.items;
  }

  render() {
    const stackContainer = document.getElementById('stack');
    stackContainer.innerHTML = '';
    const stackHeight = this.items.length * 40; // 각 요소 높이와 margin을 고려
    stackContainer.style.height = `${stackHeight}px`; // 스택 컨테이너의 높이를 설정
    this.items.forEach((item) => {
      const stackElement = document.createElement('div');
      stackElement.className = 'stack-element';
      stackElement.textContent = item;
      stackContainer.appendChild(stackElement);
    });
  }
}

let stack;

function startHandler() {
  const maxSizeInput = document.getElementById('max-size-input');
  const maxSize = parseInt(maxSizeInput.value);

  if (isNaN(maxSize) || maxSize < 1) {
    showModal('1 이상의 올바른 크기(숫자)를 입력해 주세요.');
    return;
  }

  stack = new Stack(maxSize);
  document.getElementById('start-section').style.display = 'none';
  document.getElementById('controls').style.display = 'flex';
  document.getElementById('visualization').style.display = 'flex';
}

function pushHandler() {
  const elementInput = document.getElementById('element-input');
  const element = elementInput.value;

  if (!element) {
    showModal('값을 입력해주세요!');
    return;
  }

  stack.push(element);
  elementInput.value = '';
}

function popHandler() {
  const poppedElement = stack.pop();
  showModal(`Popped element: ${poppedElement}`);
}

function topHandler() {
  showModal(`Top element: ${stack.top()}`);
}

function sizeHandler() {
  showModal(`Stack size: ${stack.size()}`);
}

function isEmptyHandler() {
  showModal(`Is stack empty? ${stack.isEmpty()}`);
}

function showElementsHandler() {
  showModal(`Stack elements: ${stack.elements().join(', ')}`);
}

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', startHandler);

const pushBtn = document.querySelector('.push-btn');
pushBtn.addEventListener('click', pushHandler);

const popBtn = document.querySelector('.pop-btn');
popBtn.addEventListener('click', popHandler);

const topBtn = document.querySelector('.top-btn');
topBtn.addEventListener('click', topHandler);

const sizeBtn = document.querySelector('.size-btn');
sizeBtn.addEventListener('click', sizeHandler);

const isEmptyBtn = document.querySelector('.isEmpty-btn');
isEmptyBtn.addEventListener('click', isEmptyHandler);

const showElementsBtn = document.querySelector('.showElements-btn');
showElementsBtn.addEventListener('click', showElementsHandler);
