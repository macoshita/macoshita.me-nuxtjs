const path = require('path')
const blogUtil = require('../utils/blog-util')

module.exports = function (source) {
  const slug = path.basename(this.resource, '.md')
  const data = blogUtil.parse(slug, source)

  return `module.exports=${JSON.stringify(data)}`
}

