<template>
  <div class="tv-screen">
    <div class="tv-screen__init">AV-1</div>

    <h1 class="tv-screen__white-text">hello, vcr</h1>

    <NowPlaying />
  </div>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'

export default {
  components: {
    NowPlaying
  }
}
</script>

<style src="~/assets/styles/components/vcr.scss" lang="scss"></style>
