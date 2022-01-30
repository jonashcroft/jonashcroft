<template>
  <footer class="footer">
    <figure class="footer__now-playing container">
      <img
        class="footer__now-playing-cover"
        :srcset="getCoverSrcSet()"
        :src="track.cover.small"
        :alt="textNowPlayingCoverAlt"
        loading="lazy"
      />

      <figcaption class="footer__now-playing-details">
        <span class="footer__now-playing-state" v-text="textNowPlayingState" />
        <span class="footer__now-playing-track" v-text="textNowPlayingTrack" />
        <span
          class="footer__now-playing-artist"
          v-text="textNowPlayingArtist"
        />
      </figcaption>
    </figure>
  </footer>
</template>

<script>
/**
 * Component: Site Footer.
 * -----------------------------------------------------------------------------
 */
export default {
  name: 'SiteFooter',

  data() {
    return {
      track: {
        artist: 'Artist',
        title: 'Track Title',
        cover: {
          small: '/now-playing-placeholder.png',
          large: '/now-playing-placeholder.png',
        },
      },
    }
  },

  computed: {
    /**
     * Compute alt text for the cover art.
     * @return {String}
     */
    textNowPlayingCoverAlt() {
      return `Album artwork for track title "${this.track.title}" by the artist "${this.track.artist}"`
    },

    /**
     * Compute a styled 'Now Playing' track artist.
     * @return {String}
     */
    textNowPlayingArtist() {
      return `by ${this.track.artist}`
    },

    /**
     * Compute alt text for the cover art.
     * @return {String}
     */
    textNowPlayingState() {
      return this.track.nowPlaying ? 'Now Playing:' : 'Last played:'
    },

    /**
     * Compute a styled 'Now Playing' track title.
     * @return {String}
     */
    textNowPlayingTrack() {
      return `"${this.track.title}"`
    },
  },

  watch: {
    /**
     * The Next page has changed.
     */
    $route() {
      this.queryNowPlaying()
    },
  },

  created() {
    this.queryNowPlaying()
  },

  methods: {
    /**
     * Get responsive images for the cover art.
     * @return {String}
     */
    getCoverSrcSet() {
      return [
        `${this.track.cover.small} 150w`,
        `${this.track.cover.large} 768w`,
      ].join(', ')
    },

    /**
     * Query the Last.FM API for recent music data.
     */
    async queryNowPlaying() {
      try {
        const params = new URLSearchParams()

        params.set('method', 'user.getrecenttracks')
        params.set('user', process.env.LASTFM_USERNAME)
        params.set('limit', '1')
        params.set('api_key', process.env.LASTFM_API_KEY)
        params.set('format', 'json')

        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?${params.toString()}`
        )
        const tracks = await response.json()

        this.handleNowPlayingResponse(tracks.recenttracks.track)
      } catch (error) {
        throw new Error('Error getting last.fm track', error)
      }
    },

    /**
     * Handle the response from Last.FM.
     * @param {Array} tracks - array of tracks from the API.
     */
    handleNowPlayingResponse(tracks) {
      this.track = tracks.map((track) => {
        const formatted = {
          artist: track.artist['#text'],
          key: track.mbid,
          nowPlaying: Boolean(track['@attr']?.nowplaying),
          title: track.name,
          cover: this.track.cover,
        }

        if (track.image[0]['#text']) {
          formatted.cover = {
            small: track.image[0]['#text'],
            large: track.image[3]['#text'],
          }
        }

        return formatted
      })[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import './footer.scss';
</style>
