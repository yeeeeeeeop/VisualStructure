class Queue {
  constructor(maxSize) {
    this.items = [];
    this.maxSize = maxSize;
  }

  enqueue(element) {
    if (this.size() < this.maxSize) {
      this.items.push(element);
      this.render();
    } else {
      showModal('Queue is full');
    }
  }

  dequeue() {
    if (this.isEmpty()) return 'Queue is empty';
    const dequeuedElement = this.items.shift();
    this.render();
    return dequeuedElement;
  }

  front() {
    return this.isEmpty() ? 'Queue is empty' : this.items[0];
  }

  rear() {
    return this.isEmpty()
      ? 'Queue is empty'
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
    const queueContainer = document.getElementById('queue');
    queueContainer.innerHTML = '';
    this.items.forEach((item, index) => {
      const queueElement = document.createElement('div');
      queueElement.className = 'queue-element';
      if (index === 0) queueElement.classList.add('front');
      if (index === this.items.length - 1) queueElement.classList.add('rear');
      queueElement.style.left = `${index * 85}px`;
      queueElement.textContent = item;
      queueContainer.appendChild(queueElement);
    });
  }
}

let queue;

function startHandler() {
  const maxSizeInput = document.getElementById('max-size-input');
  const maxSize = parseInt(maxSizeInput.value);
  if (!isNaN(maxSize) && maxSize > 0) {
    queue = new Queue(maxSize);
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('controls').style.display = 'flex';
    document.getElementById('visualization').style.display = 'flex';
  } else {
    showModal('Please enter a valid max size');
  }
}

function enqueueHandler() {
  const elementInput = document.getElementById('element-input');
  const element = elementInput.value;
  if (element) {
    queue.enqueue(element);
    elementInput.value = '';
  }
}

function dequeueHandler() {
  const dequeuedElement = queue.dequeue();
  showModal(`Dequeued element: ${dequeuedElement}`);
}

function frontHandler() {
  showModal(`Front element: ${queue.front()}`);
}

function rearHandler() {
  showModal(`Rear element: ${queue.rear()}`);
}

function sizeHandler() {
  showModal(`Queue size: ${queue.size()}`);
}

function isEmptyHandler() {
  showModal(`Is queue empty? ${queue.isEmpty()}`);
}

function elementsHandler() {
  showModal(`Queue elements: ${queue.elements().join(', ')}`);
}

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', startHandler);

const enqueueBtn = document.querySelector('.enqueue-btn');
enqueueBtn.addEventListener('click', enqueueHandler);

const dequeueBtn = document.querySelector('.dequeue-btn');
dequeueBtn.addEventListener('click', dequeueHandler);

const frontBtn = document.querySelector('.front-btn');
frontBtn.addEventListener('click', frontHandler);

const rearBtn = document.querySelector('.rear-btn');
rearBtn.addEventListener('click', rearHandler);

const sizeBtn = document.querySelector('.size-btn');
sizeBtn.addEventListener('click', sizeHandler);

const isEmptyBtn = document.querySelector('.isEmpty-btn');
isEmptyBtn.addEventListener('click', isEmptyHandler);

const elementsBtn = document.querySelector('.elements-btn');
elementsBtn.addEventListener('click', elementsHandler);
