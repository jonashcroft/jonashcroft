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
  components: {
    Vcr
  },
  asyncData({ env }) {
    return Promise.all([
      ctfClient.getEntries({
        content_type: 'page',
        include: 3,
        'fields.pageTitle': 'Home'
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
