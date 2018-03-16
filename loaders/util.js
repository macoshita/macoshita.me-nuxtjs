const fm = require('front-matter')
const MarkdownIt = require('markdown-it')
const Prism = require('prismjs')
require('prismjs/components/prism-javascript')

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
  highlight (str, lang) {
    let hl

    try {
      hl = Prism.highlight(str, Prism.languages[lang])
    } catch (error) {
      console.error(error)
      hl = md.utils.escapeHtml(str)
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`
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
