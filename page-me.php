<?php get_header('me'); ?>

<div id="init">AV-1</div>

<div id="wrap">

    <header id="me-lead">
        <h1 data-text="Main menu">Main Menu</h1>
    </header>

    <main id="me-main">
        <ul id="menu">
            <li data-title="about" data-text="About me" class="btn" data-menu-btn>About Me</li>
            <li data-title="expertise" data-text="What can I do?" class="btn" data-menu-btn>What can I do?</li>
            <li data-title="experience" data-text="Experience" class="btn" data-menu-btn>Experience</li>
            <li data-title="contact" data-text="Talk to me" class="btn" data-menu-btn>Talk to me</li>
        </ul>
    </main>

    <footer id="me-footer">
        <p data-text="Jon Ashcroft&colon; Developer"><a href="mailto:hello@jonashcroft.co.uk">Jon Ashcroft&colon;</a> Developer</p>
    </footer>

    <!--
        About me
    -->
    <section class="popup-wrap" data-window="about">
        <header class="pop-head">
            <h2 data-text="About me">About me</h2>
        </header>
        <main class="pop-main">
            <p>Hey! I'm a web developer living &amp; working in Birmingham City Centre. The world of technology has always been fascinating to me, so I feel very lucky to be able to contribute to it.</p>

            <p>I consider myself a creative &amp; curious person: Whether it’s finding new music, discovering great places to eat, taking photos, manipulating API data, learning something new – I'm always eager to try.</p>

            <p>I'm currently working full-time at Eastside Co.</p>
        </main>
        <footer class="pop-foot">
            <a href="#" data-text="Back" class="close-modal" data-close-modal>Back</a></li>
        </footer>
    </section>

    <!--
        Expertise
    -->
    <section class="popup-wrap" data-window="expertise">
        <header class="pop-head">
            <h2 data-text="What can I do?">What can I do?</h2>
        </header>
        <main class="pop-main">
            <p>My core skills revolve around bespoke WordPress development. I find API's genuinely exciting and component based development satisfying. Optimising code is relaxing and CSS3 animations are fun.</p>

            <p>I love experimenting and hate saying "that's not possible" without trying first.</p>

            <h3>General Skills:</h3>

            <ul class="grid">
                <li>HTML &plus; JS &plus; SCSS</li>
                <li>ES6+, Vanilla, jQuery</li>
                <li>Component/DRY based development</li>
                <li>Bespoke Shopify development</li>
                <li>Solid Communication skills</li>
                <li>Liquid Templating System</li>
                <li>WordPress-based PHP</li>
                <li>Project Planning &plus; Management</li>
                <li>Bespoke WordPress Templating</li>
                <li>Server config (inc. Vagrant)</li>
                <li>npm, webpack, gulp etc.</li>
                <li>Advanced Sass Functions</li>
                <li>Building for Speed &plus; SEO</li>
                <li>Code Optimisation</li>
            </ul>

            <h3>Some API Experience:</h3>

            <ul class="grid">
                <li>OAuth Flow</li>
                <li>REST &plus; SOAP</li>
                <li>Stripe</li>
                <li>Google Maps</li>
                <li>Google Places</li>
                <li>BigChange Apps</li>
                <li>TrustPilot</li>
                <li>MailChimp</li>
                <li>Amazon Web Services</li>
                <li>Amazon Seller Central</li>
                <li>Salesforce</li>
                <li>eTapestry</li>
                <li>Lumesse</li>
                <li>Spotify</li>
                <li>YouTube &plus; Vimeo</li>
                <li>Last.FM</li>
            </ul>

        </main>
        <footer class="pop-foot">
            <a href="#" data-text="Back" class="close-modal">Back</a></li>
        </footer>
    </section>

    <!--
        Experience
    -->
    <section class="popup-wrap" data-window="experience">
        <header class="pop-head">
            <h2 data-text="Experience">Experience</h2>
        </header>
        <main class="pop-main">

        <section class="role">
                <h3>Front End Web Developer / Eastside Co:<br>'18 - Now</h3>

                <p>I'm currently one of the leading bespoke Shopify development agencies, trusted with some of the companies more complex builds and highest stake clients.</p>
            </section>

            <section class="role">
                <h3>Web Developer / Sixth Story:<br>'16 - '18</h3>

                <p>I'm trusted to take our designers amazing work from Sketch and turn them into a high quality, functional reality in a timely manner for our clients. In my time here, I've also optimised our custom Starter Template and Developer Standards &plus; Processes to ensure dev work is modern and consistent.</p>
            </section>

            <section class="role">
                <h3>Web Designer / Imaginative Minds:<br>'14 - '16</h3>

                <p>Starting out as an apprentice before being hired full-time. I spent my time here planning, wireframing, and testing their in-house apps while liaising with the dev team on projects. I learnt so much here about real-world client management and processes, and eventually moved over to WordPress brochure site development, eventually rehauling their WooCommerce based webshop.</p>
            </section>
        </main>
        <footer class="pop-foot">
            <a href="#" data-text="Back" class="close-modal">Back</a></li>
        </footer>
    </section>

    <!--
        Talk to me
    -->
    <section class="popup-wrap" data-window="contact">
        <header class="pop-head">
            <h2 data-text="Talk to me">Talk to me</h2>
        </header>
        <main class="pop-main">
            <p>If you'd like to get in touch with me, drop an email to <a href="mailto:hello@jonashcroft.co.uk">hello@jonashcroft.co.uk</a>, or give me call on <a href="tel:‭+447719629867‬">‭+44 7719 629867‬</a>.</p>

            <p>You can even add me on <a href="https://www.linkedin.com/in/jonashcroft1/">LinkedIn</a>, if that's your thing.</p>

            <p>Samples of work are available upon request.</p>
        </main>
        <footer class="pop-foot">
            <a href="#" data-text="Back" class="close-modal">Back</a></li>
        </footer>
    </section>

</div>

<?php get_footer('me'); ?>