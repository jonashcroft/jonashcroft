import * as Vibrant from 'node-vibrant';

const getArtWorkColours = () => {

    const img = document.getElementById('albumart').src

    // There *does* exist a fallback image in the serverside function, but just in case:
    if ( img != '' ) {

        Vibrant.from(img).getSwatches((err, swatches) => {

            // Loop through all the found colors
            for ( let key in swatches ) {
                if ( swatches.hasOwnProperty(key) ) {

                    // Grab the 'main' colour only, because it's pretty
                    if ( key == 'Vibrant' ) {

                        // Alllll the variables...
                        const homeBody     = document.getElementById('home'),
                              homeMain     = document.getElementById('home-wrap'),
                              footerDiv    = document.getElementById('footer'),
                              newBgColor   = (swatches[key]).getHex(),
                              newTextColor = (swatches[key]).getTitleTextColor();

                        if ( homeBody != null ) {

                            homeMain.style.backgroundColor = newBgColor,
                            homeMain.style.color           = newTextColor;

                            // Loop through all of the links in
                            const homeLinks = homeMain.querySelectorAll('a'),
                                   callback = (el) => {
                                        el.style.color = newTextColor;
                                    };

                            for ( var homeLink of homeLinks ) callback(homeLink);

                        }

                        footerDiv.style.backgroundColor = newBgColor;
                        footerDiv.style.color           = newTextColor;

                        const footerLinks = footerDiv.querySelectorAll('a'),
                            callback = (el) => {
                                 el.style.color = newTextColor;
                            };

                        for ( var footerLink of footerLinks ) callback(footerLink);

                    }

                }
            }
        });

    }

}
export default getArtWorkColours;