<template>
  <b-navbar fixed-top>
    <template slot="brand">
        <b-navbar-item>
          <img :src="require('@/assets/logo.png')" alt="mindmatrix">
        </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item class="has-text-success" href="./">
        <b-icon pack="fas" icon="home" />
        <h1>
          Home
        </h1>
      </b-navbar-item>
      <b-navbar-item class="has-text-success" href="./?s=x&all=true">
        <b-icon pack="fas" icon="book" />
        <h1>
          Series
        </h1>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data: () => ({
  })
}
</script>
