<template>
  <li>
    <h2>
      <nuxt-link :to="`/blog/${post.fields.slug}`">{{
        post.fields.postTitle
      }}</nuxt-link>
    </h2>
    <time
      :title="post.fields.publishDate"
      :datetime="post.fields.publishDate"
      v-text="renderDate"
    ></time>
  </li>
</template>

<script>
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
    renderDate() {
      const dateObj = new Date(this.post.fields.publishDate)

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return dateObj.toLocaleDateString('en-GB', options)
    }
  }
}
</script>
