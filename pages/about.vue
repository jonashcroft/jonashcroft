<template>
  <div class="layout">
    <main class="main-content container" v-html="pageContent" />
  </div>
</template>

<script>
/**
 * Page: About
 * -----------------------------------------------------------------------------
 */
import { marked } from 'marked'

import { createClient } from '~/plugins/contentful'
import { sanitize } from '~/plugins/sanitize-html'

const contentful = createClient()

export default {
  name: 'AboutPage',

  /**
   * Async Data.
   * - Fetch data from Contentful.
   * @returns {Object}
   */
  async asyncData({ params, error }) {
    try {
      const response = await contentful.getEntries({
        'fields.slug': 'about',
        content_type: 'page',
        include: 1,
      })

      const data = response.items[0]

      const page = {
        content: data.fields.content,
        createdAt: data.sys.createdAt,
        slug: data.fields.slug,
        tags: data.metadata.tags,
        title: data.fields.pageTitle,
        updatedAt: data.sys.updatedAt,
      }

      return {
        page,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  head() {
    return {
      title: 'about',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: '',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'about  / jon ashcroft',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'e-commerce web developer',
        },
      ],
    }
  },

  computed: {
    /**
     * Compute the page content HTML for render.
     * - Converts markdown
     * - Returns clean HTML
     * @return {String}
     */
    pageContent() {
      const dirty = marked(this.page.content)
      return sanitize(dirty)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/default/main-content.scss';
</style>
