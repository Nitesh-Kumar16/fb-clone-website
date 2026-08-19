const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.like-button').forEach((button) => {
  button.addEventListener('click', () => {
    const liked = button.classList.toggle('liked');
    button.innerHTML = `<span>${liked ? '♥' : '♡'}</span> ${liked ? 'Liked' : 'Like'}`;
    showToast(liked ? 'Post added to your likes' : 'Like removed');
  });
});

document.querySelectorAll('.post-actions button:not(.like-button), .composer-actions button').forEach((button) => {
  button.addEventListener('click', () => showToast(button.textContent.trim() + ' selected'));
});

document.querySelectorAll('.comment-button').forEach((button) => {
  button.addEventListener('click', () => button.closest('.post').querySelector('.comment-box input')?.focus());
});

document.querySelectorAll('.send-comment').forEach((button) => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    if (!input.value.trim()) return;
    const post = button.closest('.post');
    const count = post.querySelector('.comment-count');
    const current = Number.parseInt(count.textContent, 10) || 0;
    count.textContent = `${current + 1} comments`;
    input.value = '';
    showToast('Comment added');
  });
});

document.getElementById('composerPrompt').addEventListener('click', () => showToast('Composer opened'));
document.getElementById('filterButton').addEventListener('click', (event) => {
  event.currentTarget.firstChild.textContent = event.currentTarget.firstChild.textContent.trim() === 'Latest' ? 'Top' : 'Latest';
  showToast(`Showing ${event.currentTarget.firstChild.textContent.trim().toLowerCase()} posts`);
});

document.getElementById('searchInput').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  document.querySelectorAll('.post').forEach((post) => {
    post.hidden = query && !post.dataset.search.includes(query);
  });
});

document.querySelectorAll('[data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    showToast(`${button.title} view selected`);
  });
});
