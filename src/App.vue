<template>
  <div id="app">
    <navbar />
    <b-loading is-full-page :active.sync="loading">
      <b-icon
        pack="fas"
        icon="sync-alt"
        size="is-large"
        custom-class="fa-spin" />
    </b-loading>
    <template v-if="error">
      <Error class="has-text-centered" :code="errorCode" />
    </template>
    <template v-else-if="selectedPost !== null">
      <Post :post="selectedPost" />
    </template>
    <template v-else-if="showSeries">
      <Series :selected="selectedSeries" :series="series" />
    </template>
    <template v-else>
      <Home :top="top" :posts="posts" class="has-text-centered" />
    </template>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

import Error from '@/components/Error.vue';
import Post from '@/components/Post.vue';
import Series from '@/components/Series.vue';
import Home from '@/components/Home.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Navbar,

    Home,
    Post,
    Series,
    Error
  },
  methods: {
    async GetPost(title, series = null) {
      let response = null;
      try {
        if (series) {
          response = await axios.get(`./posts/${series}/${title}.md`, { responseType: 'text' });
        } else {
          response = await axios.get(`./posts/${title}.md`, { responseType: 'text' });
        }
        if (response.status === 200) {
          return response.data;
        }
      } catch (err) {
        // do something about it!!!
        this.error = true;
        this.errorCode = err.response.status;
        return null;
      }
    }
  },
  data: () => ({
    home: true,
    error: false,
    errorCode: null,
    selectedPost: null,
    selectedSeries: null,
    showSeries: false,
    loading: true,
    top: null,
    posts: null,
    series: null,
    authors: null
  }),
  async mounted() {
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    let post = params.get('p');
    let series = params.get('s');
    let all = params.get('all');

    // load configs
    this.top = (await axios.get(`./top.json?timestamp=${new Date().getTime()}`, { responseType: 'json' })).data;
    this.posts = (await axios.get(`./posts.json?timestamp=${new Date().getTime()}`, { responseType: 'json' })).data;
    this.series = (await axios.get(`./series.json?timestamp=${new Date().getTime()}`, { responseType: 'json' })).data;
    this.authors = (await axios.get(`./authors.json?timestamp=${new Date().getTime()}`, { responseType: 'json' })).data;

    if (series) {
      if(all === 'true') {
        console.log(series, all);
        this.showSeries = true;
      } else if (post) {
        if(this.series.hasOwnProperty(series) && this.series[series].posts.includes(post)) {
          this.home = false;
          // show post
          let content = await this.GetPost(post, series);
          if(content !== null) {
            this.selectedPost = this.posts[post];
            this.selectedPost.title = post;
            this.selectedPost.content = content;
          }
        } else {
          this.error = true;
          this.errorCode = 404;
        }
      } else if(this.series.hasOwnProperty(series)) {
        // show series
        this.selectedSeries = series;
        this.showSeries = true;
      } else {
        this.error = true;
        this.errorCode = 404;
      }
    } else if (post) {
      this.home = false;
      // show post
      let content = await this.GetPost(post, this.posts[post].series);
      if(content !== null) {
        this.selectedPost = this.posts[post];
        this.selectedPost.title = post;
        this.selectedPost.content = content;
        this.authors[this.selectedPost.author].name = this.selectedPost.author;
        this.selectedPost.author = this.authors[this.selectedPost.author];
      }
    }

    this.loading = false;
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 10px;
  font-family: 'Lato', sans-serif;
}

#app > *.primary {
  color: #25b925;
}

</style>
