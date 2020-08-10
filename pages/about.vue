<template>
    <v-container fluid>
        <v-card outlined>
            <v-row justify="space-between">
                <v-col cols="12" md="8">
                    <div>
                        <v-card-title class="headline">About me</v-card-title>
                        <v-card-subtitle>Sagnik Modak</v-card-subtitle>
                        <v-card-text class="text-justify">
                            <p>
                                Hi, I am Sagnik. I'll break the ice. A little bit about myself - I love to spend time with family and friends. I also happen to be a self-taught programming enthusiast. My primary interests are Web Development and AI and the bridge between the two. I am currently pursuing B.Tech. in Computer Science and Engineering at the National Institute of Technology. I am hoping to study AI in the near future. I'd love to hear from you too. 
                            </p>
                            <p>
                                <a href="https://twitter.com/sagnik_modak?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-lang="en" data-show-count="false">Follow @sagnik_modak</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                                <github-button href="https://github.com/sponsors/mind-matrix" data-icon="octicon-heart" data-size="large" aria-label="Sponsor on GitHub">Sponsor</github-button>
                                <github-button href="https://github.com/mind-matrix" data-size="large" aria-label="Follow on GitHub">Follow</github-button>
                            </p>
                        </v-card-text>
                    </div>
                </v-col>
                <v-col cols="12" md="auto" class="mx-2">
                    <v-img max-width="300" class="ma-auto" src="/sagnik.png"></v-img>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import GithubButton from 'vue-github-button';

export default {
    head () {
        return {
            title: 'ABOUT | Sagnik Modak',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: 'ABOUT | Sagnik Modak'
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: 'This is the page where you get to know the awesome person I am.'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'A little bit about me.'
                }
            ]
        }
    },
    components: {
        GithubButton
    },
}
</script>
