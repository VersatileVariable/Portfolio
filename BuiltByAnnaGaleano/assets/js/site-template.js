/**
 * Anna Galeano Portfolio - Shared Site Template
 *
 * Defines <site-navbar> and <site-footer> custom elements so that every page
 * on the site "extends" a single, canonical navigation/footer template
 * instead of duplicating the markup on each page. To change the nav or
 * footer for the whole site, edit this file only.
 *
 * Usage (place near the top of <body>, before any page content):
 *   <site-navbar active="research"></site-navbar>
 *   ...page content...
 *   <site-footer></site-footer>
 *
 * The "active" attribute must match one of the `key` values in NAV_LINKS
 * below so the current page can be highlighted in the menu.
 */
(function () {
	'use strict';

	// Single source of truth for site navigation. Add/remove pages here only.
	var NAV_LINKS = [
		{ key: 'home', href: 'index.html', label: 'Home' },
		{ key: 'about', href: 'about.html', label: 'About' },
		{ key: 'research', href: 'research.html', label: 'Research' },
		{ key: 'projects', href: 'projects.html', label: 'Projects' },
		{ key: 'certifications', href: 'certifications.html', label: 'Certifications' },
		{ key: 'resume', href: 'resume.html', label: 'Resume' },
		{ key: 'gallery', href: 'gallery.html', label: 'Gallery' }
	];

	function buildMenuHTML(activeKey) {
		return NAV_LINKS.map(function (link) {
			var activeClass = link.key === activeKey ? ' class="active"' : '';
			return '<li><a href="' + link.href + '"' + activeClass + '>' + link.label + '</a></li>';
		}).join('');
	}

	class SiteNavbar extends HTMLElement {
		connectedCallback() {
			var activeKey = this.getAttribute('active') || '';

			this.innerHTML =
				'<div class="nav-container">' +
					'<div class="nav-logo">' +
						'<div class="ascii-logo" id="nav-logo-mark">      (\n        )\n     c[_]</div>' +
						'<a href="index.html">Anna Galeano</a>' +
					'</div>' +
					'<ul class="nav-menu">' + buildMenuHTML(activeKey) + '</ul>' +
					'<div class="nav-toggle">' +
						'<span></span><span></span><span></span>' +
					'</div>' +
				'</div>';
		}
	}

	class SiteFooter extends HTMLElement {
		connectedCallback() {
			this.innerHTML =
				'<div class="container">' +
					'<div class="footer-content">' +
						'<div class="footer-left">' +
							'<p>&copy; 2026 Anna Galeano. All rights reserved.</p>' +
						'</div>' +
						'<div class="footer-right">' +
							'<div class="social-links">' +
								'<a href="https://linkedin.com/in/connectedanna" target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile"><i class="fab fa-linkedin"></i></a>' +
								'<a href="https://github.com/VersatileVariable" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile"><i class="fab fa-github"></i></a>' +
								'<a href="mailto:agalean@clemson.edu" aria-label="Send email to Anna Galeano"><i class="fas fa-envelope"></i></a>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
		}
	}

	if (!customElements.get('site-navbar')) {
		customElements.define('site-navbar', SiteNavbar);
	}
	if (!customElements.get('site-footer')) {
		customElements.define('site-footer', SiteFooter);
	}
})();
