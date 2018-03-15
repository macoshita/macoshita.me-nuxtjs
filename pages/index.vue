<template lang="pug">
article
  header
    h2 blog
  ul
    li(v-for="post in posts", :key="post.slug")
      nuxt-link(:to="`/blog/${post.slug}/`") {{ post.slug }}
</template>

<script>
import blog from 'blog-loader!~/blog.config.js'

export default {
  async asyncData ({ app, params }) {
    return {
      posts: blog
    }
  }
}
</script>
