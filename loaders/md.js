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

module.exports = md
