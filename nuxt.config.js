const path = require('path')
const globby = require('globby')
const SITE_NAME = 'macoshita'

module.exports = {
  head: {
    titleTemplate: chunk => chunk ? `${chunk} - macoshita` : 'macoshita'
  },
  meta: {
    name: SITE_NAME,
    description: `${SITE_NAME} website`,
    lang: 'ja'
  },
  manifest: {
    short_name: SITE_NAME,
    display: 'browser'
  },
  modules: [
    '@nuxtjs/pwa',
    [ '@nuxtjs/google-tag-manager', { id: 'GTM-WX4VWRQ' } ],
  ],
  generate: {
    async routes () {
      const paths = await globby('*.md', { cwd: './blog/' })
      return paths.map(p => '/blog/' + p.replace(/\.md$/, ''))
    }
  },
  build: {
    extend (config) {
      config.resolveLoader.modules.push(path.resolve(__dirname, 'loaders'))
    }
  }
}
