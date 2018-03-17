const path = require('path')
const globby = require('globby')

module.exports = {
  head: {
    titleTemplate (chunk) {
      return chunk ? `${chunk} - @macoshita` : `@macoshita`
    }
  },
  meta: {
    name: '@macoshita',
    description: '@macoshita website',
    lang: 'ja'
  },
  manifest: {
    short_name: '@macoshita'
  },
  modules: [
    '@nuxtjs/pwa'
  ],
  generate: {
    async routes () {
      const paths = await globby('*', { cwd: './blog/' })
      return paths.map(p => '/blog/' + p.replace(/\.md$/, ''))
    }
  },
  build: {
    extend (config) {
      config.resolveLoader.modules.push(path.resolve(__dirname, 'loaders'))
    }
  }
}
