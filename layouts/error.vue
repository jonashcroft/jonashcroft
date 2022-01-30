<template>
  <main class="main-content error-content">
    <h1 v-text="textErrorMessage" />
  </main>
</template>

<script>
/**
 * Layout: Default
 * -----------------------------------------------------------------------------
 */
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },

  head() {
    return {
      title: 'error',
    }
  },

  computed: {
    /**
     * Compute an error message.
     * @returns {String}
     */
    textErrorMessage() {
      let message = this.error.message

      if (this.error.statusCode !== 404) {
        message = `I've broken something`
      }

      return `Error / ${this.error.statusCode}: ${message}`
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/default/main-content.scss';
@import '~/assets/404/error.scss';
</style>
