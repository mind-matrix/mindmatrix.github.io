<template>
  <div class="card">
    <div class="card-header">
      <div v-if="selected === null" class="card-header-title">
        List of all Series
      </div>
      <div v-else class="card-header-title">
        {{ selected }}
      </div>
    </div>
    <div class="card-content">
      <template v-if="selected === null">
        <template v-for="(series, index) in series" >
          <a :key="index" :href="`./?s=${index}`">
            <article class="media">
              <figure class="media-left">
                <p class="image is-128x128">
                  <img :src="series.image">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <h2>{{ index }}</h2>
                </div>
              </div>
            </article>
            <hr />
          </a>
        </template>
      </template>
      <template v-else>
        <figure style="margin: 20px auto;" class="image is-128x128">
          <img :src="series[selected].image">
        </figure>
        <ul>
          <li class="title is-4" v-for="(post, index) in series[selected].posts" :key="index">
            #{{ index + 1 }}
            <a :href="`./?p=${post}`"> {{ post }} </a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    series: {
      type: Object,
      default: null
    },
    selected: {
      type: String,
      default: null
    }
  },
  data: () =>({
  })
}
</script>