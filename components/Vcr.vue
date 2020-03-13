<template>
  <div
    class="tv-screen"
    :style="colours"
    :class="[isLoaded ? 'loaded' : 'not-loaded', 'lol']"
  >
    <div class="tv-screen__init">AV-1</div>
    <h1 class="tv-screen__white-text">hello, vcr</h1>
    <NowPlaying @updateColours="doColours" />
  </div>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'

export default {
  components: {
    NowPlaying
  },
  data() {
    return {
      isLoaded: false,
      colours: [],
      defaultColours: {
        color: '#fff',
        backgroundColor: '#0127f8'
      },
      newColours: {
        color: '',
        backgroundColor: ''
      }
    }
  },
  mounted() {},
  methods: {
    doColours(colours) {
      this.colours = colours
      this.isLoaded = true
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr.scss" lang="scss"></style>
