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
      const contentType = this.pageData.sys.contentType.sys.id
      const fieldName = contentType === 'page' ? 'pageContent' : 'content'

      const contentOptions = {
        renderNode: {
          'embedded-asset-block': (node) =>
            `<img class="img-fluid" src="${node.data.target.fields.file.url}"/>`
        }
      }

      return this.cleanHtml(
        documentToHtmlString(this.pageData.fields[fieldName], contentOptions)
      )
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr-content.scss" lang="scss"></style>
