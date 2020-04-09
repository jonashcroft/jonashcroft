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
  asyncData({ env, params }) {
    return Promise.all([
      ctfClient.getEntries({
        content_type: 'blogPost',
        include: 3,
        'fields.slug': params.slug
      })
    ])
      .then(([post]) => {
        return {
          postData: post.items[0]
        }
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }
}
</script>
