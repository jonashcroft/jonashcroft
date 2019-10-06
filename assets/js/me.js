const meOpenContent = () => {
    let btns = document.querySelectorAll('[data-menu-btn]')
    for ( let btn of btns ) {
        btn.addEventListener('click', e => {
            let targetWindow   = btn.attributes.getNamedItem('data-title').value,
                windowToToggle = document.querySelector(`[data-window="${targetWindow}"]`);

            meCloseModal(windowToToggle);

            windowToToggle.classList.add('active');
        })
    }
}

const meCloseModal = (windowToToggle) => {
    let closeBtn = document.querySelectorAll('[data-close-modal]');

    for ( let close of closeBtn ) {
        close.addEventListener('click', e => {                
            windowToToggle.classList.remove('active');
        })
    }
}

export { meOpenContent, meCloseModal };