const path = require('path')
const util = require('./util')

module.exports = function (source) {
  const slug = path.basename(this.resource, '.md')
  const data = util.parse(slug, source)

  return `module.exports=${JSON.stringify(data)}`
}

