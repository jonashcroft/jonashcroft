/**
 * Config: Nuxt.
 * -----------------------------------------------------------------------------
 */
import * as contentful from 'contentful'

require('dotenv').config()

const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
})

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '%s / jon ashcroft',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'author',
        name: 'author',
        content: 'ashcroft.dev',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'jon ashcroft.dev',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'jon ashcroft',
      },
      {
        hid: 'og:og:site_name',
        property: 'og:og:site_name',
        content: 'jon ashcroft',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-analytics',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  eslint: {
    fix: true,
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },

  env: {
    LASTFM_API_KEY: process.env.LASTFM_API_KEY || '',
    LASTFM_USERNAME: process.env.LASTFM_USERNAME || '',
    CTF_SPACE_ID: process.env.CTF_SPACE_ID || '',
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN || '',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || '',
  },

  sitemap: {
    hostname: 'https://ashcroft.dev',
    path: '/sitemap.xml',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true,
    },
    exclude: ['/static/**'],
    filter({ routes }) {
      return routes.map((route) => {
        return route
      })
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    fallback: true,
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: 'blogPost',
        }),
      ]).then(([blogPost]) => {
        return [...blogPost.items.map((entry) => `/blog/${entry.fields.slug}/`)]
      })
    },
  },
}
