<template>
  <div class="blog-post">
    <nav>
      <nuxt-link :to="`/`">Go back</nuxt-link>
    </nav>
    <br />
    <header class="blog-post__heading">
      <h1 v-text="post.fields.postTitle"></h1>
    </header>

    <article class="blog-post__article" v-html="renderContent"></article>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    renderContent() {
      return this.cleanHtml(marked(this.post.fields.content))
    }
  },
  head() {
    return {
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/prism.min.js'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-javascript.min.js'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-bash.min.js'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-liquid.min.js'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-json.min.js'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-scss.min.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;800&display=swap'
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/themes/prism-okaidia.min.css'
        }
      ]
    }
  }
}
</script>

<style src="~/assets/styles/components/blog-post.scss" lang="scss"></style>
