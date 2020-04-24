<template>
  <div class="card">
    <div class="card-image">
      <h1 class="is-size-1">
        {{ count }}
      </h1>
    </div>
    <div class="card-content">
      <p class="title is-size-1">Page not found</p>
      <div class="content">
        <p class="title is-size-3">Here's a meme to cheer you up!</p>
        <p class="title is-size-4">
          Fresh from <a :href="`https://www.reddit.com/r/${meme.subreddit}/`" target="_blank">r/{{meme.subreddit}}</a>
        </p>
        <a :href="meme.postLink" target="_blank">
          <img v-if="meme" :src="meme.url" class="meme" />
        </a>
        <p class="is-size-5">
          Thanks to <a href="https://github.com/R3l3ntl3ss/Meme_Api">@R3l3ntl3ss</a> for the Meme API. All memes used in this page are randomly selected using this API.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    code: Number
  },
  data: () => ({
    count: 0,
    overflow: Math.round(Math.random() * 4) + 1,
    underflow: Math.round(Math.random() * 2) + 1,
    meme: null,
  }),
  async mounted() {
    let overflowAnim = setInterval(() => {
      if (this.count < this.code + this.overflow) {
        this.count++;
      } else {
        clearInterval(overflowAnim);
        let underflowAnim = setInterval(() => {
          if (this.count > this.code - this.underflow) {
            this.count--;
          } else {
            clearInterval(underflowAnim);
            let correctionAnim = setInterval(() => {
              if (this.count < this.code) {
                this.count++;
              } else {
                clearInterval(correctionAnim);
              }
            }, 500);
          }
        }, 200);
      }
    }, 1);
    try {
      let response = await axios.get('https://meme-api.herokuapp.com/gimme', { responseType: 'json' });
      if (response.status === 200) {
        this.meme = response.data;
      }
    } catch(err) {
      // do something!!!
      console.log(err);
    }
  }
}
</script>

<style lang="less" scoped>
.meme {
  width: 40%;
  height: auto;
  min-width: 250px;
}
</style>
