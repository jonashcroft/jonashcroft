<template>
  <div class="base">
    <Vcr :page-data="pageData" :blog-posts="posts" />
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
        'fields.pageTitle': 'Blog'
      }),
      ctfClient.getEntries({
        content_type: 'blogPost',
        limit: 40
        // order: 'fields.createdAt'
      })
    ])
      .then(([page, post]) => {
        return {
          pageData: page.items[0],
          posts: post.items
        }
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }
}
</script>