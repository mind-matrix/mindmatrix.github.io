<template>
  <div class="card post-container">
    <header class="card-header">
      <div class="card-header-title title is-4">
        {{ post.title }}
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <article class="media">
          <figure class="media-left" style="margin-left: 10px; margin-right: 10px;">
            <p class="image is-32x32">
              <img class="is-rounded" :src="post.author.image">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>{{ post.author.name }}</p>
              <p v-if="post.series !== null">
                From <a :href="`./?s=${post.series}`">{{ post.series }}</a>
              </p>
            </div>
          </div>
          <div class="media-right">
            {{ Math.round(words/200) }} mins read
          </div>
        </article>
        <vue-markdown class="has-text-justified" :source="post.content" />
      </div>
    </div>
    <footer class="footer">
      <p class="has-text-centered">
        Do you want to become a contributor? Send an email to: <a href="mailto:mail.mind.matrix@gmail.com">mail.mind.matrix@gmail.com</a>
      </p>
    </footer>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'

export default {
  props: {
    post: Object
  },
  components: {
    VueMarkdown
  },
  data: () =>({
    url: null,
    words: 0
  }),
  mounted() {
    this.url = window.location.href;
    this.words = this.post.content.split(' ').length;
    Prism.highlightAll();
  }
}
</script>

<style scoped>
.post-container {
  max-width: 960px;
  margin: auto;
}
</style>
