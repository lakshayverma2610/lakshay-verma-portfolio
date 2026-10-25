// ==========================================================================
// Portfolio Application Logic — Lakshay Verma
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initProfileData();
  renderSkills();
  renderProjects('all');
  renderTimeline();
  setupFilterTabs();
  setupProjectModal();
  setupResumeModal();
  setupMarksheetModal();
  setupContactForm();
  setupCopyButtons();
  setupMobileMenu();
  setupScrollSpy();
});

// 1. Initialize Profile Information
function initProfileData() {
  const profile = PORTFOLIO_DATA.profile;
  
  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Set email links and text
  const displayEmail = document.getElementById('display-email');
  if (displayEmail) displayEmail.textContent = profile.email;

  const resEmail = document.getElementById('res-email');
  if (resEmail) resEmail.textContent = profile.email;

  const resName = document.getElementById('res-name');
  if (resName) resName.textContent = profile.name.toUpperCase();

  // Set social links
  const ghLink = document.getElementById('social-github');
  if (ghLink) ghLink.href = profile.socials.github;

  const liLink = document.getElementById('social-linkedin');
  if (liLink) liLink.href = profile.socials.linkedin;
}

// 2. Render Skills Grid
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const iconSvgs = {
    cpu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    layout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    terminal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`
  };

  container.innerHTML = PORTFOLIO_DATA.skills.map(group => `
    <div class="skill-category-card">
      <div class="skill-cat-header">
        <div class="skill-cat-icon">
          ${iconSvgs[group.icon] || iconSvgs.terminal}
        </div>
        <h3 class="skill-cat-title">${group.category}</h3>
      </div>
      <p class="skill-cat-desc">${group.description}</p>

      <div class="skill-items-list">
        ${group.items.map(item => `
          <div class="skill-item-row ${item.highlight ? 'highlight' : ''}">
            <div class="skill-item-header">
              <span class="skill-name">${item.name}</span>
              <span class="skill-level-badge">${item.level}</span>
            </div>
            ${item.note ? `<div class="skill-note">${item.note}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// 3. Render Projects Grid with Filtering
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  const countBadge = document.getElementById('project-count-badge');
  if (!grid) return;

  let filtered = PORTFOLIO_DATA.projects;
  if (filter === 'hackathon') {
    filtered = PORTFOLIO_DATA.projects.filter(p => p.category === 'hackathon');
  } else if (filter === 'internship') {
    filtered = PORTFOLIO_DATA.projects.filter(p => p.category === 'internship' || p.category === 'lab');
  } else if (filter === 'personal') {
    filtered = PORTFOLIO_DATA.projects.filter(p => p.category === 'personal');
  } else if (filter === 'early') {
    filtered = PORTFOLIO_DATA.projects.filter(p => p.category === 'early' || p.category === 'dsa');
  } else if (filter === 'flagship') {
    filtered = PORTFOLIO_DATA.projects.filter(p => p.category === 'flagship');
  }

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${PORTFOLIO_DATA.projects.length} works`;
  }

  grid.innerHTML = filtered.map(project => `
    <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="View details for ${project.title}">
      <div class="project-card-header">
        <span class="project-category-badge ${project.category}">
          ${project.categoryLabel}
        </span>
        <div class="project-view-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>

      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.shortDesc}</p>

      <div class="project-tech-pills">
        ${project.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>

      <div class="project-footer">
        <div class="project-learn-more">
          <span>Inspect Architecture</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

        <div class="project-card-actions" onclick="event.stopPropagation()">
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-action-link" title="Source code">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>Code</span>
            </a>
          ` : ''}
          ${project.liveUrl ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-action-link" title="Live demo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Demo</span>
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Add click listeners to project cards for detail modal
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      openProjectModal(id);
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.getAttribute('data-project-id');
        openProjectModal(id);
      }
    });
  });
}

// Setup Filter Tabs
function setupFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

// 4. Render Timeline
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.timeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-meta">
          <span class="timeline-period">${item.period}</span>
          <span class="timeline-badge">${item.badge}</span>
        </div>
        <h3 class="timeline-title">${item.title}</h3>
        <div class="timeline-org">${item.organization} — ${item.subtitle}</div>
        <p class="timeline-desc">${item.description}</p>
        ${item.highlights && item.highlights.length ? `
          <ul class="timeline-bullets">
            ${item.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// 5. Project Detail Modal
function setupProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !closeBtn) return;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function openProjectModal(id) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  document.getElementById('modal-category').textContent = project.categoryLabel;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.fullDescription;
  document.getElementById('modal-learned').textContent = project.whatILearned;

  // Project Image / Prototype preview if available
  const mediaContainer = document.getElementById('modal-media-container');
  const mediaImg = document.getElementById('modal-image');
  const mediaCaption = document.getElementById('modal-image-caption');
  if (mediaContainer && mediaImg && mediaCaption) {
    if (project.image) {
      mediaImg.src = project.image;
      mediaImg.alt = project.title;
      mediaCaption.textContent = project.imageCaption || '';
      mediaContainer.style.display = 'block';
    } else {
      mediaContainer.style.display = 'none';
      mediaImg.src = '';
    }
  }

  // Tech pills
  const techContainer = document.getElementById('modal-tech-list');
  techContainer.innerHTML = project.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('');

  // Highlights
  const highlightsContainer = document.getElementById('modal-highlights');
  highlightsContainer.innerHTML = project.highlights.map(h => `<li>${h}</li>`).join('');

  // Action links
  const ghLink = document.getElementById('modal-github-link');
  if (project.githubUrl) {
    ghLink.href = project.githubUrl;
    ghLink.style.display = 'inline-flex';
  } else {
    ghLink.style.display = 'none';
  }

  const liveLink = document.getElementById('modal-live-link');
  if (project.liveUrl) {
    liveLink.href = project.liveUrl;
    liveLink.style.display = 'inline-flex';
  } else {
    liveLink.style.display = 'none';
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// 6. Resume Modal Setup
function setupResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('open-resume-btn');
  const closeBtn = document.getElementById('resume-close-btn');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal || !openBtn || !closeBtn) return;

  const openResume = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeResume = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openResume);
  closeBtn.addEventListener('click', closeResume);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeResume();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeResume();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// 7. Marksheet / Academic Document Modal Setup
function setupMarksheetModal() {
  const modal = document.getElementById('marksheet-modal');
  const closeBtn = document.getElementById('marksheet-close-btn');
  const headerBtn = document.getElementById('header-see-marksheet-btn');
  const heroBtn = document.getElementById('hero-view-marksheet-btn');
  const docButtons = document.querySelectorAll('.open-doc-btn');
  const tabButtons = document.querySelectorAll('.doc-tab-btn');

  if (!modal || !closeBtn) return;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  if (headerBtn) headerBtn.addEventListener('click', () => openDocModal('sem2'));
  if (heroBtn) heroBtn.addEventListener('click', () => openDocModal('sem2'));

  docButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const docId = btn.getAttribute('data-doc-id');
      openDocModal(docId || 'sem2');
    });
  });

  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-doc-target');
      switchDoc(target);
    });
  });
}

function openDocModal(docId = 'sem2') {
  const modal = document.getElementById('marksheet-modal');
  if (!modal) return;
  switchDoc(docId);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function switchDoc(docId) {
  const docData = PORTFOLIO_DATA.profile.marksheets.find(d => d.id === docId) || PORTFOLIO_DATA.profile.marksheets[0];
  if (!docData) return;

  // Update tabs
  document.querySelectorAll('.doc-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-doc-target') === docId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update elements
  const titleEl = document.getElementById('doc-title');
  const subEl = document.getElementById('doc-subtitle');
  const imgEl = document.getElementById('doc-viewer-img');
  const frameEl = document.getElementById('doc-viewer-frame');
  const textEl = document.getElementById('doc-highlights-text');
  const rawLink = document.getElementById('doc-open-raw-link');
  const linkText = document.getElementById('doc-open-link-text');

  if (titleEl) titleEl.textContent = docData.title;
  if (subEl) subEl.textContent = docData.subtitle;
  if (textEl) textEl.textContent = docData.highlights;
  if (rawLink) rawLink.href = docData.path;

  // Toggle between Image and PDF iframe
  if (docData.type === 'pdf') {
    if (imgEl) imgEl.style.display = 'none';
    if (frameEl) {
      frameEl.style.display = 'block';
      frameEl.src = docData.path;
    }
    if (linkText) linkText.textContent = 'Open Full Resolution PDF / Download';
  } else {
    if (frameEl) {
      frameEl.style.display = 'none';
      frameEl.src = '';
    }
    if (imgEl) {
      imgEl.style.display = 'block';
      imgEl.src = docData.path;
      imgEl.alt = docData.title;
    }
    if (linkText) linkText.textContent = 'Open Full Resolution Image';
  }
}

// 8. Contact Form Handling
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const statusAlert = document.getElementById('form-status-alert');
  if (!form || !statusAlert) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all fields before sending.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    // Simulate sending delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      statusAlert.classList.add('success');
      form.reset();
      showToast('Message sent to Lakshay! Thank you.');

      setTimeout(() => {
        statusAlert.classList.remove('success');
      }, 6000);
    }, 700);
  });
}

// 9. Copy to Clipboard Utility
function setupCopyButtons() {
  const heroCopyBtn = document.getElementById('quick-copy-hero-email');
  const cardCopyBtn = document.getElementById('copy-email-card-btn') || document.getElementById('copy-email-btn');
  const email = PORTFOLIO_DATA.profile.email;

  const copyEmail = (btn, textEl) => {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
      if (textEl) {
        const prev = textEl.textContent;
        textEl.textContent = 'Copied!';
        setTimeout(() => { textEl.textContent = prev; }, 2000);
      }
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(`Copied ${email} to clipboard!`);
    });
  };

  if (heroCopyBtn) {
    heroCopyBtn.addEventListener('click', () => copyEmail(heroCopyBtn));
  }

  if (cardCopyBtn) {
    const textEl = document.getElementById('copy-card-text');
    cardCopyBtn.addEventListener('click', () => copyEmail(cardCopyBtn, textEl));
  }
}

// Toast notification helper
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('visible');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

// 10. Mobile Menu Navigation
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const menu = document.getElementById('nav-links-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('mobile-open');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('mobile-open');
    });
  });
}

// 11. Scrollspy for Active Nav Link
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
