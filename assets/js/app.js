/* Our functions */
import getArtWorkColours from './vibrant.js';
import showConsoleMessage from './showConsoleMessage.js';
import { meOpenContent, meCloseModal } from './me.js';

class jon {

    // Setup events we're looking for
	constructor() {
		document.addEventListener('DOMContentLoaded', () => this.domReady());
    }

	domReady() {

        // General functions
        showConsoleMessage();
        getArtWorkColours();
        meOpenContent();

	}

}

export default jon;

new jon;