<template>
  <div>
    <h1 class="tv-screen__white-text">{{ trackArtist }} - {{ trackName }}</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      results: [],
      trackName: '',
      trackArtist: '',
      trackCover: ''
    }
  },

  mounted() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=wreckages&limit=2&api_key=${process.env.LASTFM_API_KEY}&format=json`
      )
      .then((response) => {
        this.results = response.data.recenttracks
        this.trackName = response.data.recenttracks.track[0].name
        this.trackArtist = response.data.recenttracks.track[0].artist['#text']
        this.trackCover = response.data.recenttracks.track[0].image[2]['#text']
        this.displayNowPlaying()
      })
  },
  methods: {
    displayNowPlaying() {
      return this.trackName
    }
  }
}
</script>
