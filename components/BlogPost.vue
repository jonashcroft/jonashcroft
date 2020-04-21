<template>
  <div class="blog-post">
    <nav class="blog-post__nav">
      <nuxt-link :to="`/`">Jon Ashcroft</nuxt-link>
    </nav>
    <br />
    <header class="blog-post__heading">
      <h1 v-text="post.fields.postTitle"></h1>

      <time
        :title="post.fields.publishDate"
        :datetime="post.fields.publishDate"
        v-text="renderDate"
      ></time>
    </header>

    <section v-if="post.fields.featuredImage" class="blog-post__featured-image">
      <img
        :src="
          `${post.fields.featuredImage.fields.file.url}?w=620&q=96&fl=progressive`
        "
        :alt="post.fields.featuredImage.fields.description"
      />
    </section>

    <article class="blog-post__article" v-html="renderContent"></article>
  </div>
</template>

<script>
import marked from 'marked'

import Prism from 'prismjs'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-liquid'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-scss'

export default {
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://ashcroft.dev/blog/${this.post.fields.postTitle.slug}`
        },
        headline: `${this.post.fields.postTitle}`,
        image: this.getMarkupImage(),
        author: {
          '@type': 'Person',
          name: 'Jon Ashcroft'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Jon Ashcroft'
        },
        datePublished: this.getMarkupDate(),
        dateModified: this.getMarkupDate('modified')
      }
    }
  },
  computed: {
    renderContent() {
      return this.cleanHtml(marked(this.post.fields.content))
    },
    renderDate() {
      const dateObj = new Date(this.post.fields.publishDate)

      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return dateObj.toLocaleDateString('en-GB', options)
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  methods: {
    getMarkupImage() {
      return this.post.fields.featuredImage
        ? `${this.post.fields.featuredImage.fields.file.url}?w=620&q=96&fl=progressive`
        : ''
    },
    getMarkupDate(type) {
      let baseDate = this.post.fields.publishDate

      if (type && type === 'modified') {
        baseDate = this.post.sys.updatedAt
      }

      return new Date(baseDate).toLocaleDateString('en-GB').split('T')[0] // 😇
    }
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify(this.structuredData),
          type: 'application/ld+json'
        }
      ]
    }
  }
}
</script>
