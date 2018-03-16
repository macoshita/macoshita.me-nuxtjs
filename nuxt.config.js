const path = require('path')
const globby = require('globby')

module.exports = {
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
