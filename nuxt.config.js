export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

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
        id: 'UA-12301-2'
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
            //   route.url = route.url.endsWith('/') ? route.url : `${route.url}/`
            return route
          })
        }
      }
    ]
  ],
  env: {
    LASTFM_API_KEY: process.env.LASTFM_API_KEY || '',
    LASTFM_USERNAME: process.env.LASTFM_USERNAME || '',
    CTF_SPACE_ID: process.env.CTF_SPACE_ID || '',
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN || ''
  },
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
    fallback: true
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
