<template lang="pug">
article
  header
    h2 {{ title }}
    time {{ date }}
  div(v-html="content")
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const slug = params.slug
    return await import(`fmmd-loader!~/blog/${slug}.md`)
  }
}
</script>
