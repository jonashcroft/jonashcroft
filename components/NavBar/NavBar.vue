<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="(link, index) in links" :key="index" class="nav__list-item">
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
 * i
 *
 * -----------------------------------------------------------------------------
 */

export default {
  name: 'NavBar',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {
    /**
     * Compute an array of menu link items.
     * @returns {Array}
     */
    links() {
      return [
        {
          text: 'Jon Ashcroft',
          url: '/',
        },
        {
          text: 'About',
          url: '/about',
        },
        {
          text: 'Blog',
          url: '/blog',
        },
        {
          text: 'Contact',
          url: '/contact',
        },
      ]
    },
  },

  mounted() {},

  methods: {
    name() {},
  },
}
</script>

<style lang="scss" scoped>
@import './nav-bar.scss';
</style>
