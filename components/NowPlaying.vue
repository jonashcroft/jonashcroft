<template>
  <div class="tv-screen__now-playing">
    <div class="tv-screen__track-details">
      <span
        class="tv-screen__white-text track-about"
        v-text="nowPlaying === 'true' ? 'Now Playing' : 'Last Played'"
      ></span>
      <span class=" track-name" v-text="`${trackArtist} - ${trackName}`"></span>
    </div>

    <p class="tv-screen__album-cover">
      <img :src="trackCover" :alt="`${trackArtist} - ${trackName}`" />
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import * as Vibrant from 'node-vibrant'

export default {
  data() {
    return {
      results: [],
      trackName: '',
      trackArtist: '',
      trackCover: '',
      nowPlaying: false,
      colours: []
    }
  },
  mounted() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&limit=2&api_key=${process.env.LASTFM_API_KEY}&format=json`
      )
      .then((response) => {
        this.nowPlaying =
          response.data.recenttracks.track[0]['@attr'].nowplaying || false
        this.results = response.data.recenttracks
        this.trackName = response.data.recenttracks.track[0].name
        this.trackArtist = response.data.recenttracks.track[0].artist['#text']
        this.trackCover = response.data.recenttracks.track[0].image[0]['#text']
        this.displayNowPlaying()
        this.getColours()
      })
  },
  methods: {
    displayNowPlaying() {
      return this.trackName
    },
    getColours() {
      Vibrant.from(this.trackCover)
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
