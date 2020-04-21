<template>
  <nav class="tv-screen__navigation">
    <ul class="tv-screen__navigation__list">
      <li class="nav-item">
        <nuxt-link to="/about" class="vcr__glitch-text">About me</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/blog" class="vcr__glitch-text">Blog</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/contact" class="vcr__glitch-text">Contact</nuxt-link>
      </li>
      <li class="nav-item">
        <a
          href="https://github.com/jonashcroft"
          class="vcr__glitch-text"
          target="_blank"
          >&gt; GitHub</a
        >
      </li>
      <li class="nav-item">
        <a
          href="https://www.linkedin.com/in/jonashcroft1/"
          class="vcr__glitch-text"
          target="_blank"
        >
          &gt; LinkedIn</a
        >
      </li>
      <li class="nav-item">
        <a
          href="https://www.instagram.com/msfinster/"
          class="vcr__glitch-text"
          target="_blank"
        >
          &gt; Instagram</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style src="~/assets/styles/components/vcr-nav.scss" lang="scss"></style>
