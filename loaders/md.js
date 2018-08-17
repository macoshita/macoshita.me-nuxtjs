const MarkdownIt = require('markdown-it')
const emoji = require('markdown-it-emoji')
const Prism = require('prismjs')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-rust')

const md = new MarkdownIt({
  breaks: true,
  highlight (str, lang) {
    let hl

    if (lang && Object.keys(Prism.languages).includes(lang)) {
      try {
        hl = Prism.highlight(str, Prism.languages[lang])
      } catch (error) {
        console.error(str, lang, error)
      }
    } else {
      lang = '__plain__'
      hl = md.utils.escapeHtml(str)
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`
  }
})

md.use(emoji)

module.exports = md
