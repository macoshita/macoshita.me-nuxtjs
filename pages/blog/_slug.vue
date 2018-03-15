<template lang="pug">
article
  header
    h2 {{ title }}
    time {{ date }}
  div(v-html="content")
</template>

<script>
import blogUtil from '~/utils/blog-util'

export default {
  async asyncData ({ app, params }) {
    const slug = params.slug
    const fmmd = await import(`raw-loader!~/blog/${slug}.md`)
    const data = blogUtil.parse(slug, fmmd)

    return data
  }
}
</script>
