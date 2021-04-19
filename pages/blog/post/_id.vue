<template>
    <v-container fluid>
        <article>
            <h1 class="text-center">{{ article.title }}</h1>
            <v-subheader class="d-block text-right">
                Published: {{ new Date(article.createdAt).toLocaleDateString() }}
            </v-subheader>
            <outline :links="article.toc" v-if="article.outline" />
            <nuxt-content :document="article" />
        </article>
    </v-container>
</template>

<script>
import Outline from '~/components/Outline'

export default {
    components: {
        Outline
    },
    async asyncData ({ route, $content }) {
        const articles = await $content('articles').where({ slug: route.params.id }).limit(1).fetch();
        return {
            article: articles[0]
        };
    },
    head() {
        return {
            title: this.article.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.article.description
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: this.article.title
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: this.article.description
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: this.article.cover
                },
            ]
        }
    },
    mounted() {
        console.log(this.article);
    }
}
</script>

<style>
code {
    background-color: transparent !important;
    padding: 0 !important;
}
.code.output {
    display: block;
    font-family: monospace;
    font-size: 12.24px;
    color: grey !important;
}
.nuxt-content img {
    display: block;
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
}
.nuxt-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
}
.nuxt-content td, .nuxt-content th {
  border: 1px solid #ddd;
  padding: 8px;
}

.nuxt-content th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--v-primary-base);
    color: white;
}
</style>
