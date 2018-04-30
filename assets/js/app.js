/* Our functions */
import getArtWorkColours from './vibrant.js';
import showConsoleMessage from './showConsoleMessage.js';

class jon {

    // Setup events we're looking for
	constructor() {
		document.addEventListener('DOMContentLoaded', () => this.domReady());
    }

	domReady() {

        // General functions
        showConsoleMessage();
        getArtWorkColours();

	}

}

export default jon;

new jon;