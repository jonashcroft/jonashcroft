<template>
  <div v-if="connected" class="tv-screen__now-playing">
    <div class="tv-screen__track-details">
      <span
        class="tv-screen__white-text track-about"
        tabindex="0"
        v-text="results.nowPlaying ? 'Now Playing:' : 'Last Played'"
      ></span>
      <span
        class="tv-screen__white-text track-name"
        tabindex="0"
        v-text="`${results.trackArtist} - ${results.trackName}`"
      ></span>
    </div>

    <p v-if="results.trackCover" class="tv-screen__album-cover" tabindex="0">
      <img
        :src="results.trackCover"
        :alt="`${results.trackArtist} - ${results.trackName}`"
      />
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import * as Vibrant from 'node-vibrant'

export default {
  data() {
    return {
      connected: false,
      results: {
        trackName: '',
        trackArtist: '',
        trackCover: '',
        nowPlaying: false
      },
      colours: []
    }
  },
  mounted() {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&limit=2&api_key=${process.env.LASTFM_API_KEY}&format=json`
      )
      .then((response) => {
        const lastfmData = response.data.recenttracks.track[0]

        this.results = {
          trackName: lastfmData.name,
          trackArtist: lastfmData.artist['#text'],
          trackCover: lastfmData.image[0]['#text'],
          nowPlaying:
            (lastfmData['@attr'] !== undefined &&
              lastfmData['@attr'].nowplaying) ||
            false
        }

        this.connected = true

        this.displayNowPlaying()
        this.getColours()
      })
      .catch((error) => {
        window.console.log(error)
        return error
      })
  },
  methods: {
    displayNowPlaying() {
      return this.results.trackName
    },
    getColours() {
      Vibrant.from(this.results.trackCover)
        .getSwatches()
        .then((swatches) => {
          for (const key of Object.keys(swatches)) {
            this.colours.push({
              backgroundColor: swatches[key].getHex(),
              color: swatches[key].getTitleTextColor()
            })
          }
          this.setColours()
        })
    },
    setColours() {
      const randomColour = this.colours[
        Math.floor(Math.random() * this.colours.length)
      ]

      this.$nextTick(() => {
        this.$emit('updateColours', randomColour)
      })
    },
    renderTrackInfo() {}
  }
}
</script>
