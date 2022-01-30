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
  css: ['@/assets/styles/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  eslint: {
    fix: true,
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
