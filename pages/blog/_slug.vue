<template>
  <article class="article container container--wide">
    <header class="article__header">
      <h1 class="article__title" v-text="post.title" />

      <time
        class="article__date"
        :title="post.publishedAt"
        :datetime="post.publishedAt"
        v-text="articleDate"
      ></time>

      <img
        v-if="post.image"
        class="article__featured-image"
        :src="post.image.url"
        :alt="post.image.alt"
        loading="lazy"
      />
    </header>

    <div
      class="article__body container container--wide"
      v-html="articleContent"
    />
  </article>
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
        updatedAt: data.sys.updatedAt,
        slug: data.fields.slug,
        tags: data.metadata.tags,
        title: data.fields.postTitle,
        seo: {
          description: data.fields.seoMetaDescription,
        },
      }

      if (data.fields?.featuredImage) {
        const img = data.fields.featuredImage

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
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  head() {
    return {
      title: `${this.post.title} / jon ashcroft`,
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: this.post.content.substring(0, 160),
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.content.substring(0, 160),
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.urlMarkupImage,
        },
        { hid: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'og:locale', name: 'og:locale', content: 'en-GB' },
        { hid: 'og:site_name', name: 'og:site_name', content: 'jon ashcroft' },
        { hid: 'og:url', name: 'og:url', content: 'https://ashcroft.dev' },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@jonsnofun' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.post.title} / jon ashcroft`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            this.post.seo.description || this.post.content.substring(0, 160),
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.post.title}`,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://ashcroft.dev/blog/${this.post.slug}/`,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;600;800&display=swap',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://ashcroft.dev/blog/${this.post.slug}`,
            },
            headline: this.post.title,
            image: this.urlMarkupImage,
            author: {
              '@type': 'Person',
              name: 'Jon Ashcroft',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Jon Ashcroft',
            },
            datePublished: this.articleSchemaDate,
            dateModified: this.articleSchemaModifiedDate,
          },
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

    /**
     * Compute the publish date for JSON+LD
     * @returns {String}
     */
    articleSchemaDate() {
      return new Date(this.post.publishedAt)
        .toLocaleDateString('en-GB')
        .split('T')[0]
    },

    /**
     * Compute the modified date for JSON+LD
     * @returns {String}
     */
    articleSchemaModifiedDate() {
      return new Date(this.post.updatedAt)
        .toLocaleDateString('en-GB')
        .split('T')[0]
    },

    /**
     * Compute a URL for the featured image, used on social media.
     * @returns {String}
     */
    urlMarkupImage() {
      if (this.post.image) {
        return `https:${this.post.image.url}?w=640&q=96&fl=progressive`
      }
      return ''
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
</style>
