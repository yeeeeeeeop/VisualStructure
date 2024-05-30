import { showModal } from './modal.js';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  addNode(parentNode, value, isLeft) {
    if (this.contains(value)) {
      showModal('Node with this value already exists.');
      return;
    }

    const newNode = new TreeNode(value);
    if (parentNode === null) {
      this.root = newNode;
    } else {
      newNode.parent = parentNode;
      if (isLeft) {
        parentNode.left = newNode;
      } else {
        parentNode.right = newNode;
      }
    }
    this.render();
  }

  contains(value) {
    return this.containsHelper(this.root, value);
  }

  containsHelper(node, value) {
    if (node === null) {
      return false;
    }
    if (node.value === value) {
      return true;
    }
    return (
      this.containsHelper(node.left, value) ||
      this.containsHelper(node.right, value)
    );
  }

  depth() {
    return this.depthHelper(this.root);
  }

  depthHelper(node) {
    if (node === null) {
      return 0;
    }
    return (
      1 + Math.max(this.depthHelper(node.left), this.depthHelper(node.right))
    );
  }

  height() {
    return this.depth();
  }

  async preOrder() {
    this.clearVisited();
    const result = [];
    await this.preOrderHelper(this.root, result);
    await this.sleep(1000);
    this.showTraversalResult('preOrder', result);
    this.clearVisited();
  }

  async preOrderHelper(node, result) {
    if (node !== null) {
      this.visit(node);
      result.push(node.value);
      await this.sleep(500);
      await this.preOrderHelper(node.left, result);
      await this.preOrderHelper(node.right, result);
    }
  }

  async inOrder() {
    this.clearVisited();
    const result = [];
    await this.inOrderHelper(this.root, result);
    this.showTraversalResult('inOrder', result);
    await this.sleep(1000);
    this.clearVisited();
  }

  async inOrderHelper(node, result) {
    if (node !== null) {
      await this.inOrderHelper(node.left, result);
      this.visit(node);
      result.push(node.value);
      await this.sleep(500);
      await this.inOrderHelper(node.right, result);
    }
  }

  async postOrder() {
    this.clearVisited();
    const result = [];
    await this.postOrderHelper(this.root, result);
    this.showTraversalResult('postOrder', result);
    await this.sleep(1000);
    this.clearVisited();
  }

  async postOrderHelper(node, result) {
    if (node !== null) {
      await this.postOrderHelper(node.left, result);
      await this.postOrderHelper(node.right, result);
      this.visit(node);
      result.push(node.value);
      await this.sleep(500);
    }
  }

  showTraversalResult(prefix, result) {
    showModal(prefix + ': ' + result.join(' -> '));
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  visit(node) {
    const nodeElement = document.getElementById(`node-${node.value}`);
    if (nodeElement) {
      nodeElement.classList.add('visited');
    }
  }

  clearVisited() {
    const visitedNodes = document.querySelectorAll('.node.visited');
    visitedNodes.forEach((node) => {
      node.classList.remove('visited');
    });
  }

  render() {
    const treeContainer = document.getElementById('tree');
    const svgContainer = document.getElementById('tree-svg');
    treeContainer.innerHTML = '';
    svgContainer.innerHTML = '';
    this.renderNode(this.root, treeContainer, svgContainer, 175, 20, 100);
  }

  renderNode(node, container, svgContainer, x, y, offset) {
    if (node !== null) {
      const nodeElement = document.createElement('div');
      nodeElement.className = 'node';
      nodeElement.id = `node-${node.value}`;
      nodeElement.style.left = `${x}px`;
      nodeElement.style.top = `${y}px`;
      nodeElement.textContent = node.value;
      nodeElement.addEventListener('click', (e) => {
        e.stopPropagation();
        openNodeModal(node);
      });
      container.appendChild(nodeElement);

      if (node.left) {
        this.renderEdge(svgContainer, x + 25, y + 25, x - offset + 25, y + 125);
        this.renderNode(
          node.left,
          container,
          svgContainer,
          x - offset,
          y + 100,
          offset / 2,
        );
      }
      if (node.right) {
        this.renderEdge(svgContainer, x + 25, y + 25, x + offset + 25, y + 125);
        this.renderNode(
          node.right,
          container,
          svgContainer,
          x + offset,
          y + 100,
          offset / 2,
        );
      }
    }
  }

  renderEdge(svgContainer, x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'black');
    svgContainer.appendChild(line);
  }
}

const tree = new Tree();
let currentParentNode = null;

function startHandler() {
  const rootNodeInput = document.getElementById('root-node-input');
  const value = rootNodeInput.value;
  if (value !== null && value.trim() !== '') {
    tree.addNode(null, value.trim(), false);
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('controls').style.display = 'flex';
    document.getElementById('visualization').style.display = 'flex';
  } else {
    showModal('Please enter a valid root node value');
  }
}

function depthHandler() {
  showModal(`Depth: ${tree.depth()}`);
}

function heightHandler() {
  showModal(`Height: ${tree.height()}`);
}

function preOrderHandler() {
  tree.preOrder();
}

function inOrderHandler() {
  tree.inOrder();
}

function postOrderHandler() {
  tree.postOrder();
}

function openNodeModal(node) {
  currentParentNode = node;
  const nodeModal = document.getElementById('node-modal');
  nodeModal.style.display = 'block';
}

function closeNodeModal() {
  const nodeModal = document.getElementById('node-modal');
  nodeModal.style.display = 'none';
}

function addNodeHandler() {
  const valueInput = document.getElementById('node-value');
  const positionSelect = document.getElementById('node-position');
  const value = valueInput.value;
  const isLeft = positionSelect.value === 'left';

  if (value !== null && value.trim() !== '') {
    tree.addNode(currentParentNode, value.trim(), isLeft);
    closeNodeModal();
  } else {
    showModal('Please enter a valid node value');
  }
}

document
  .getElementById('tree')
  .addEventListener('click', () => openNodeModal(null));

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', startHandler);

const depthBtn = document.querySelector('.depth-btn');
depthBtn.addEventListener('click', depthHandler);

const heightBtn = document.querySelector('.height-btn');
heightBtn.addEventListener('click', heightHandler);

const preOrderBtn = document.querySelector('.preOrder-btn');
preOrderBtn.addEventListener('click', preOrderHandler);

const inOrderBtn = document.querySelector('.inOrder-btn');
inOrderBtn.addEventListener('click', inOrderHandler);

const postOrderBtn = document.querySelector('.postOrder-btn');
postOrderBtn.addEventListener('click', postOrderHandler);

const addNodeBtn = document.querySelector('.add-node-btn');
addNodeBtn.addEventListener('click', addNodeHandler);

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
  const modal = document.getElementById('modal');
  const nodeModal = document.getElementById('node-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
  if (event.target == nodeModal) {
    nodeModal.style.display = 'none';
  }
});
