/* ─── Page Navigation Logic ─── */

let currentPage = 1;
const totalPages = 5;

function showPage(n) {
  // Hide all pages
  for (let i = 1; i <= totalPages; i++) {
    const el = document.getElementById('page' + i);
    if (el) {
      el.classList.add('hidden');
    }
  }
  // Show target page
  const target = document.getElementById('page' + n);
  if (target) {
    target.classList.remove('hidden');
  }
  // Update dots
  document.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === n - 1);
  });
  currentPage = n;

  // Re-trigger bar animations
  document.querySelectorAll('.lang-fill, .skill-fill').forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = '';
  });
}

function nextPage() {
  if (currentPage < totalPages) {
    showPage(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 1) {
    showPage(currentPage - 1);
  }
}

function goToPage(n) {
  if (n >= 1 && n <= totalPages) {
    showPage(n);
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextPage();
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevPage();
});

// Touch/swipe support
let touchStartX = 0;
document.querySelector('.book').addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.querySelector('.book').addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextPage(); else prevPage();
  }
}, { passive: true });

// Contact form handler
function sendMessage(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    document.getElementById('form-success').classList.remove('hidden');
    e.target.reset();
    setTimeout(() => {
      document.getElementById('form-success').classList.add('hidden');
    }, 4000);
  }, 1500);
}

// Download CV
function downloadCV() {
  const cvFileName = 'cv_chaimabenhawala.pdf';
  const link = document.createElement('a');
  link.href = cvFileName;
  link.download = cvFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Initialize
showPage(1);
