<template>
    <v-container fluid>
        <v-row dense>
            <v-spacer />
            <div class="search-box">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-on="on"
                            v-bind="attrs"
                            class="text-right"
                            outlined
                            @input="searchArticles"
                            v-model="query"
                            placeholder="Search..."
                            autocomplete="off"
                            aria-autocomplete="false"
                            prepend-inner-icon="mdi-magnify"
                            dense
                        />
                    </template>
                    <v-list v-if="search.length">
                        <v-list-item
                            v-for="(article, index) in search"
                            :key="index"
                            tag="a"
                            :href="`/blog/post/${article.slug}`"
                        >
                            <v-list-item-title>{{ article.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-list v-else>
                        <v-list-item>
                            Type something to search...
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-row>
        <h2>Latest blog posts</h2>
        <v-divider />
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
    </v-container>
</template>

<script>
export default {
    head () {
        return {
            title: 'BLOG | Sagnik Modak',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: 'BLOG | Sagnik Modak'
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: 'Sagnik\'s Github Pages Static Blog created with NuxtJS Framework'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Sagnik\'s Github Pages Static Blog created with NuxtJS Framework'
                }
            ]
        }
    },
    async asyncData({ $content }) {
        let articles = await $content('articles').sortBy('createdAt', 'desc').limit(5).only(['title','slug','description','cover','createdAt']).fetch();
        return {
            articles,
        };
    },
    data() {
        return {
            query: null,
            search: []
        }
    },
    methods: {
        async searchArticles() {
            this.search = await this.$content('articles').search('title', this.query).only(['title','slug']).fetch();
        }
    }
}
</script>

<style scoped>
.search-box {
    max-width: 300px;
}
</style>
