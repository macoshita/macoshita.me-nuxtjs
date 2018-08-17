<template lang="pug">
main
  article
    header
      h2 About
    p Takahiro Yamakoshi (@macoshita)
    ul
      li: a(href="https://twitter.com/macoshita") Twitter
      li: a(href="https://fb.com/takahiro.yamakoshi") Facebook
      li: a(href="https://github.com/macoshita") GitHub
      li: a(href="https://qiita.com/macoshita") Qiita
  article
    header
      h2 Personal Projects
    ul
      li(v-for="pp in personalProjects", :key="pp.url")
        a(:href="pp.url") {{ pp.year }} - {{ pp.name }}
  article
    header
      h2 Blog
    ul
      li(v-for="post in posts", :key="post.slug")
        nuxt-link(:to="`/blog/${post.slug}/`") {{ post.date }} - {{ post.title }}
</template>

<script>
export default {
  data () {
    return {
      personalProjects: [{
        year: 2018, name: 'かなあそび', url: 'https://macoshita.github.io/play-kana-input'
      }, {
        year: 2017, name: 'AR りんごひろい for Pepper', url: 'https://youtu.be/dT5IBdxcRbg'
      }, {
        year: 2015, name: '折り返し翻訳', url: 'https://orikaeshi.com'
      }]
    }
  },
  async asyncData ({ app, params }) {
    const blog = await import('!blog-loader!~/blog/index.js')
    return {
      posts: blog
    }
  }
}
</script>
