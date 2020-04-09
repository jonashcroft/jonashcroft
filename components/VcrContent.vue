<template>
  <main
    class="tv-screen__content vcr-main-content"
    v-html="renderContent"
  ></main>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    pageData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    contentType() {
      return this.pageData.sys.contentType.sys.id
    },
    renderContent() {
      let pageContent = marked(this.pageData.fields.content)

      if (this.contentType === 'blogPost') {
        pageContent = `
        <h1 class="blog-post-title">${this.pageData.fields.postTitle}</h1>
        <article class="blog-post">
          ${marked(this.pageData.fields.content)}
        </article>`
      }

      return this.cleanHtml(pageContent)
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr-content.scss" lang="scss"></style>
