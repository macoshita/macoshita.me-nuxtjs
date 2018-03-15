<template lang="pug">
article
  header
    h2 {{ title }}
    time {{ date }}
  div(v-html="content")
</template>

<script>
import MarkdownIt from 'markdown-it'
import fm from 'front-matter'
const md = new MarkdownIt()

export default {
  async asyncData ({ app, params }) {
    const slug = params.slug
    const date = slug.replace(/^(\d{4}-\d{2}-\d{2}).*/, '$1')
    const data = await import(`raw-loader!~/blog/${slug}.md`)
    const { attributes, body } = fm(data)
    const title = attributes.title
    const content = md.render(body)

    return {
      title,
      content,
      date
    }
  }
}
</script>
