<template>
  <main
    class="tv-screen__content vcr-main-content"
    v-html="renderContent"
  ></main>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

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
    renderContent() {
      return this.cleanHtml(
        documentToHtmlString(this.pageData.fields.pageContent)
      )
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr-content.scss" lang="scss"></style>
