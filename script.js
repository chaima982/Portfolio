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

// Contact form handler – sends via Formspree to chaimawala@gmail.com
// IMPORTANT: Replace "YOUR_FORM_ID" below with your Formspree form ID
//            after creating your form at https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykdawyo';

async function sendMessage(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submit-btn');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');

  // Reset previous messages
  successEl.classList.add('hidden');
  errorEl.classList.add('hidden');

  // Show loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  try {
    const data = {
      name: document.getElementById('fname').value,
      email: document.getElementById('femail').value,
      _subject: document.getElementById('fsubject').value || 'New message from your Portfolio!',
      message: document.getElementById('fmessage').value,
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Success
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      successEl.classList.remove('hidden');
      form.reset();
      setTimeout(() => successEl.classList.add('hidden'), 5000);
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    errorEl.classList.remove('hidden');
    setTimeout(() => errorEl.classList.add('hidden'), 5000);
  }
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
