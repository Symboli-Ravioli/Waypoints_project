/**
 * =========================================================
 *  AUTHENTICATION MODAL - Main Manager
 *  Handles login/signup modal interactions, tab switching,
 *  form submission, and keyboard/wheel interactions
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========== ELEMENT REFERENCES ==========
  // Store references to key DOM elements
  const modal = document.getElementById('authModal');
  const backdropAndClose = modal.querySelectorAll('[data-close]');
  const forms = modal.querySelectorAll('.auth-form');
  const tabs = modal.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login');
  const signupForm = document.getElementById('signup');

  // ========== MODAL STATE MANAGEMENT ==========
  // Functions to open, close, and manage modal visibility

  /**
   * Opens the authentication modal and switches to specified panel
   * @param {string} defaultPanel - 'login' or 'signup' (default: 'login')
   */
  function openModal(defaultPanel = 'login') {
    modal.setAttribute('aria-hidden', 'false');
    showPanel(defaultPanel);
    setActiveTab(defaultPanel);
    focusFirstInput(defaultPanel);
  }

  /**
   * Closes the authentication modal
   */
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  // ========== TAB MANAGEMENT ==========
  // Functions to handle login/signup tab switching

  /**
   * Updates the active tab styling and accessibility attributes
   * @param {string} name - Tab name ('login' or 'signup')
   */
  function setActiveTab(name) {
    tabs.forEach(tab => {
      const isActive = tab.dataset.target === name;
      tab.classList.toggle('auth-tab--active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
  }

  /**
   * Shows/hides form panels based on selected tab
   * @param {string} name - Panel name ('login' or 'signup')
   */
  function showPanel(name) {
    forms.forEach(form => {
      const isPanel = form.id === name;
      form.hidden = !isPanel;
      form.setAttribute('aria-hidden', isPanel ? 'false' : 'true');
    });
  }

  /**
   * Focuses the first input field in the specified form
   * @param {string} panelName - Panel name ('login' or 'signup')
   */
  function focusFirstInput(panelName) {
    const activeForm = modal.querySelector(`#${panelName}`);
    const firstInput = activeForm ? activeForm.querySelector('input') : null;
    if (firstInput) firstInput.focus();
  }

  // ========== EVENT LISTENERS - Modal Triggers ==========
  // Attach click handlers to close buttons and backdrop

  backdropAndClose.forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ========== EVENT LISTENERS - Tab Switching ==========
  // Handle clicks on login/signup tabs

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      setActiveTab(target);
      showPanel(target);
    });
  });

  // ========== EVENT LISTENERS - CTA Buttons ==========
  // Handle "Create" button (opens login) and "Start Free Trial" button (opens signup)

  /**
   * Opens the modal with a specific panel and focuses the first input
   * Reusable helper for CTA button handlers
   * @param {string} panelName - 'login' or 'signup'
   */
  function handleCtaButtonClick(panelName) {
    setActiveTab(panelName);
    showPanel(panelName);
    modal.setAttribute('aria-hidden', 'false');
    focusFirstInput(panelName);
  }

  document.querySelectorAll('.btn-create').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleCtaButtonClick('login');
    });
  });

  document.querySelectorAll('.btn-trial').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleCtaButtonClick('signup');
    });
  });

  // ========== WHEEL/SCROLL INTERACTION ==========
  // Allow scrolling within modal to switch between login/signup

  let wheelLocked = false;

  function handleWheel(e) {
    // Only work if modal is visible
    if (modal.getAttribute('aria-hidden') === 'true') return;
    // Prevent rapid switching
    if (wheelLocked) return;
    
    const delta = e.deltaY;
    // Ignore small scroll amounts
    if (Math.abs(delta) < 5) return;
    
    wheelLocked = true;
    // Switch page based on scroll direction
    if (delta > 0) {
      openModal('signup');
    } else {
      openModal('login');
    }
    // Unlock after delay to prevent rapid switching
    setTimeout(() => { wheelLocked = false; }, 350);
  }

  modal.addEventListener('wheel', handleWheel, { passive: true });

  // ========== FORM SUBMISSION ==========
  // Handle login and signup form submissions

  /**
   * Submits form data to server endpoint
   * Handles errors and displays feedback to user
   * @param {HTMLFormElement} form - The form to submit
   * @param {string} endpoint - Server URL to POST data to
   */
  async function submitForm(form, endpoint) {
    const data = new FormData(form);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json && json.message ? json.message : 'Request failed.');
      }

      alert(json && json.message ? json.message : 'Success — server response received');

      if (json && json.redirect) {
        window.location.href = json.redirect;
        return;
      }

      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Submission failed. Configure your server endpoint to accept POST form data.');
    }
  }

  // Attach submit handlers to forms
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(loginForm, 'auth/login.php');
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(signupForm, 'auth/signup.php');
  });
});
