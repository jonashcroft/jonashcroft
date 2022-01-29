<template>
  <nav ref="Nav" class="nav">
    <ul class="nav__list nav__list--top-left">
      <li
        v-for="(link, index) in linksLeft"
        :key="index"
        class="nav__list-item"
      >
        <nuxt-link
          :to="link.url"
          class="nav__list-item-link"
          title="Go to homepage"
          v-text="link.text"
        />
      </li>
    </ul>

    <ul class="nav__list nav__list--top-right">
      <li
        v-for="(link, index) in linksRight"
        :key="index"
        class="nav__list-item"
      >
        <nuxt-link
          :to="link.url"
          class="nav__list-item-link"
          title="Go to homepage"
          v-text="link.text"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
/**
 * Component: Nav Bar.
 * -----------------------------------------------------------------------------
 */

export default {
  name: 'NavBar',

  computed: {
    /**
     * Compute an array of left-side menu link items.
     * @returns {Array}
     */
    linksLeft() {
      return [
        {
          text: 'Jon Ashcroft',
          url: '/',
        },
      ]
    },

    /**
     * Compute an array of right-side menu link items.
     * @returns {Array}
     */
    linksRight() {
      return [
        {
          text: 'Contact',
          url: '/contact',
        },
        {
          text: 'About',
          url: '/about',
        },
        {
          text: 'Blog',
          url: '/blog',
        },
      ]
    },
  },

  mounted() {
    this.setCustomProperties()
  },

  methods: {
    /**
     * Set custom properties for use in CSS.
     */
    setCustomProperties() {
      document.documentElement.style.setProperty(
        '--height-nav-bar',
        `${this.$refs.Nav.offsetHeight}px`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import './nav-bar.scss';
</style>
