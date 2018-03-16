const path = require('path')
const globby = require('globby')

module.exports = {
  meta: {
    name: '虫けらロック',
    description: 'macoshita のブログ'
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
