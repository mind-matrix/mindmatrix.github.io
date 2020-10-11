<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <div v-html="Error404" class="error-img" />
    </h1>
    <h1 v-else>
      <div v-html="Error50x" class="error-img" />
    </h1>
    <ul class="links">
      <li>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog">
          Blog
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/art">
          Art
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/lab">
          Lab
        </NuxtLink>
      </li>
    </ul>
  </v-app>
</template>

<script>
import Error404 from '~/assets/404.svg?raw'
import Error50x from '~/assets/50x.svg?raw'

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      Error404,
      Error50x
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}

.error-img {
  display: block;
  max-width: 500px;
  margin: 0 auto;
}

.links {
  display: flex;
  justify-content: space-around;
  text-align: center;
  list-style: none;
}
.links li {
  flex-grow: 1;
  padding: 0 10px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: large;
}
.links li * {
  text-decoration: none;
}
</style>
