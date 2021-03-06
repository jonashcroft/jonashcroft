<template>
  <div class="base">
    <Vcr
      :album-colours="albumColours"
      :page-data="pageData"
      :song-data="results"
    />
  </div>
</template>

<script>
import * as Vibrant from 'node-vibrant'
import { createClient } from '~/plugins/contentful.js'
import Vcr from '~/components/Vcr.vue'

const ctfClient = createClient()
export default {
  components: {
    Vcr
  },
  asyncData({ env, $axios }) {
    return Promise.all([
      ctfClient.getEntries({
        content_type: 'page',
        include: 3,
        'fields.pageTitle': 'About'
      }),
      $axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&limit=2&api_key=${process.env.LASTFM_API_KEY}&format=json`
      )
    ])
      .then(([page, response]) => {
        return {
          pageData: page.items[0],
          musicData: response.data.recenttracks.track[0],
          results: {
            trackName: response.data.recenttracks.track[0].name,
            trackArtist: response.data.recenttracks.track[0].artist['#text'],
            trackCover: response.data.recenttracks.track[0].image[0]['#text'],
            nowPlaying:
              (response.data.recenttracks.track[0]['@attr'] !== undefined &&
                response.data.recenttracks.track[0]['@attr'].nowplaying) ||
              false,
            colours: []
          }
        }
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  },
  data() {
    return {
      albumColours: {},
      getStyleAttrs: {}
    }
  },
  mounted() {
    this.getColours()
  },
  methods: {
    getColours() {
      Vibrant.from(this.results.trackCover)
        .getSwatches()
        .then((swatches) => {
          for (const key of Object.keys(swatches)) {
            if (swatches[key] === null) {
              continue
            }

            this.results.colours.push({
              backgroundColor: swatches[key].getHex(),
              color: swatches[key].getTitleTextColor()
            })
          }

          if (this.results.colours === []) {
            return
          }

          const randomIndex = Math.floor(
            Math.random() * this.results.colours.length
          )

          this.albumColours = {
            backgroundColor: this.results.colours[randomIndex].backgroundColor,
            color: this.results.colours[randomIndex].color
          }

          document.documentElement.style.setProperty(
            '--album-bg-colour',
            this.albumColours.backgroundColor
          )
          document.documentElement.style.setProperty(
            '--album-text-colour',
            this.albumColours.color
          )
        })
    }
  },
  head() {
    return {
      title: 'About - Jon Ashcroft',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: ''
        },
        // Open Graph
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'About - Jon Ashcroft'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: ''
        }
      ]
    }
  }
}
</script>
