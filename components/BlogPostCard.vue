<template>
  <li>
    <h2>
      <nuxt-link :to="`/blog/${post.fields.slug}`">{{
        post.fields.postTitle
      }}</nuxt-link>
    </h2>
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
  }
}
</script>
