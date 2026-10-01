 const tabs = document.querySelectorAll('[data-mode]');
    const views = document.querySelectorAll('[data-view]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.mode;

        // Highlight the clicked tab.
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('tab--active', active);
          t.setAttribute('aria-selected', String(active));
        });

        // Show the matching view, hide the other.
        views.forEach((view) => {
          view.hidden = view.dataset.view !== mode;
        });

      });
    });