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
                  <v-card-subtitle>
                    {{ new Date(article.createdAt).toLocaleDateString() }}
                  </v-card-subtitle>
                  <v-card-text v-text="article.description"></v-card-text>
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
        <client-only>
            <v-row>
                <v-col cols="12" v-for="(repo, index) in repos" :key="index">
                    <github-repo :repo="repo" />
                </v-col>
            </v-row>
        </client-only>
      </v-col>
      <v-col cols="6" class="d-block mx-auto">
        Also, see some of my most recent 3D artwork.
            <v-list-item v-for="(art, index) in arts" :to="`/art/post/${art.slug}`" :key="index">
                <v-list-item-avatar size="150">
                    <v-img :src="art.cover" />
                </v-list-item-avatar>
                <v-list-item-content class="d-none d-md-flex text-left">
                    <v-list-item-title class="font-weight-bold">
                        {{ art.title }}
                    </v-list-item-title>
                    {{ art.description }}
                </v-list-item-content>
            </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

const REPOS = require('~/assets/repos.json');

export default {
  async asyncData({ $axios, $content }) {
    let articles = await $content('articles').sortBy('createdAt', 'desc').limit(3).only(['title','slug','description','cover','createdAt']).fetch();
    let arts = await $content('art').sortBy('createdAt', 'desc').limit(3).only(['title','slug','cover','description']).fetch();
    return {
      articles,
      arts
    };
  },
  data() {
    return {
      joke: 'Dad jokes loading...',
      repos: []
    };
  },
  async mounted() {
    try {
      let response = await this.$axios.$get('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single', null, {
        responseType: 'json'
      });
      this.joke = response.joke;
    } catch (e) {
      this.joke = "404 - Joke not found :("
    }

    let repos = await this.$axios.$get('https://api.github.com/users/mind-matrix/repos?sort=created&direction=desc');
    for (let i=0; i < repos.length; i++) {
      if (REPOS.includes(repos[i].full_name)) {
        this.repos.push(repos[i]);
        if (this.repos.length === 3)
          break;
      }
    }
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
