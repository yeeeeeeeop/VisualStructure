export function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  modalMessage.textContent = message;
  modal.style.display = 'block';
}

export function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', closeModal);
