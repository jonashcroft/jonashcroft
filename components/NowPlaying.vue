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
  },
  data() {
    return {
      connected: false,
      results: {
        trackName: '',
        trackArtist: '',
        trackCover: '',
        nowPlaying: false,
        colours: []
      },
      storedResults: {}
    }
  }
  // mounted() {
  //   if (Object.keys(this.storedResults).length !== 0) {
  //     this.results = JSON.parse(sessionStorage.results)
  //     console.log(`we got the stored data`)
  //     alert(`we got the stored data`)
  //   }

  //   axios
  //     .get(
  //       `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&limit=2&api_key=${process.env.LASTFM_API_KEY}&format=json`
  //     )
  //     .then((response) => {
  //       const lastfmData = response.data.recenttracks.track[0]

  //       this.results = {
  //         trackName: lastfmData.name,
  //         trackArtist: lastfmData.artist['#text'],
  //         trackCover: lastfmData.image[0]['#text'],
  //         nowPlaying:
  //           (lastfmData['@attr'] !== undefined &&
  //             lastfmData['@attr'].nowplaying) ||
  //           false,
  //         colours: []
  //       }

  //       this.connected = true

  //       this.displayNowPlaying()
  //       this.getColours()
  //     })
  //     .catch((error) => {
  //       window.console.log(error)
  //       return error
  //     })
  // },
  // methods: {
  //   displayNowPlaying() {
  //     return this.results.trackName
  //   },
  //   getColours() {
  //     Vibrant.from(this.results.trackCover)
  //       .getSwatches()
  //       .then((swatches) => {
  //         for (const key of Object.keys(swatches)) {
  //           this.results.colours.push({
  //             backgroundColor: swatches[key].getHex(),
  //             color: swatches[key].getTitleTextColor()
  //           })
  //         }
  //         this.setColours()
  //       })
  //   },
  //   setColours() {
  //     const randomColour = this.results.colours[
  //       Math.floor(Math.random() * this.results.colours.length)
  //     ]

  //     console.dir(JSON.stringify(this.results))
  //     console.dir(JSON.stringify(this.storedResults))

  //     if (JSON.stringify(this.results !== JSON.stringify(this.storedResults))) {
  //       this.storedResults = this.results
  //       sessionStorage.setItem('results', JSON.stringify(this.storedResults))

  //       // this.$nextTick(() => {
  //       this.$emit('updateColours', randomColour)
  //       // })
  //     }
  //   }
  // }
}
</script>

<style src="~/assets/styles/components/now-playing.scss" lang="scss"></style>
