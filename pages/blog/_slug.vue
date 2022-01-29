<template>
  <article>
    <NavBar />

    <header>
      <h1 v-text="post.title"></h1>
    </header>

    <nuxt-content :document="post" />
  </article>
</template>

<script>
/**
 * Pages / Blog: post.
 * -----------------------------------------------------------------------------
 * - Component for a singular blog post.
 */
import NavBar from '@/components/NavBar/NavBar'

export default {
  components: {
    NavBar,
  },
  /**
   * Async Data.
   * - Returns post content
   * @returns {Object}
   */
  async asyncData({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()

    return {
      post,
    }
  },
}
</script>
