<template lang="pug">
main
  article
    header
      h2 blog
    ul
      li(v-for="post in posts", :key="post.slug")
        nuxt-link(:to="`/blog/${post.slug}/`") {{ post.date }} - {{ post.title }}
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const blog = await import('blog-loader!~/blog.config.js')
    return {
      posts: blog
    }
  }
}
</script>
