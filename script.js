// Lucide icons
    lucide.createIcons();

    // Element SDK Configuration
    const defaultConfig = {
      company_name: 'VitalSystem.cg',
      main_title: 'Soluciones Digitales Inteligentes',
      main_subtitle: 'Software, Páginas Web y Aplicaciones Personalizadas',
      tagline: '💡 Tecnología que transforma negocios',
      whatsapp: '+56976827112'
    };

    const config = { ...defaultConfig };

    const element = {
      defaultConfig,
      onConfigChange: async (newConfig) => {
        config.company_name = newConfig.company_name || defaultConfig.company_name;
        config.main_title = newConfig.main_title || defaultConfig.main_title;
        config.main_subtitle = newConfig.main_subtitle || defaultConfig.main_subtitle;
        config.tagline = newConfig.tagline || defaultConfig.tagline;
        config.whatsapp = newConfig.whatsapp || defaultConfig.whatsapp;

        // Update UI
        const titleEl = document.getElementById('main-title');
        const subtitleEl = document.getElementById('main-subtitle');
        const taglineEl = document.getElementById('tagline-text');
        const footerWhatsapp = document.getElementById('footer-whatsapp');

        if (titleEl) titleEl.textContent = config.main_title;
        if (subtitleEl) subtitleEl.textContent = config.main_subtitle;
        if (taglineEl) taglineEl.textContent = config.tagline;
        if (footerWhatsapp) footerWhatsapp.textContent = config.whatsapp;

        // Update WhatsApp links
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
          const baseUrl = 'https://wa.me/' + config.whatsapp.replace(/\D/g, '').replace(/^/,'');
          link.href = baseUrl + (link.href.includes('?') ? link.href.substring(link.href.indexOf('?')) : '');
        });
      },
      mapToCapabilities: (cfg) => ({
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      }),
      mapToEditPanelValues: (cfg) => new Map([
        ['company_name', config.company_name],
        ['header_title', config.main_title],
        ['header_subtitle', config.main_subtitle],
        ['tagline', config.tagline],
        ['whatsapp', config.whatsapp]
      ])
    };

    window.elementSdk.init(element);

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'a07a43230986988b',t:'MTc4MDc3ODc0Mg=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();