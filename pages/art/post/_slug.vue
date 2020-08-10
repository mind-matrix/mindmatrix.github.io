<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                {{ art.title }}
            </v-card-title>
            <v-card-subtitle>
                {{ art.description }}
            </v-card-subtitle>
            <v-card-text>
                <client-only>
                    <renderer :src="art.model" width="400" height="300" />
                </client-only>
                <nuxt-content :document="art" />
            </v-card-text>
            <v-card-actions>
                <v-btn outlined tag="a" :href="art.model" download target="_blank" tile color="primary">
                    <v-icon>
                        mdi-download
                    </v-icon>
                    Download
                </v-btn>
                <v-spacer />
                <github-button href="https://github.com/sponsors/mind-matrix" data-icon="octicon-heart" data-size="large" aria-label="Sponsor on GitHub">Sponsor</github-button>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import GithubButton from 'vue-github-button';
import Renderer from '~/components/Renderer';

export default {
    async asyncData({ $content, route }) {
        let arts = await $content('art').where({ slug: route.params.slug }).fetch();
        return {
            art: arts[0]
        }
    },
    components: {
        Renderer,
        GithubButton
    },
    data() {
        return {
            assetRoot: null
        }
    },
    async mounted() {
    }
}
</script>
