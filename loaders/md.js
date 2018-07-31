const MarkdownIt = require('markdown-it')
const emoji = require('markdown-it-emoji')
const Prism = require('prismjs')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-rust')

const md = new MarkdownIt({
  breaks: true,
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

md.use(emoji)

module.exports = md
