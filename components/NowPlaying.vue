<template>
  <div v-if="songData" class="now-playing">
    <div class="now-playing__track-details">
      <span
        class="vcr__glitch-text track-about"
        tabindex="0"
        v-text="songData.nowPlaying ? 'Now Playing:' : 'Last Played:'"
      ></span>
      <span
        class="vcr__glitch-text track-name"
        tabindex="0"
        v-text="`${songData.trackArtist} - ${songData.trackName}`"
      ></span>
    </div>

    <div
      v-if="songData.trackCover"
      class="now-playing__album-cover"
      tabindex="0"
    >
      <img
        :src="songData.trackCover"
        :alt="`${songData.trackArtist} - ${songData.trackName}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songData: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style src="~/assets/styles/components/now-playing.scss" lang="scss"></style>
