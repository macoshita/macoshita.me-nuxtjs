<template lang="pug">
main
  article
    header
      h2 {{ title }}
      time {{ date }}
    div(v-html="content", :class="$style.content")
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const slug = params.slug
    return await import(/* webpackChunkName: 'page-[index]' */ `!fmmd-loader!~/blog/${slug}.md`)
  },

  head () {
    return {
      title: this.title,
      htmlAttrs: {
        lang: this.lang || 'ja'
      }
    }
  }
}
</script>

<style>
@import '~/node_modules/prismjs/themes/prism.css';
</style>

<style module>
.content {
  & img {
    max-width: 100%;
  }
}
</style>
