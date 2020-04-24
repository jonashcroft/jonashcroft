<template>
  <div class="base">
    <blogPost :post="post" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import blogPost from '~/components/BlogPost.vue'

const ctfClient = createClient()
export default {
  components: {
    blogPost
  },
  asyncData({ env, params, error }) {
    return Promise.all([
      ctfClient.getEntries({
        content_type: 'blogPost',
        include: 3,
        'fields.slug': params.slug
      })
    ])
      .then(([post]) => {
        if (post.items && post.items.length) {
          return {
            post: post.items[0],
            structuredData: {}
          }
        } else {
          return error({ statusCode: 404 })
        }
      })
      .catch((err) => {
        console.error(err)
        return err
      })
  },
  methods: {
    getMarkupImage(post) {
      if (post.fields.featuredImage) {
        return `https:${post.fields.featuredImage.fields.file.url}?w=640&q=96&fl=progressive`
      }
      return ''
    },
    getMarkupDate(post, type) {
      let baseDate = post.fields.publishDate

      if (type && type === 'modified') {
        baseDate = post.sys.updatedAt
      }

      return new Date(baseDate).toLocaleDateString('en-GB').split('T')[0] // 😇
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;600;800&display=swap'
        }
      ],
      title: this.post.fields.postTitle,
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: this.post.fields.content.substring(0, 160)
        },
        // Open Graph
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.fields.postTitle
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.fields.content.substring(0, 160)
        },
        { hid: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'og:locale', name: 'og:locale', content: 'en-GB' },
        { hid: 'og:site_name', name: 'og:site_name', content: 'Jon Ashcroft' },
        { hid: 'og:url', name: 'og:url', content: 'https://ashcroft.dev' },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@jonsnofun' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.post.fields.postTitle} - Jon Ashcroft`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            this.post.fields.seoMetaDescription ||
            this.post.fields.content.substring(0, 160)
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.getMarkupImage(this.post)
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.post.fields.postTitle}`
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://ashcroft.dev/blog/${this.post.fields.slug}`
            },
            headline: `${this.post.fields.postTitle}`,
            image: this.getMarkupImage(this.post),
            author: {
              '@type': 'Person',
              name: 'Jon Ashcroft'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Jon Ashcroft'
            },
            datePublished: this.getMarkupDate(this.post),
            dateModified: this.getMarkupDate(this.post, 'modified')
          }),
          type: 'application/ld+json'
        }
      ]
    }
  }
}
</script>

<style src="~/assets/styles/components/blog-post.scss" lang="scss"></style>
<style src="~/assets/styles/components/prism-theme.scss" lang="scss"></style>
