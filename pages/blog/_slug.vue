<template>
  <div class="base">
    <blogPost :post="postData" />
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
            postData: post.items[0],
            structuredData: {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://ashcroft.dev/blog/${post.items[0].fields.postTitle.slug}`
              },
              headline: `${post.items[0].fields.postTitle}`,
              image: this.getMarkupImage(post.items[0]),
              author: {
                '@type': 'Person',
                name: 'Jon Ashcroft'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Jon Ashcroft'
              },
              datePublished: this.getMarkupDate(post.items[0]),
              dateModified: this.getMarkupDate(post.items[0], 'modified')
            }
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
      return post.fields.featuredImage
        ? `${post.fields.featuredImage.fields.file.url}?w=620&q=96&fl=progressive`
        : ''
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
      title: `${this.post.fields.postTitle} - Jon Ashcroft`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.post.fields.seoMetaDescription ||
            this.post.fields.description.substring(0, 160),
          'og:locale': 'en-GB',
          'og:type': 'website',
          'og:url': `https://ashcroft.dev/blog/${this.post.fields.slug}`,
          'og:site_name': 'Jon Ashcroft',
          'og:title': this.post.fields.postTitle,
          'og:description':
            this.post.fields.seoMetaDescription ||
            this.post.fields.description.substring(0, 160)
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@jonsnofun'
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@jonsnofun'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post.fields.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            this.post.fields.seoMetaDescription ||
            this.post.fields.description.substring(0, 160)
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.post.fields.featuredImage.fields.file.url || ''
        }
      ],
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

<style src="~/assets/styles/components/blog-post.scss" lang="scss"></style>
<style src="~/assets/styles/components/prism-theme.scss" lang="scss"></style>
