import dotenv from 'dotenv'

import * as contentful from 'contentful'

dotenv.config()
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
})

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: `Jon Ashcroft - %s`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Jon Ashcroft'
      },
      {
        hid: 'og:og:site_name',
        property: 'og:og:site_name',
        content: 'Jon Ashcroft'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  env: {
    LASTFM_API_KEY: process.env.LASTFM_API_KEY || '',
    LASTFM_USERNAME: process.env.LASTFM_USERNAME || '',
    CTF_SPACE_ID: process.env.CTF_SPACE_ID || '',
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN || '',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || ''
  },

  /*
   ** Global CSS
   */
  css: ['assets/styles/global/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/cleanHtml'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    [
      '@nuxtjs/google-analytics',
      {
        id: process.env.GOOGLE_ANALYTICS_ID
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/sitemap',
      {
        hostname: 'https://ashcroft.dev',
        path: '/sitemap.xml',
        gzip: true,
        defaults: {
          changefreq: 'weekly',
          priority: 1,
          lastmod: new Date(),
          lastmodrealtime: true
        },
        filter({ routes }) {
          return routes.map((route) => {
            return route
          })
        }
      }
    ]
  ],
  styleResources: {
    scss: [
      'assets/styles/global/_config.scss',
      'assets/styles/global/_animations.scss'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  generate: {
    fallback: true,
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: 'blogPost'
        })
      ]).then(([blogEntries]) => {
        return [
          ...blogEntries.items.map((entry) => `/blog/${entry.fields.slug}`)
        ]
      })
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
