<template>
  <div class="content">
    <img :src="require('@/assets/logo.png')" alt="mindmatrix" />
    <h1>
      Your guide to Web3.0 and beyond
    </h1>
    <p v-for="(top, index) in top" :key="index">
      {{ top.text }}
      <ul v-for="(post, index) in top.posts" :key="index">
        <li class="title is-4">
          <a :href="`./?p=${post}`">{{post}}</a>
        </li>
      </ul>
    </p>
    <footer class="footer">
      <div class="content has-text-centered">
        Thanks to the following sources:
        <ul>
          <li>
            <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </li>
        </ul>
        Do you want to become a contributor? Send an email to: <a href="mailto:mail.mind.matrix@gmail.com">mail.mind.matrix@gmail.com</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    top: Object,
    posts: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
