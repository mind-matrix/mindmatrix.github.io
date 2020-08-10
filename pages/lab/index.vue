<template>
    <v-container fluid>
        <v-card>
            <v-card-title>Lab</v-card-title>
            <v-card-subtitle>A shelf for my weird experiments.</v-card-subtitle>
            <v-card-text>
                <v-progress-linear
                    class="loader"
                    v-model="progress"
                    v-if="!loaded"
                    color="primary"
                    height="15"
                >
                    <template v-slot="{ value }">
                        <strong>Loading: {{ Math.ceil(value) }}%</strong>
                    </template>
                </v-progress-linear>
                <client-only>
                    <v-row>
                        <v-col cols="12" v-for="(repo, index) in repos" :key="index">
                            <github-repo :repo="repo" />
                        </v-col>
                    </v-row>
                </client-only>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import GithubRepo from '~/components/GithubRepo';

const REPOS = require('~/assets/repos.json');

export default {
    head () {
        return {
            title: 'LAB | Sagnik Modak',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: 'LAB | Sagnik Modak'
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: 'A place for Sagnik\'s weird experiments.'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'A collection of my best personal projects on GitHub.'
                }
            ]
        }
    },
    components: {
        GithubRepo
    },
    data() {
        return {
            repos: [],
            loaded: false,
            progress: 0
        }
    },
    async mounted() {
        let repos = await this.$axios.$get('https://api.github.com/users/mind-matrix/repos?sort=created&direction=desc', null, {
            onUploadProgress: (progressEvent) => {
                let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
                this.progress = percentCompleted
            }
        });
        this.loaded = true;
        this.repos = repos.filter(v => REPOS.includes(v.full_name));
    }
}
</script>
