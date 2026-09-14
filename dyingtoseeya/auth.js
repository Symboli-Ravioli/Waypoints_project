document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('authModal');
  const backdropAndClose = modal.querySelectorAll('[data-close]');
  const forms = modal.querySelectorAll('.auth-form');
  const tabs = modal.querySelectorAll('.auth-tab');

  function setActiveTab(name){
    tabs.forEach(tab => {
      const isActive = tab.dataset.target === name;
      tab.classList.toggle('auth-tab--active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
  }

  function openModal(defaultPanel = 'login'){
    modal.setAttribute('aria-hidden','false');
    showPanel(defaultPanel);
    setActiveTab(defaultPanel);
    const activeForm = modal.querySelector(`#${defaultPanel}`);
    const firstInput = activeForm ? activeForm.querySelector('input') : null;
    if(firstInput) firstInput.focus();
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
  }

  backdropAndClose.forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

  function showPanel(name){
    forms.forEach(f => {
      const isPanel = f.id === name;
      f.hidden = !isPanel;
      f.setAttribute('aria-hidden', isPanel ? 'false' : 'true');
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      setActiveTab(target);
      showPanel(target);
    });
  });

  document.querySelectorAll('.btn-create').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveTab('login');
      showPanel('login');
      modal.setAttribute('aria-hidden','false');
      const firstInput = document.getElementById('loginEmail');
      if(firstInput) firstInput.focus();
    });
  });

  document.querySelectorAll('.btn-trial').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveTab('signup');
      showPanel('signup');
      modal.setAttribute('aria-hidden','false');
      const firstInput = document.getElementById('signupName');
      if(firstInput) firstInput.focus();
    });
  });

  let wheelLocked = false;
  function handleWheel(e){
    if(modal.getAttribute('aria-hidden') === 'true') return;
    if(wheelLocked) return;
    const delta = e.deltaY;
    if(Math.abs(delta) < 5) return;
    wheelLocked = true;
    if(delta > 0){
      openModal('signup');
    }else{
      openModal('login');
    }
    setTimeout(() => { wheelLocked = false; }, 350);
  }
  modal.addEventListener('wheel', handleWheel, { passive: true });

  const loginForm = document.getElementById('login');
  const signupForm = document.getElementById('signup');

  async function submitForm(form, endpoint){
    const data = new FormData(form);
    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
      });
      if(!res.ok) throw new Error('Network response was not ok');
      const json = await res.json().catch(() => null);
      alert(json && json.message ? json.message : 'Success — server response received');
      closeModal();
    }catch(err){
      console.error(err);
      alert('Submission failed. Configure your server endpoint to accept POST form data.');
    }
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(loginForm, '/auth/login.php');
  });
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(signupForm, '/auth/signup.php');
  });
});
