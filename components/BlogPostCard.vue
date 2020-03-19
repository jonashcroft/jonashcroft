<template>
  <div>
    <div>{{ post.fields.postTitle }}<br /></div>
  </div>
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
