module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'pc',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_313716_nxy3880fotc07ldi.css',
      },
    ],
  },
  css: [{src: '~assets/main.less', lang: 'less'}, '~assets/juejin.css'],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
    },
  },
  build: {
    vendor: ['axios', 'element-ui'],
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  plugins: [
    '~plugins/element-ui',
    {src: '~plugins/dplayer', ssr: false},
    {src: '~plugins/v-lazy'},
  ],
}
