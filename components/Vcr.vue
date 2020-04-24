<template>
  <div class="tv-screen">
    <div class="container">
      <div class="tv-screen__init">AV-1</div>

      <header class="tv-screen__intro">
        <h1 class="tv-screen__intro-heading" tabindex="0">
          <nuxt-link to="/" class="vcr__glitch-text" title="Go to homepage"
            >Jon Ashcroft</nuxt-link
          >
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

      <NowPlaying :song-data="songData" />
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
    albumColours: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'Thing',
            position: 1,
            name: 'Jon Ashcroft',
            item: 'https://ashcroft.dev'
          },
          {
            '@type': 'Thing',
            position: 2,
            name: 'jon',
            item: `https://ashcroft.dev/${this.pageData.pageTitle}`
          }
        ]
      }
    }
  },
  computed: {
    getVcrColours() {
      return this.albumColours
    }
  },
  mounted() {
    this.getNowPlaying()
  },
  methods: {
    doColours(colours) {
      this.albumColours = colours
    },
    getNowPlaying() {}
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify(this.structuredData),
          type: 'application/ld+json'
        }
      ]
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr.scss" lang="scss"></style>
