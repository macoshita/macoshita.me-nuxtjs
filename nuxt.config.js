const globby = require('globby')

module.exports = {
  modules: [
    '@nuxtjs/axios',
  ],
  generate: {
    async routes () {
      const paths = await globby('*', { cwd: './blog/' })
      return paths.map(p => '/blog/' + p.replace(/\.md$/, ''))
    }
  },
  build: {
    extend (config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'markdown-with-front-matter-loader'
      })
    }
  }
}
