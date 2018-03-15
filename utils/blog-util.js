// This code must work for Node V8 **no babel** and Browser
const MarkdownIt = require('markdown-it')
const fm = require('front-matter')
const md = new MarkdownIt()

module.exports = {
  parse (slug, fmmd) {
    const date = slug.replace(/^(\d{4}-\d{2}-\d{2}).*/, '$1')
    const { attributes, body } = fm(fmmd)
    const title = attributes.title
    const content = md.render(body)

    return {
      date,
      title,
      content
    }
  }
}
