<template>
  <div
    class="tv-screen"
    :style="[defaultColours, albumColours]"
    :class="[isLoaded ? 'loaded' : 'not-loaded']"
  >
    <div class="container">
      <div class="tv-screen__init">AV-1</div>

      <header class="tv-screen__intro">
        <h1
          class="tv-screen__glitch-text tv-screen__intro-heading"
          tabindex="0"
        >
          <nuxt-link to="/">Jon Ashcroft</nuxt-link>
        </h1>
      </header>

      <div class="tv-screen__main">
        <VcrNav />
        <VcrContent :page-data="pageData" />
      </div>

      <NowPlaying @updateColours="doColours" />
    </div>
  </div>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'
import VcrContent from '~/components/VcrContent'
import VcrNav from '~/components/VcrNav'

export default {
  components: {
    VcrContent,
    VcrNav,
    NowPlaying
  },
  props: {
    pageData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isLoaded: false,
      defaultColours: {
        color: '#fff',
        backgroundColor: '#0127f8'
      },
      albumColours: {
        color: '#fff',
        backgroundColor: '#0127f8'
      }
    }
  },
  mounted() {},
  methods: {
    doColours(colours) {
      this.albumColours = colours
      this.isLoaded = true
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr.scss" lang="scss"></style>
