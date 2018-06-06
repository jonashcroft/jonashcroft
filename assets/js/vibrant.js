import * as Vibrant from 'node-vibrant';

const getArtWorkColours = () => {

    if ( ! document.querySelector('#page-me') ) {

        const img        = document.getElementById('albumart').src,
            homeBody     = document.getElementById('home'),
            homeMain     = document.getElementById('home-wrap'),
            footerDiv    = document.getElementById('footer');

        //There *does* exist a fallback image in the serverside function, but just in case:
        if ( img != '' ) {

            Vibrant.from(img).getSwatches((err, swatches) => {

                /*-------------
                Loop through all found colours from Vibrant, sometimes Vibrant
                will return 'null' for a swatch, so push the populated ones to
                an array and we'll use a random one.
                --------------*/
                let ourColours = [];

                for ( let key in swatches ) {

                    if ( swatches.hasOwnProperty(key) && (swatches[key]) != null ) {

                        ourColours.push( {
                            color: (swatches[key]).getHex(),
                            text: (swatches[key]).getTitleTextColor()
                        } );

                    }

                }

                let randomColor = ourColours[Math.floor(Math.random() * ourColours.length)];

                if ( homeBody != null ) {

                    homeMain.style.backgroundColor = randomColor.color,
                    homeMain.style.color           = randomColor.text;

                    // Loop through all of the links in
                    const homeLinks = homeMain.querySelectorAll('a'),
                        callback = (el) => {
                                el.style.color = randomColor.text;
                            };

                    for ( var homeLink of homeLinks ) callback(homeLink);

                }

                footerDiv.style.backgroundColor = randomColor.color;
                footerDiv.style.color           = randomColor.text;

                const footerLinks = footerDiv.querySelectorAll('a'),
                    callback = (el) => {
                        el.style.color = randomColor.text;
                    };

                for ( var footerLink of footerLinks ) callback(footerLink);

            });

        }

    }

}
export default getArtWorkColours;