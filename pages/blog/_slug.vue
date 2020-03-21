<template>
  <div class="base">
    <Vcr :page-data="pageData" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Vcr from '~/components/Vcr.vue'

const ctfClient = createClient()
export default {
  layout: 'blogPost',
  components: {
    Vcr
  },
  asyncData({ env, params }) {
    return Promise.all([
      ctfClient.getEntries({
        content_type: 'blogPost',
        include: 3,
        'fields.slug': params.slug
      })
    ])
      .then(([page]) => {
        return {
          pageData: page.items[0]
        }
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }
}
</script>
