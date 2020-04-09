<template>
  <div class="tv-screen" :style="[defaultColours, albumColours]">
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

        <ul
          v-if="blogPosts.length > 0"
          class="tv-screen__card-list tv-screen__content"
        >
          <blogPostCard
            v-for="post in blogPosts"
            :key="post.sys.id"
            :post="post"
          />
        </ul>
        <VcrContent v-else :page-data="pageData" />
      </div>

      <NowPlaying />
    </div>
  </div>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'
import VcrContent from '~/components/VcrContent'
import VcrNav from '~/components/VcrNav'

import blogPostCard from '~/components/BlogPostCard'

export default {
  components: {
    VcrContent,
    VcrNav,
    NowPlaying,
    blogPostCard
  },
  props: {
    pageData: {
      type: Object,
      default() {
        return {}
      }
    },
    blogPosts: {
      type: Array,
      default() {
        return []
      }
    },
    songData: {
      type: Object,
      default() {
        return {}
      }
    },
    songColours: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
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
  methods: {
    doColours(colours) {
      this.albumColours = colours
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr.scss" lang="scss"></style>
