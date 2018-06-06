const meOpenContent = () => {

    let btns    = document.getElementsByClassName( 'btn' );

    for ( let btn of btns ) {
        btn.onclick = function() {

            let targetWindow   = btn.attributes.getNamedItem('data-title').value,
                windowToToggle = document.querySelector("[data-window='" + targetWindow + "']");

            meCloseModal(windowToToggle);

            windowToToggle.classList.add('active');

        }
    }

}

const meCloseModal = (windowToToggle) => {

    let closeBtn = document.getElementsByClassName('close-modal');

    for ( let close of closeBtn ) {
        close.onclick = function() {

            windowToToggle.classList.remove('active');

        }
    }

}

export { meOpenContent, meCloseModal };