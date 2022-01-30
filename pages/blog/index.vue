<template>
  <div class="layout">
    <main class="main-content container">
      <ul class="post-list">
        <li v-for="(post, index) in posts" :key="index" class="post-list__item">
          <nuxt-link
            class="post-list__item-link"
            :to="`/blog/${post.slug}/`"
            v-text="post.title"
          />
          <time
            class="post-list__item-date"
            :datetime="post.date"
            v-text="post.dateClean"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
/**
 * Page: Blog
 * -----------------------------------------------------------------------------
 */
import { createClient } from '~/plugins/contentful'

const contentful = createClient()

export default {
  name: 'BlogPage',

  /**
   * Async Data.
   * - Fetch data from Contentful.
   * @returns {Object}
   */
  async asyncData({ params, error }) {
    try {
      const response = await contentful.getEntries({
        content_type: 'blogPost',
        include: 3,
        limit: 40,
        order: '-fields.publishDate',
      })

      const posts = response.items.map((item) => {
        return {
          date: item.fields.publishDate,
          dateClean: item.fields.publishDate.split('T')[0],
          slug: item.fields.slug,
          title: item.fields.postTitle,
        }
      })

      return {
        posts,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  head() {
    return {
      title: 'blog posts',
    }
  },
}
</script>

<style lang="scss">
@import './post-list.scss';
@import '~/assets/default/main-content.scss';
</style>
