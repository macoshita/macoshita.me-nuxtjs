// This code must work for Node V8 **no babel** and Browser
const MarkdownIt = require('markdown-it')
const fm = require('front-matter')
const Prism = require('prismjs')
require('prismjs/components/prism-javascript')

const langMap = new Map([
  ['js', 'javascript'],
  ['javascript', 'javascript']
])

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
  highlight (str, lang) {
    const l = langMap.get(lang) || lang
    let hl

    try {
      hl = Prism.highlight(str, Prism.languages[l])
    } catch (error) {
      console.error(error)
      hl = md.utils.escapeHtml(str)
    }

    return `<pre class="language-${l}"><code class="language-${l}">${hl}</code></pre>`
  }
})

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
