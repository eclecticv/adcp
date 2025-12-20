// Shared admin navigation component
// Include this in any admin page with: <script src="/admin-nav.js"></script>

(function() {
  'use strict';

  // Navigation configuration
  const NAV_CONFIG = {
    logo: 'AdCP Admin',
    links: [
      { href: '/admin/members', label: 'Members' },
      { href: '/admin/agreements', label: 'Agreements' },
      { href: '/admin/perspectives', label: 'Perspectives' },
      { href: '/admin/analytics', label: 'Analytics' }
    ],
    backLink: { href: '/dashboard', label: '← Back to Dashboard' }
  };

  // Shared header styles
  const HEADER_STYLES = `
    .admin-header {
      background: var(--gradient-primary);
      color: var(--color-text-on-dark);
      padding: var(--space-5) var(--space-8);
      box-shadow: var(--shadow-sm);
    }
    .admin-header-content {
      max-width: var(--container-wide);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-6);
    }
    .admin-header h1 {
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      margin: 0;
      color: inherit;
    }
    .admin-header nav {
      display: flex;
      gap: var(--space-3);
      align-items: center;
      flex-wrap: wrap;
    }
    .admin-header nav a {
      color: inherit;
      text-decoration: none;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      transition: var(--transition-colors);
      font-size: var(--text-sm);
    }
    .admin-header nav a:hover {
      background-color: var(--color-bg-on-dark-hover);
    }
    .admin-header nav a.active {
      background-color: var(--color-bg-on-dark-active);
      font-weight: var(--font-semibold);
    }
  `;

  // Inject styles
  function injectStyles() {
    if (document.getElementById('admin-nav-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'admin-nav-styles';
    styleEl.textContent = HEADER_STYLES;
    document.head.appendChild(styleEl);
  }

  // Create navigation HTML
  function createNavHTML() {
    const currentPath = window.location.pathname;

    const navLinks = NAV_CONFIG.links
      .map(link => {
        const isActive = currentPath === link.href ||
                        currentPath.startsWith(link.href + '/');
        const activeClass = isActive ? 'active' : '';
        return `<a href="${link.href}" class="${activeClass}">${link.label}</a>`;
      })
      .join('');

    return `
      <header class="admin-header">
        <div class="admin-header-content">
          <h1>${NAV_CONFIG.logo}</h1>
          <nav>
            ${navLinks}
          </nav>
        </div>
      </header>
    `;
  }

  // Replace existing header or inject new one
  function injectNavigation() {
    // Find existing header element
    const existingHeader = document.querySelector('header, .header');

    const navHTML = createNavHTML();

    if (existingHeader) {
      // Replace existing header
      existingHeader.outerHTML = navHTML;
    } else {
      // Inject at start of body
      document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
  }

  // Initialize when DOM is ready
  function init() {
    injectStyles();
    injectNavigation();
  }

  // Auto-initialize only on admin pages
  function shouldInitialize() {
    return window.location.pathname.startsWith('/admin');
  }

  if (shouldInitialize()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  // Utility function to redirect to login with return_to parameter
  function redirectToLogin() {
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/auth/login?return_to=${returnUrl}`;
  }

  // Export configuration and utilities
  window.AdminNav = {
    config: NAV_CONFIG,
    reinit: init,
    redirectToLogin: redirectToLogin
  };
})();
