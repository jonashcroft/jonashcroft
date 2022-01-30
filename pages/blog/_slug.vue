<template>
  <main class="main-content">
    <header class="main-content__header">
      <h1 class="main-content__title" v-text="post.title" />

      <time
        :title="post.publishedAt"
        :datetime="post.publishedAt"
        v-text="articleDate"
      ></time>

      <img
        class="main-content__featured-image"
        :src="post.image.url"
        :alt="post.image.alt"
        loading="lazy"
      />
    </header>

    <article
      class="main-content__article article container container--wide"
      v-html="articleContent"
    />
  </main>
</template>

<script>
/**
 * Pages / Blog: post
 * -----------------------------------------------------------------------------
 * - Component for a single blog post.
 */
import { marked } from 'marked'

import Prism from 'prismjs'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-liquid'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-scss'

import { createClient } from '~/plugins/contentful'
import { sanitize } from '~/plugins/sanitize-html'

const contentful = createClient()

export default {
  /**
   * Async Data.
   * - Returns post content
   * @returns {Object}
   */
  async asyncData({ params, error }) {
    try {
      const response = await contentful.getEntries({
        content_type: 'blogPost',
        include: 3,
        'fields.slug': params.slug,
      })

      const data = response.items[0]

      const post = {
        content: data.fields.content,
        publishedAt: data.fields.publishDate,
        slug: data.fields.slug,
        tags: data.metadata.tags,
        title: data.fields.postTitle,
      }

      if (data.fields?.featuredImage) {
        const img = data.fields.featuredImage

        window.console.dir(img.fields)

        post.image = {
          alt: img.fields.description,
          url: img.fields.file.url,
          title: data.fields.featuredImage.fields.title,
        }
      }

      return {
        post,
      }
    } catch (err) {
      error({ statusCode: 404 })
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;600;800&display=swap',
        },
      ],
    }
  },

  computed: {
    /**
     * Compute the article content HTML for render.
     * - Converts markdown
     * - Returns clean HTML
     * @return {String}
     */
    articleContent() {
      const dirty = marked(this.post.content)
      return sanitize(dirty)
    },

    /**
     * Compute a formatted post date.
     * @returns {String}
     */
    articleDate() {
      const dateObj = new Date(this.post.publishedAt)

      return dateObj.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },

  mounted() {
    Prism.highlightAll()
  },
}
</script>

<style lang="scss">
@import './styles/article.scss';
@import './styles/prism.scss';
@import '@/assets/default/main-content.scss';
</style>
