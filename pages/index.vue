<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <img src="~/assets/logo.png" />
      </v-col>
      <v-col cols="12">
        <p class="quote"> {{ joke }}</p>
        <a href="https://sv443.net/jokeapi/v2/" target="_blank" class="quote-by">
          ~ jokeapi
        </a>
      </v-col>
      <v-col cols="12">
        Hi there! I'm glad you decided to spend some time here.
      </v-col>
      <v-col cols="12" md="6">
        Check out my latest blog posts
        <v-row>
          <v-col v-for="article in articles" :key="article.slug" cols="12">
            <v-card tag="a" :href="`/blog/post/${article.slug}`" class="post text-left" outlined>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="article.title"></v-card-title>
                  <v-card-subtitle v-text="article.description"></v-card-subtitle>
                </div>
                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img :src="article.cover"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        Or, take a look at some of my projects.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios, $content }) {
    let articles = await $content('articles').sortBy('createdAt', 'desc').limit(3).only(['title','slug','description','cover','createdAt']).fetch();
    return {
      articles
    };
  },
  data() {
    return {
      joke: 'Dad jokes loading...'
    };
  },
  async mounted() {
    let response = await this.$axios.$get('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single', null, {
      responseType: 'json'
    });
    this.joke = response.joke;
  }
}
</script>

<style scoped>
.quote {
  font-size: 1.3rem;
}
.quote::before {
  content: '“';
}
.quote::after {
  content: '”';
}
.quote::before, .quote::after {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24pt;
}
.quote-by {
  display: block;
  font-size: 12pt;
  text-decoration: none;
  color: #ababab;
}
.quote-by:hover {
  text-decoration: underline;
}
.post {
  text-decoration: none;
}
</style>
