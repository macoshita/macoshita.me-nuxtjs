const path = require('path')
const util = require('./util')
const fm = require('front-matter')
const md = require('./md')

module.exports = function (source) {
  const { slug, date } = util.parseFilePath(this.resource)
  const { attributes, body } = fm(source)
  const content = md.render(body)

  return `module.exports=${JSON.stringify({
    slug,
    date,
    ...attributes,
    content
  })}`
}

