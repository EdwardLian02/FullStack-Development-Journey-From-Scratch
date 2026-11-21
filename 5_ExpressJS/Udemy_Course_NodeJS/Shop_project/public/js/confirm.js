// Themed confirmation dialog.
// Any <form data-confirm="Message" data-confirm-label="Delete"> opens the
// <dialog id="confirm-dialog"> from includes/end.ejs instead of submitting straight away.
(function () {
    var dialog = document.getElementById('confirm-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    var message = dialog.querySelector('[data-confirm-message]');
    var accept = dialog.querySelector('[data-confirm-accept]');
    var cancel = dialog.querySelector('[data-confirm-cancel]');
    var pendingForm = null;

    function close() {
        dialog.close();
        pendingForm = null;
    }

    document.addEventListener('submit', function (e) {
        var form = e.target;
        var text = form.getAttribute('data-confirm');
        if (!text) return;

        e.preventDefault();
        pendingForm = form;
        message.textContent = text;
        accept.textContent = form.getAttribute('data-confirm-label') || 'Confirm';
        dialog.showModal();
        cancel.focus(); // safest default: Enter/Space cancels
    });

    accept.addEventListener('click', function () {
        var form = pendingForm;
        close();
        if (form) form.submit(); // form.submit() skips the submit event, so no second prompt
    });

    cancel.addEventListener('click', close);

    // Click on the dimmed backdrop (outside the card) cancels. Esc is handled by <dialog>.
    dialog.addEventListener('click', function (e) {
        if (e.target === dialog) close();
    });
})();
