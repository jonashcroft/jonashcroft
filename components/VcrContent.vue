<template>
  <main class="tv-screen__content vcr-main-content">
    {{ renderContent }}
  </main>
</template>

<script>
// import marked from 'marked'

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
      return documentToHtmlString(this.pageData.fields.pageContent)
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr-content.scss" lang="scss"></style>
